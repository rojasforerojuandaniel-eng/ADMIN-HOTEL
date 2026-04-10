// Minimal server that stays alive
const { createServer } = require('http');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const projectRoot = '/home/z/my-project';

let nextProcess = null;
let lastActivity = Date.now();

function startNext() {
  if (nextProcess) {
    try { nextProcess.kill(); } catch(e) {}
  }

  console.log(`[${new Date().toISOString()}] Starting Next.js...`);

  nextProcess = spawn('node', [
    path.join(projectRoot, 'node_modules/.bin/next'),
    'dev', '-p', PORT.toString()
  ], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  nextProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
    lastActivity = Date.now();
  });

  nextProcess.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  nextProcess.on('exit', (code) => {
    console.log(`[${new Date().toISOString()}] Next.js exited with code ${code}`);
    nextProcess = null;
  });

  return nextProcess;
}

// Start Next.js
startNext();

// Keep-alive: restart if no activity for 60 seconds
setInterval(() => {
  const now = Date.now();
  if (now - lastActivity > 60000) {
    console.log(`[${new Date().toISOString()}] No activity for 60s, restarting...`);
    startNext();
  }
}, 30000);

// Handle termination
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, keeping server alive...');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, keeping server alive...');
});

console.log('Watchdog started. Next.js dev server will auto-restart if needed.');
