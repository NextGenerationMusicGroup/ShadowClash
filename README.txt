SHADOW CLASH ONLINE — 3D VISUAL UPGRADE

FILES
- index.html: upgraded browser game page. Replace the index.html at the root of the existing GitHub repository with this file.
- README.txt: these instructions.

IMPORTANT
- Keep your existing server.js and package.json. This update is intended to preserve the existing Node.js + Socket.IO multiplayer server and message protocol.
- No npm package changes are required. Three.js is loaded from jsDelivr CDN, so the game browser needs an internet connection.
- The fighters in this first 3D pass are procedural 3D models assembled from meshes. They add depth, anatomy, lighting, armor, and side-view poses, but they are not photorealistic scanned humans. To reach true Mortal Kombat-level realism, the next step is to add licensed, rigged GLB/GLTF character models and animation files.

INSTALL
1. Download/extract this ZIP.
2. Open the existing GitHub repository and edit the root index.html.
3. Replace the entire contents with the included index.html.
4. Commit directly to main with message: Add 3D fighter rendering.
5. Wait for Render to show Live.
6. Open https://shadowclash.onrender.com/ and hard refresh with Ctrl+F5.

TEST
- Start an offline fight and test movement, jump, punch, kick, block, and special.
- Create a private room in one browser/device, join from another, and test the online duel.
- If the 3D layer does not appear, refresh and check that WebGL is enabled and the browser can reach cdn.jsdelivr.net.
- If anything breaks, restore the previous index.html commit in GitHub; server.js and package.json were not changed.
