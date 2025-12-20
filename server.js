const fs = require('fs');
const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const app = express();

// Docker paths
const YTDLP = 'yt-dlp'; // Windows PATH me add kiya ho
const FFMPEG = 'ffmpeg'; // Windows PATH me add kiya ho


// Serve static files from root folder
app.use(express.static(__dirname)); // __dirname = root folder

// Create downloads folder if not exists
if (!fs.existsSync('downloads')) fs.mkdirSync('downloads');

app.get("/trim", (req, res) => {
  const { url, start, end } = req.query;
  if (!url || start >= end) return res.status(400).send("Invalid request");

  res.setHeader('Content-Disposition', 'attachment; filename="trimmed.mp4"');
  res.setHeader('Content-Type', 'video/mp4');

  const tmpFile = path.join('downloads', `tmp-${Date.now()}.mp4`);

  // yt-dlp partial download + 1080p limit
  const ytdlp = spawn(YTDLP, [
    url,
    '-f', 'bestvideo[height<=1080]+bestaudio[ext=m4a]/mp4',
    '--merge-output-format', 'mp4',
    '--download-sections', `*${start}-${end}`,
    '-o', tmpFile
  ]);

  ytdlp.on('close', code => {
    if(code!==0) return res.status(500).send("yt-dlp failed");

    // ffmpeg convert + fragmented MP4 streaming
    const ffmpeg = spawn(FFMPEG, [
      '-i', tmpFile,
      '-c:v', 'libx264',
      '-c:a', 'aac',
      '-movflags', '+frag_keyframe+empty_moov+default_base_moof',
      '-f', 'mp4',
      'pipe:1'
    ]);

    ffmpeg.stdout.pipe(res);
    ffmpeg.stderr.on('data', d => console.log(d.toString()));

    ffmpeg.on('close', () => {
      if(fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      res.end();
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
