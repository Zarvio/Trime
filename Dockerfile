FROM node:18-bullseye

RUN apt-get update && \
    apt-get install -y ffmpeg python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install -U yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
