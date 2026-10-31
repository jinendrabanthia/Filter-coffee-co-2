const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function capture(url, outPath, width, height, delayMs = 1500) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-cap-'));
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempDir}`,
    `--window-size=${width},${height}`,
    `--screenshot=${outPath}`,
    `--virtual-time-budget=${delayMs}`,
    url,
  ];

  return new Promise((resolve, reject) => {
    execFile(edgePath, args, (err, stdout, stderr) => {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (e) {}
      if (err) {
        console.error('Edge err:', err.message);
        resolve(false);
      } else {
        resolve(fs.existsSync(outPath));
      }
    });
  });
}

async function runAll() {
  const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';
  
  console.log('Capturing mobile viewports...');
  const viewports = [
    { name: 'mobile-320', w: 320, h: 568 },
    { name: 'mobile-360', w: 360, h: 740 },
    { name: 'mobile-375', w: 375, h: 667 },
    { name: 'mobile-390', w: 390, h: 844 },
    { name: 'mobile-414', w: 414, h: 896 },
    { name: 'mobile-430', w: 430, h: 932 },
    { name: 'desktop-1280', w: 1280, h: 800 },
  ];

  for (const vp of viewports) {
    const dest = path.join(artDir, `${vp.name}.png`);
    const ok = await capture('http://localhost:5173/?loader=true', dest, vp.w, vp.h, 2000);
    console.log(`${vp.name} (${vp.w}x${vp.h}): ${ok ? 'SUCCESS' : 'FAILED'}`);
  }
}

runAll();

