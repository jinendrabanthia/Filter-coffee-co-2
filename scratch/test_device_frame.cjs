const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';

// Create a wrapper HTML that simulates the exact mobile screen size
function createDeviceHtml(width, height) {
  const outlineImg = 'file:///' + path.resolve('public/images/fcc-trademark-outline-2x.png').replace(/\\/g, '/');
  const solidImg = 'file:///' + path.resolve('public/images/fcc-trademark-logo-2x.png').replace(/\\/g, '/');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #E5E5E5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .screen {
      width: ${width}px;
      height: ${height}px;
      background: #FFFFFF;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-container {
      position: relative;
      width: 78%;
      max-width: 680px;
    }
    .logo-base {
      display: block;
      width: 100%;
      height: auto;
    }
    .logo-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    @keyframes fccFillFilter {
      0% { clip-path: inset(100% 60.55% 0% 0%); }
      33.333% { clip-path: inset(0% 60.55% 0% 0%); }
      100% { clip-path: inset(0% 60.55% 0% 0%); }
    }
    @keyframes fccFillCoffee {
      0%, 33.333% { clip-path: inset(100% 13.97% 0% 39.45%); }
      66.667% { clip-path: inset(0% 13.97% 0% 39.45%); }
      100% { clip-path: inset(0% 13.97% 0% 39.45%); }
    }
    @keyframes fccFillCo {
      0%, 66.667% { clip-path: inset(100% 0% 0% 86.03%); }
      100% { clip-path: inset(0% 0% 0% 86.03%); }
    }
    .fcc-anim-filter { animation: fccFillFilter 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards; }
    .fcc-anim-coffee { animation: fccFillCoffee 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards; }
    .fcc-anim-co { animation: fccFillCo 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards; }
  </style>
</head>
<body>
  <div class="screen">
    <div class="logo-container">
      <img src="${outlineImg}" class="logo-base" />
      <img src="${solidImg}" class="logo-overlay fcc-anim-filter" />
      <img src="${solidImg}" class="logo-overlay fcc-anim-coffee" />
      <img src="${solidImg}" class="logo-overlay fcc-anim-co" />
      <img src="${outlineImg}" class="logo-overlay" />
    </div>
  </div>
</body>
</html>`;
}

async function captureDevice(w, h, name) {
  const html = createDeviceHtml(w, h);
  const htmlPath = path.resolve(`scratch/test_${w}.html`);
  fs.writeFileSync(htmlPath, html);
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const outPath = path.join(artDir, name);

  return new Promise((resolve) => {
    // Window size larger than the device (e.g. 600 x height+100)
    const winW = Math.max(600, w + 100);
    const winH = Math.max(600, h + 100);
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${winW},${winH}`,
      `--screenshot=${outPath}`,
      fileUrl,
    ];
    execFile(edgePath, args, (err) => {
      console.log(`Captured ${name} for ${w}x${h}`);
      resolve(true);
    });
  });
}

async function run() {
  await captureDevice(320, 568, 'mobile-320px-device.png');
  await captureDevice(360, 740, 'mobile-360px-device.png');
  await captureDevice(375, 667, 'mobile-375px-device.png');
  await captureDevice(390, 844, 'mobile-390px-device.png');
  await captureDevice(414, 896, 'mobile-414px-device.png');
  await captureDevice(430, 932, 'mobile-430px-device.png');
  await captureDevice(1280, 800, 'desktop-1280px-device.png');
}

run();
