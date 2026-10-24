const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const crypto = require('crypto');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: false }, maxHttpBufferSize: 1e6 });
const rooms = new Map();
const PORT = process.env.PORT || 3000;
const HEROES = new Set(['Nova','Ember','Titan','Viper','Frost','Onyx','Blaze','Storm','Ronin','Echo','Atlas','Shade','Phoenix','Rook']);
app.use(express.static(path.join(__dirname)));
app.get('/health', (_req, res) => res.json({ ok: true, rooms: rooms.size }));
function code(){let c;do{c=crypto.randomBytes(4).toString('hex').slice(0,6).toUpperCase();}while(rooms.has(c));return c;}
function cleanHero(h){return HEROES.has(h)?h:'Nova';}
io.on('connection', socket => {
 socket.on('create-room', data => {
  for(const [c,r] of rooms){if(r.host===socket.id){rooms.delete(c);io.to(c).emit('room-closed');}}
  const c=code();rooms.set(c,{host:socket.id,guest:null,hostHero:cleanHero(data&&data.hero),guestHero:null,started:false});socket.join(c);socket.data.room=c;socket.data.role='host';socket.emit('room-created',{code:c});
 });
 socket.on('join-room', data => {
  const c=String(data&&data.code||'').trim().toUpperCase(),r=rooms.get(c);
  if(!r){socket.emit('join-error',{message:'Room not found. Check the code or ask the host to create a new room.'});return;}
  if(r.guest){socket.emit('join-error',{message:'That room already has two players.'});return;}
  if(r.host===socket.id){socket.emit('join-error',{message:'You are already the host of this room.'});return;}
  r.guest=socket.id;r.guestHero=cleanHero(data&&data.hero);socket.join(c);socket.data.room=c;socket.data.role='guest';socket.emit('room-joined',{code:c});io.to(r.host).emit('guest-joined',{hero:r.guestHero});
 });
 socket.on('match-start',data=>{const c=String(data&&data.roomCode||''),r=rooms.get(c);if(!r||r.host!==socket.id||!r.guest)return;r.started=true;io.to(r.guest).emit('match-start',{left:cleanHero(data.left||r.hostHero),right:r.guestHero});});
 socket.on('player-input',data=>{const c=String(data&&data.roomCode||''),r=rooms.get(c);if(!r||r.guest!==socket.id||!r.started)return;io.to(r.host).emit('remote-input',{keys:safeKeys(data.keys),pressed:safeKeys(data.pressed)});});
 socket.on('snapshot',data=>{const c=String(data&&data.roomCode||''),r=rooms.get(c);if(!r||r.host!==socket.id||!r.guest)return;const payload={...data};delete payload.roomCode;io.to(r.guest).emit('snapshot',payload);if(data.finished){r.started=false;}});
 socket.on('disconnect',()=>{const c=socket.data.room,r=c&&rooms.get(c);if(!r)return;if(r.host===socket.id){io.to(c).emit('room-closed');rooms.delete(c);}else if(r.guest===socket.id){r.guest=null;r.guestHero=null;r.started=false;io.to(r.host).emit('guest-left');} });
});
function safeKeys(o){const out={};for(const k of ['left','right','block','jump','punch','kick','special'])out[k]=!!(o&&o[k]);return out;}
server.listen(PORT,'0.0.0.0',()=>console.log(`Shadow Clash Online running on http://localhost:${PORT}`));
