/* Trenndly admin (simple version): Overview, Users, Activity, Feedback, Chats, Notice.
   Sab kuch Firebase ke real data se aata hai. Koi dummy number nahi. */
firebase.initializeApp(firebaseConfig);
const $ = (id) => document.getElementById(id);
const db = () => firebase.database();
const fmt = (t) => t ? new Date(t).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "";
const dayKey = (d = new Date()) => d.toLocaleDateString("en-CA");
const dayOf = (t) => t ? dayKey(new Date(t)) : "";
const LIMIT = { analyses: 500, usage: 1000, feedback: 300, chats: 200 };
const PAGE = 50;

const FEAT = { tags: "Analyze (tags)", hook: "Hook check", prompt: "Video Prompt", tagfinder: "Tag Finder", compare: "Competitor Compare", planner: "Channel Planner", watermark: "Watermark Remover" };
const ALIAS = { yt: "tagfinder", cmp: "compare", plan: "planner", ct: "tagfinder" };

let refs = [], threadRef = null, sel = null, A = [];
const D = { visitors: [], analyses: [], usage: [], users: {}, feedback: [], chats: [] };
let aFilter = "all", fbFilter = "all", noticeLive = false, noticeFilled = false;
const view = { users: PAGE, activity: PAGE };

/* ---------- Login ---------- */
$("gBtn").onclick = async () => {
  $("gMsg").textContent = "";
  try { await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
  catch (e) { console.error(e); $("gMsg").textContent = "Sign-in failed. Please try again."; }
};
$("outBtn").onclick = () => firebase.auth().signOut();
firebase.auth().onAuthStateChanged((user) => {
  refs.forEach(r => r.off()); refs = [];
  if (threadRef) { threadRef.off(); threadRef = null; }
  sel = null; noticeFilled = false;
  D.visitors = []; D.analyses = []; D.usage = []; D.users = {}; D.feedback = []; D.chats = [];
  $("outBtn").classList.toggle("hidden", !user);
  const isAdmin = !!user && user.emailVerified !== false && ADMIN_EMAILS.map(e => e.toLowerCase()).includes((user.email || "").toLowerCase());
  $("panel").classList.toggle("hidden", !isAdmin);
  $("gate").classList.toggle("hidden", isAdmin);
  if (!user) { $("gTitle").textContent = "Admin sign in"; $("gText").textContent = "Sign in with your admin Google account."; $("gBtn").classList.remove("hidden"); return; }
  if (!isAdmin) { $("gTitle").textContent = "Access denied"; $("gText").textContent = user.email + " is not an admin account."; $("gBtn").classList.add("hidden"); return; }
  start();
});

/* ---------- Live status + data listeners ---------- */
let online = false, updatedAt = 0;
function paintLive() {
  $("live").classList.toggle("off", !online);
  $("liveTxt").textContent = online ? "Live" + (updatedAt ? " · updated " + new Date(updatedAt).toLocaleTimeString() : "") : "Offline, reconnecting…";
}
function listen(path, build, onData, optional) {
  const r = build(db().ref(path));
  r.on("value", (s) => { updatedAt = Date.now(); paintLive(); onData(s); }, (err) => {
    console.error("[Admin] Load failed:", path, err.code);
    if (optional) return;
    $("loadErr").textContent = err.code === "PERMISSION_DENIED"
      ? "Firebase rules '" + path + "' ko block kar rahe hain. Latest rules publish karo."
      : "Couldn't load " + path + " (" + (err.code || "error") + ").";
  });
  refs.push(r);
}
const rows = (snap) => { const a = []; snap.forEach(c => { a.push({ id: c.key, ...c.val() }); }); return a; };
const renderAll = () => { A = acts(); renderOverview(); renderUsers(); renderActivity(); };

function start() {
  $("loadErr").textContent = "";
  const conn = db().ref(".info/connected");
  conn.on("value", (s) => { online = s.val() === true; paintLive(); });
  refs.push(conn);
  listen("analytics/visitors", r => r, (s) => { D.visitors = rows(s); renderAll(); });
  listen("analytics/analyses", r => r.orderByChild("createdAt").limitToLast(LIMIT.analyses), (s) => { D.analyses = rows(s); renderAll(); });
  listen("analytics/usage", r => r.orderByChild("createdAt").limitToLast(LIMIT.usage), (s) => { D.usage = rows(s); renderAll(); }, true);
  listen("users", r => r, (s) => { D.users = s.val() || {}; renderUsers(); }, true);
  listen("feedback", r => r.orderByChild("createdAt").limitToLast(LIMIT.feedback), (s) => { D.feedback = rows(s).reverse(); renderFeedback(); renderOverview(); });
  listen("chatMeta", r => r.orderByChild("lastMsgAt").limitToLast(LIMIT.chats), (s) => { D.chats = rows(s).reverse(); renderChats(); renderOverview(); });
  listen("notice", r => r, (s) => {
    const n = s.val() || {};
    noticeLive = n.active === true;
    if (!noticeFilled) { $("nActive").checked = noticeLive; $("nTitle").value = n.title || ""; $("nMsg").value = n.message || ""; noticeFilled = true; }
    $("nLive").className = "nlive " + (noticeLive ? "on" : "off");
    $("nLive").textContent = noticeLive ? "LIVE abhi: users ko popup \"" + (n.title || "") + "\" dikh raha hai" : "Popup abhi band hai";
  }, true);
}

/* ---------- Tabs ---------- */
const TABS = ["overview", "users", "activity", "feedback", "chats", "notice"];
function showTab(name) {
  document.querySelectorAll("#tabs button").forEach(x => x.classList.toggle("on", x.dataset.tab === name));
  TABS.forEach(t => $("tab-" + t).classList.toggle("hidden", t !== name));
}
$("tabs").onclick = (e) => { const b = e.target.closest("button"); if (b) showTab(b.dataset.tab); };

/* ---------- Helpers ---------- */
function mk(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function card(badge, cls, whoText, mail, time, msg) {
  const d = mk("article", "mc"), head = mk("div", "mc-head");
  head.appendChild(mk("span", "badge " + cls, badge));
  if (mail) { const a = mk("a", "mc-mail", whoText); a.href = "mailto:" + encodeURI(mail); head.appendChild(a); }
  else head.appendChild(mk("span", "mc-mail", whoText));
  head.appendChild(mk("span", "mc-time", time));
  d.append(head, mk("p", "mc-msg", msg));
  return d;
}
const empty = (box, text) => { box.innerHTML = ""; box.appendChild(mk("div", "empty", text)); };
const who = (x) => x.email || x.name || x.uid || "(unknown)";
function moreBtn(box, total, key, rerender) {
  if (total <= view[key]) return;
  const b = mk("button", "btn ghost sm", "Show more (" + (total - view[key]) + " left)");
  b.style.justifySelf = "center";
  b.onclick = () => { view[key] += PAGE; rerender(); };
  box.appendChild(b);
}

/* ---------- Activity = analyses + free tools + watermark, ek hi list ---------- */
function acts() {
  const a = D.analyses.map(x => ({ f: x.mode || "tags", ok: x.status === "ok", err: x.error || "", uid: x.uid, email: x.email, name: x.name, t: x.createdAt || 0,
    note: [x.fileName, x.sizeMB != null && x.sizeMB + " MB", x.ms && "took " + Math.round(x.ms / 1000) + "s"].filter(Boolean).join(" · ") }));
  const u = D.usage.map(x => ({ f: ALIAS[x.type] || x.type || "other", ok: x.status !== "failed", err: x.error || "", uid: x.uid, email: x.email, name: x.name, t: x.createdAt || 0,
    note: x.mb ? x.mb + " MB" : "" }));
  return [...a, ...u].sort((p, q) => q.t - p.t);
}
/* Technical error ko aasaan bhasha me */
function reason(e) {
  if (!e) return "Wajah save nahi hui (purana record).";
  const m = String(e);
  if (/429/.test(m)) return "Gemini ki limit khatam (429). Thodi der ruko ya billing on karo.";
  if (/404/.test(m) && /gemini|model/i.test(m)) return "Gemini model band ya nahi mila (404). Model list badlo.";
  if (/503|overload/i.test(m)) return "Google server busy tha (503). Dobara try karo.";
  if (/\b400\b/.test(m) && /gemini|model/i.test(m)) return "Gemini ne request reject ki (400).";
  if (/file processing/i.test(m)) return "Gemini video process nahi kar paya.";
  if (/no scenes|no hooks/i.test(m)) return "AI ne khali jawab diya.";
  if (/watermark found/i.test(m)) return "Video me Gemini watermark mila hi nahi.";
  if (/browser can't/i.test(m)) return "User ka browser ye kaam nahi kar sakta (Chrome/Edge chahiye).";
  if (/size is not supported/i.test(m)) return "Video ka size support nahi hai.";
  if (/Video not found|Channel not found|valid YouTube/i.test(m)) return "User ne galat YouTube link diya.";
  if (/Too many/i.test(m)) return "User ne bahut zyada requests bheji (rate limit).";
  if (/Couldn't reach YouTube/i.test(m)) return "YouTube API ne jawab nahi diya (key ya quota check karo).";
  return "Error: " + m;
}
function actCard(x) {
  const c = card(x.ok ? "Success" : "Failed", x.ok ? "ok" : "failed", who(x), x.email, fmt(x.t), (FEAT[x.f] || x.f) + (x.note ? " · " + x.note : ""));
  if (!x.ok) {
    c.appendChild(mk("p", "why", "Kyun fail hua: " + reason(x.err)));
    if (x.err) c.appendChild(mk("p", "raw", x.err));
  }
  return c;
}

/* ---------- Overview ---------- */
function renderOverview() {
  const today = dayKey(), vs = D.visitors;
  const users = new Set(vs.filter(v => v.uid).map(v => v.uid)).size, guests = vs.filter(v => !v.uid).length;
  const week = new Date(); week.setDate(week.getDate() - 6); week.setHours(0, 0, 0, 0);
  const todays = A.filter(x => dayOf(x.t) === today);
  const mob = vs.filter(v => v.device === "mobile").length, pct = vs.length ? Math.round(mob / vs.length * 100) : 0;
  const failed = A.filter(x => !x.ok);
  const cards = [
    ["Total visitors", users + guests], ["Logged-in users", users], ["Guests (login nahi kiya)", guests],
    ["New visitors today", vs.filter(v => dayOf(v.firstSeen) === today).length],
    ["New visitors (7 days)", vs.filter(v => (v.firstSeen || 0) >= week.getTime()).length],
    ["Active users today", new Set(todays.map(x => x.uid).filter(Boolean)).size],
    ["Total runs", A.length], ["Success rate", A.length ? Math.round((A.length - failed.length) / A.length * 100) + "%" : "-"],
    ["Mobile / Desktop", vs.length ? pct + "% / " + (100 - pct) + "%" : "-"],
    ["Chats waiting", D.chats.filter(c => c.unreadAdmin).length], ["Problem reports", D.feedback.filter(f => f.type === "problem").length]
  ];
  $("stats").innerHTML = "";
  cards.forEach(([l, v]) => { const s = mk("div", "stat"); s.append(mk("b", null, v), mk("span", null, l)); $("stats").appendChild(s); });

  $("feat").innerHTML = "";
  Object.keys(FEAT).forEach(k => {
    const l = A.filter(x => x.f === k), bad = l.filter(x => !x.ok).length, td = l.filter(x => dayOf(x.t) === today).length;
    const tr = mk("div", "tr");
    tr.append(mk("span", "l", FEAT[k]), mk("span", "r", l.length + " total · " + (l.length - bad) + " success · " + bad + " failed · aaj " + td));
    $("feat").appendChild(tr);
  });

  const box = $("oFails"); box.innerHTML = "";
  if (!failed.length) empty(box, A.length ? "Koi failure nahi. 👍" : "Abhi koi activity nahi.");
  failed.slice(0, 10).forEach(x => box.appendChild(actCard(x)));
}

/* ---------- Users: sabse naya upar ---------- */
$("uSearch").oninput = () => { view.users = PAGE; renderUsers(); };
function userList() {
  const m = {}, get = (uid) => (m[uid] = m[uid] || { uid, email: "", name: "", username: "", joined: 0, last: 0, list: [] });
  D.visitors.forEach(v => { if (!v.uid) return; const e = get(v.uid); if (v.email) e.email = v.email; if (v.name) e.name = v.name; if (v.firstSeen) e.joined = e.joined ? Math.min(e.joined, v.firstSeen) : v.firstSeen; });
  A.forEach(x => { if (!x.uid) return; const e = get(x.uid); if (x.email) e.email = x.email; if (x.name) e.name = x.name; e.list.push(x); e.last = Math.max(e.last, x.t);
    if (!e.joined || x.t < e.joined) e.joined = e.joined ? e.joined : x.t; });
  Object.keys(D.users || {}).forEach(uid => { get(uid).username = (D.users[uid] && D.users[uid].username) || ""; });
  const q = $("uSearch").value.trim().toLowerCase();
  return Object.values(m).filter(u => !q || [u.email, u.username, u.name].some(s => (s || "").toLowerCase().includes(q)))
    .sort((a, b) => (b.joined || b.last) - (a.joined || a.last));
}
function renderUsers() {
  const list = userList();
  $("uCount").textContent = list.length + " users · naya user sabse upar";
  const box = $("uList"); box.innerHTML = "";
  if (!list.length) { empty(box, "Abhi koi user nahi."); return; }
  list.slice(0, view.users).forEach(u => {
    const bad = u.list.filter(x => !x.ok).length, good = u.list.length - bad;
    const c = card("User", "user", u.email || u.name || (u.username ? "@" + u.username : u.uid), u.email, u.joined ? "Joined: " + fmt(u.joined) : "",
      (u.username ? "@" + u.username + " · " : "") + good + " success · " + bad + " failed" + (u.last ? " · last active " + fmt(u.last) : ""));
    if (u.list.length) {
      const btn = mk("button", "mc-del", "Details dekho"), det = mk("div", "det hidden");
      u.list.slice(0, 15).forEach(x => {
        const row = mk("div", null, (x.ok ? "✓ " : "✗ ") + (FEAT[x.f] || x.f) + " · " + fmt(x.t) + (x.ok ? "" : " · " + reason(x.err)));
        if (!x.ok) row.className = "why";
        det.appendChild(row);
      });
      btn.onclick = () => { const h = det.classList.toggle("hidden"); btn.textContent = h ? "Details dekho" : "Band karo"; };
      c.append(btn, det);
    }
    box.appendChild(c);
  });
  moreBtn(box, list.length, "users", renderUsers);
}

/* ---------- Activity ---------- */
$("aSearch").oninput = () => { view.activity = PAGE; renderActivity(); };
$("aFilter").onclick = (e) => {
  const b = e.target.closest("button"); if (!b) return;
  aFilter = b.dataset.f; view.activity = PAGE;
  document.querySelectorAll("#aFilter button").forEach(x => x.classList.toggle("on", x === b));
  renderActivity();
};
function renderActivity() {
  const q = $("aSearch").value.trim().toLowerCase();
  const list = A.filter(x => (aFilter === "all" || (aFilter === "ok") === x.ok) &&
    (!q || (x.email || "").toLowerCase().includes(q) || (x.note || "").toLowerCase().includes(q)));
  $("aCount").textContent = list.length + " runs (latest pehle)";
  const box = $("aList"); box.innerHTML = "";
  if (!list.length) { empty(box, "Kuch nahi mila."); return; }
  list.slice(0, view.activity).forEach(x => box.appendChild(actCard(x)));
  moreBtn(box, list.length, "activity", renderActivity);
}

/* ---------- Feedback ---------- */
$("filter").onclick = (e) => {
  const b = e.target.closest("button"); if (!b) return;
  fbFilter = b.dataset.t;
  document.querySelectorAll("#filter button").forEach(x => x.classList.toggle("on", x === b));
  renderFeedback();
};
function renderFeedback() {
  $("fbTabBtn").textContent = D.feedback.length ? "Feedback (" + D.feedback.length + ")" : "Feedback";
  const list = D.feedback.filter(i => fbFilter === "all" || i.type === fbFilter);
  $("count").textContent = list.length + " message" + (list.length === 1 ? "" : "s");
  const box = $("list"); box.innerHTML = "";
  if (!list.length) { empty(box, "No messages yet."); return; }
  list.forEach(m => {
    const d = card(m.type || "other", m.type || "other", m.email || "(no email)", m.email, fmt(m.createdAt), m.message || "");
    const foot = mk("div", "mc-foot"), acts2 = mk("span"); acts2.style.cssText = "display:flex;gap:8px";
    foot.appendChild(mk("span", "mc-page", m.page ? "Page: " + m.page : ""));
    if (m.uid) { const rep = mk("button", "mc-del", "Reply"); rep.onclick = () => { showTab("chats"); openThread(m.uid, m.email || ""); }; acts2.appendChild(rep); }
    const del = mk("button", "mc-del", "Delete");
    del.onclick = async () => {
      if (!del.classList.contains("sure")) { del.classList.add("sure"); del.textContent = "Click again to confirm"; setTimeout(() => { del.classList.remove("sure"); del.textContent = "Delete"; }, 3000); return; }
      try { await db().ref("feedback/" + m.id).remove(); } catch (e) { alert("Delete failed. Check your Firebase rules."); }
    };
    acts2.appendChild(del); foot.appendChild(acts2); d.appendChild(foot); box.appendChild(d);
  });
}

/* ---------- Chats ---------- */
function renderChats() {
  const unread = D.chats.filter(c => c.unreadAdmin).length;
  $("chatsTabBtn").textContent = unread ? "Chats (" + unread + ")" : "Chats";
  document.title = (unread ? "(" + unread + ") " : "") + "Trenndly Admin";
  $("chatCount").textContent = D.chats.length + " conversation" + (D.chats.length === 1 ? "" : "s") + (unread ? " · " + unread + " waiting for your reply" : "");
  const box = $("chatUsers"); box.innerHTML = "";
  if (!D.chats.length) { empty(box, "No chats yet."); return; }
  D.chats.forEach(c => {
    const b = mk("button", "chat-user" + (sel && sel.uid === c.id ? " on" : "")), main = mk("span", "cu-main");
    main.append(mk("b", null, c.email || c.name || c.id), mk("span", "cu-last", (c.lastFrom === "admin" ? "You: " : "") + (c.lastMsg || "")));
    b.append(main, mk("span", "cu-time", fmt(c.lastMsgAt)));
    if (c.unreadAdmin) b.appendChild(mk("span", "rdot"));
    b.onclick = () => openThread(c.id, c.email || "");
    box.appendChild(b);
  });
}
function openThread(uid, email) {
  sel = { uid, email };
  if (threadRef) threadRef.off();
  $("chatThread").classList.remove("hidden");
  $("chatHead").textContent = email || uid;
  $("chatMsgs").innerHTML = "";
  threadRef = db().ref("chatMsgs/" + uid).orderByChild("createdAt").limitToLast(200);
  threadRef.on("value", (s) => {
    const box = $("chatMsgs"); box.innerHTML = "";
    s.forEach(c => {
      const m = c.val(), row = mk("div", "bub-row " + (m.from === "admin" ? "admin" : "me")), b = mk("div", "bub");
      b.append(mk("p", null, m.text || ""), mk("small", null, (m.from === "admin" ? "You · " : "") + fmt(m.createdAt) + (m.kind === "feedback" ? " · via Feedback" : "")));
      row.appendChild(b); box.appendChild(row);
    });
    box.scrollTop = box.scrollHeight;
    const meta = D.chats.find(c => c.id === uid);
    if (meta && meta.unreadAdmin) db().ref("chatMeta/" + uid + "/unreadAdmin").set(false).catch(() => {});
  }, (e) => { $("loadErr").textContent = "Couldn't load chat (" + (e.code || "error") + ")."; });
  renderChats();
  setTimeout(() => $("chatReply").focus(), 150);
}
async function sendReply() {
  const inp = $("chatReply"), text = inp.value.trim();
  if (!sel || !text) return;
  $("chatReplyBtn").disabled = true;
  try {
    const TS = firebase.database.ServerValue.TIMESTAMP;
    await db().ref("chatMsgs/" + sel.uid).push().set({ from: "admin", text, createdAt: TS });
    const upd = { lastMsg: text.slice(0, 80), lastMsgAt: TS, lastFrom: "admin", unreadUser: true, unreadAdmin: false };
    if (sel.email) upd.email = sel.email;
    await db().ref("chatMeta/" + sel.uid).update(upd);
    inp.value = ""; inp.style.height = "auto";
  } catch (e) { console.error(e); alert("Reply failed. Check your Firebase rules."); }
  finally { $("chatReplyBtn").disabled = false; }
}
$("chatReplyBtn").onclick = sendReply;
$("chatReply").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } });
$("chatReply").addEventListener("input", (e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; });

/* ---------- Notice ---------- */
$("nSave").onclick = async () => {
  const active = $("nActive").checked, title = $("nTitle").value.trim(), message = $("nMsg").value.trim();
  if (active && !title) { $("nStatus").textContent = "Title likhna zaroori hai."; return; }
  if (active && !noticeLive && !confirm("Ye popup poori site block kar dega. Live karna hai?")) return;
  $("nSave").disabled = true;
  try {
    await db().ref("notice").set({ active, title, message, updatedAt: firebase.database.ServerValue.TIMESTAMP });
    $("nStatus").textContent = active ? "Popup LIVE hai." : "Popup band kar diya.";
  } catch (e) { $("nStatus").textContent = "Save failed. Firebase rules check kar."; }
  finally { $("nSave").disabled = false; }
};