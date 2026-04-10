// Keep-alive server wrapper
const { spawn, exec } = require('child_process');
const http = require('http');
const path = require('path');

const PORT = 3000;
const PROJECT_ROOT = '/home/z/my-project';

let nextProcess = null;

function pingServer() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${PORT}/`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => { req.destroy(); resolve(false); });
  });
}

function startNext() {
  if (nextProcess) {
    try { process.kill(-nextProcess.pid); } catch(e) {}
  }

  console.log('[KEEPALIVE] Starting Next.js server...');
  
  nextProcess = spawn('node', [
    path.join(PROJECT_ROOT, 'node_modules/.bin/next'),
    'dev', '-p', PORT.toString()
  ], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
    detached: true
  });

  nextProcess.on('exit', (code) => {
    console.log(`[KEEPALIVE] Next.js exited with code ${code}`);
    nextProcess = null;
  });

  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

async function main() {
  console.log('[KEEPALIVE] Starting keep-alive server...');
  
  await startNext();

  // Keep-alive loop
  setInterval(async () => {
    const alive = await pingServer();
    if (!alive && !nextProcess) {
      console.log('[KEEPALIVE] Server not responding, restarting...');
      await startNext();
    }
  }, 15000);

  console.log('[KEEPALIVE] Server running. Press Ctrl+C to stop.');
}

// Prevent exit
process.on('SIGTERM', () => console.log('[KEEPALIVE] SIGTERM ignored'));
process.on('SIGINT', () => console.log('[KEEPALIVE] SIGINT ignored'));

main().catch(console.error);
