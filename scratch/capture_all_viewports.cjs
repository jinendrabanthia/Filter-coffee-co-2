const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = 'file:///' + path.resolve('preview-loader.html').replace(/\\/g, '/');
const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';

function captureOne(width, height, outName) {
  return new Promise((resolve) => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-cap-'));
    const outPath = path.join(artDir, outName);
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${tempDir}`,
      `--screenshot=${outPath}`,
      `--window-size=${width},${height}`,
      htmlFile,
    ];

    execFile(edgePath, args, (err) => {
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      if (err) {
        console.error(`Error on ${outName}:`, err.message);
        resolve(false);
      } else {
        console.log(`Captured ${outName} (${width}x${height}): ${fs.existsSync(outPath)}`);
        resolve(true);
      }
    });
  });
}

async function main() {
  const tests = [
    { w: 320, h: 568, name: 'screenshot-loader-320px.png' },
    { w: 360, h: 740, name: 'screenshot-loader-360px.png' },
    { w: 375, h: 667, name: 'screenshot-loader-375px.png' },
    { w: 390, h: 844, name: 'screenshot-loader-390px.png' },
    { w: 414, h: 896, name: 'screenshot-loader-414px.png' },
    { w: 430, h: 932, name: 'screenshot-loader-430px.png' },
    { w: 1280, h: 800, name: 'screenshot-loader-desktop.png' },
  ];

  for (const t of tests) {
    await captureOne(t.w, t.h, t.name);
  }
}

main();

