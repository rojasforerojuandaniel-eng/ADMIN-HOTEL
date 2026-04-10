// Dev server wrapper - keeps Next.js alive
const { spawn } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..', '..');

console.log('Starting Next.js dev server...');

const child = spawn('node', ['node_modules/.bin/next', 'dev', '-p', '3000'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: { ...process.env }
});

child.on('error', (err) => {
  console.error('Failed to start:', err);
});

child.on('exit', (code) => {
  console.log('Process exited with code:', code);
  // Restart if crashed
  if (code !== 0) {
    console.log('Restarting in 3 seconds...');
    setTimeout(() => {
      spawn('node', [__filename], { stdio: 'inherit' });
    }, 3000);
  }
});

// Keep alive
setInterval(() => {}, 1000 * 60 * 60);
