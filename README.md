# Shadow Clash Online Multiplayer

## Included
- Original Shadow Clash visuals, 14 selectable fighters, touch controls, health bars, rounds and victory screen.
- Private six-character invite codes; two players per room.
- Host-authoritative match simulation with remote input relay.
- Responsive mobile layout, including landscape/small-screen adjustments.

## Run locally
Requires Node.js 18 or newer. In this folder run:

```sh
npm install
npm start
```

Open http://localhost:3000 in your browser. For two phones on the same Wi-Fi, open `http://YOUR-COMPUTER-LAN-IP:3000` on both phones. On the first phone, select a fighter and tap **CREATE PRIVATE ROOM**; share the six-character code. On the second phone, select a fighter, enter the code and tap **JOIN ROOM**. The host starts the duel once the second player joins.

## Internet play
To play across different networks, deploy this folder to a Node.js host that supports persistent WebSocket connections (for example, a Node-capable VPS or app host). Set its `PORT` environment variable if required, then share the deployed HTTPS URL and room code. Both players must use the same deployed URL. A static HTML-only host is not enough because invite rooms and realtime input require the included server.

## Notes
This is a playable starter implementation, not a hardened competitive game server. The host browser simulates combat and sends state snapshots; do not use it for ranked or trusted competitive play without server-authoritative simulation, rate limits, reconnection handling and anti-cheat validation.
