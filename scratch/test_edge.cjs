const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-test-'));
const outPath = path.resolve('scratch/test-screenshot.png');
const htmlFile = 'file:///' + path.resolve('test-loader.html').replace(/\\/g, '/');

const args = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-software-rasterizer',
  '--no-first-run',
  '--no-default-browser-check',
  `--user-data-dir=${tempDir}`,
  `--screenshot=${outPath}`,
  '--window-size=600,800',
  htmlFile,
];

execFile(edgePath, args, (err, stdout, stderr) => {
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  console.log('Finished. Exists:', fs.existsSync(outPath));
});

