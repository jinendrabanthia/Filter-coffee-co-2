const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';

function createHeroHtml(width, height) {
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filter Coffee Co. — Hero Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #E5E5E5;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif;
    }
    .screen {
      width: ${width}px;
      height: ${height}px;
      background: #BFE9FF;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
      box-shadow: 0 16px 40px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
    }
    
    /* Liquid Glass Navbar */
    .navbar-wrap {
      width: 100%;
      padding: 12px 16px;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
    .navbar {
      width: 100%;
      max-width: 1200px;
      background: linear-gradient(135deg, rgba(255,255,255,0.52) 0%, rgba(191,233,255,0.32) 50%, rgba(255,255,255,0.40) 100%);
      backdrop-filter: blur(28px) saturate(190%);
      -webkit-backdrop-filter: blur(28px) saturate(190%);
      border: 1px solid rgba(255,255,255,0.60);
      border-radius: 28px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07), inset 0 1.5px 0 rgba(255,255,255,0.70);
    }
    .logo-text {
      font-weight: 900;
      font-size: ${isMobile ? '16px' : '19px'};
      letter-spacing: -0.01em;
      color: #111111;
      text-transform: uppercase;
      font-family: 'Nunito', sans-serif;
    }
    .logo-sub {
      font-size: ${isMobile ? '13px' : '15px'};
      text-transform: lowercase;
      font-weight: 800;
    }
    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 24px;
      align-items: flex-end;
    }
    .hamburger span {
      display: block;
      height: 2px;
      background: #111111;
      border-radius: 2px;
    }
    .hamburger span:nth-child(1) { width: 22px; }
    .hamburger span:nth-child(2) { width: 16px; }
    .hamburger span:nth-child(3) { width: 20px; }

    .nav-links {
      display: ${isMobile ? 'none' : 'flex'};
      gap: 28px;
      align-items: center;
    }
    .nav-link {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #111111;
      text-decoration: none;
    }

    /* Hero Section */
    .hero-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 85px ${isMobile ? '16px' : '48px'} 40px;
    }

    .box-container {
      width: 100%;
      max-width: ${isMobile ? '280px' : isTablet ? '380px' : '460px'};
      margin-bottom: 12px;
    }

    .headline {
      font-weight: 900;
      color: #111111;
      line-height: 1;
      letter-spacing: -0.035em;
      text-transform: uppercase;
      margin-bottom: 12px;
      font-size: ${isMobile ? (width <= 360 ? '1.4rem' : '1.65rem') : isTablet ? '2.4rem' : '3.6rem'};
      white-space: ${width > 360 ? 'nowrap' : 'normal'};
    }

    .copy {
      color: rgba(17,17,17,0.85);
      font-size: ${isMobile ? '14px' : '17px'};
      font-weight: 500;
      line-height: 1.5;
      max-width: 500px;
      margin-bottom: 8px;
      padding: 0 8px;
    }

    .agency-tag {
      font-size: ${isMobile ? '9.5px' : '11px'};
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(17,17,17,0.60);
      margin-bottom: 24px;
      padding: 0 8px;
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #111111;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      padding: 14px 36px;
      border-radius: 9999px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      border: none;
      cursor: pointer;
    }

    .sub-cue {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(17,17,17,0.50);
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="screen">
    <!-- Navbar -->
    <div class="navbar-wrap">
      <div class="navbar">
        <div class="logo-text">FILTER COFFEE <span class="logo-sub">co.</span></div>
        <div class="nav-links">
          <a class="nav-link">Work</a>
          <a class="nav-link">About</a>
          <a class="nav-link">Services</a>
          <a class="nav-link">Clients</a>
          <a class="nav-link">Gallery</a>
          <a class="nav-link">Contact</a>
        </div>
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- Hero Content -->
    <div class="hero-content">
      <!-- Closed Box SVG Illustration -->
      <div class="box-container">
        <svg viewBox="60 40 380 430" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;filter:drop-shadow(0 16px 24px rgba(0,0,0,0.12));">
          <!-- Shadow -->
          <ellipse cx="255" cy="445" rx="145" ry="22" fill="#111111" fill-opacity="0.14" />
          <path d="M150 442L165 450" stroke="#111111" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round" />
          <path d="M165 440L180 448" stroke="#111111" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round" />
          <path d="M180 438L195 446" stroke="#111111" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round" />
          <path d="M320 440L335 448" stroke="#111111" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round" />
          <path d="M335 442L350 450" stroke="#111111" stroke-width="1.5" stroke-opacity="0.4" stroke-linecap="round" />
          <!-- Hand-drawn Marks -->
          <path d="M90 125L105 145" stroke="#111111" stroke-width="3" stroke-linecap="round" />
          <path d="M108 108L120 130" stroke="#111111" stroke-width="3" stroke-linecap="round" />
          <path d="M435 240L420 255" stroke="#111111" stroke-width="3" stroke-linecap="round" />
          <path d="M448 262L430 274" stroke="#111111" stroke-width="3" stroke-linecap="round" />
          <!-- Box Left Face -->
          <path d="M140 240L250 290L250 430L140 375Z" fill="#F7FAFC" stroke="#111111" stroke-width="3.5" stroke-linejoin="round" />
          <!-- Box Right Face -->
          <path d="M250 290L380 230L380 370L250 430Z" fill="#E2EFF7" stroke="#111111" stroke-width="3.5" stroke-linejoin="round" />
          <!-- Box Top Face -->
          <path d="M140 240L250 190L380 230L250 290Z" fill="#FFFFFF" stroke="#111111" stroke-width="3.5" stroke-linejoin="round" />
          <!-- Blue Tape -->
          <path d="M195 215L315 260" stroke="#2563EB" stroke-width="16" stroke-linecap="square" />
          <path d="M250 290L250 350" stroke="#2563EB" stroke-width="16" stroke-linecap="square" />
          <!-- Shipping Label Tag -->
          <g transform="translate(155, 275) rotate(4)">
            <rect x="0" y="0" width="76" height="42" rx="4" fill="#FFFFFF" stroke="#111111" stroke-width="2" />
            <text x="6" y="16" font-size="8" font-family="-apple-system, sans-serif" font-weight="900" fill="#111111">KNOCK, KNOCK!</text>
            <text x="6" y="28" font-size="7.5" font-family="-apple-system, sans-serif" font-weight="700" fill="#2563EB">Who's dis?</text>
          </g>
          <!-- Up Arrows -->
          <g transform="translate(330, 275)">
            <path d="M10 25L10 8M10 8L5 13M10 8L15 13" stroke="#111111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 25L24 8M24 8L19 13M24 8L29 13" stroke="#111111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <line x1="4" y1="29" x2="35" y2="29" stroke="#111111" stroke-width="2.5" stroke-linecap="round" />
          </g>
        </svg>
      </div>

      <!-- Headline -->
      <h1 class="headline">THINK OUTSIDE THE BOX.</h1>

      <!-- Supporting copy -->
      <p class="copy">Every great idea starts with a little curiosity.</p>
      <p class="agency-tag">WE'RE A CREATIVE AGENCY. AND WE LIKE THINKING DIFFERENTLY.</p>

      <!-- CTA -->
      <button class="cta-btn">
        <span>OPEN THE BOX</span>
        <span>↗</span>
      </button>
      <span class="sub-cue">GO ON. TAKE A LOOK.</span>
    </div>
  </div>
</body>
</html>`;
}

async function captureHero(w, h, name) {
  const html = createHeroHtml(w, h);
  const htmlPath = path.resolve(`scratch/hero_${w}.html`);
  fs.writeFileSync(htmlPath, html);
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const outPath = path.join(artDir, name);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-hero-'));

  const winW = Math.max(500, w + 120);
  const winH = Math.max(700, h + 120);

  return new Promise((resolve) => {
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--user-data-dir=${tempDir}`,
      `--window-size=${winW},${winH}`,
      `--screenshot=${outPath}`,
      fileUrl,
    ];

    execFile(edgePath, args, (err) => {
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      if (err) console.error(`Error on ${name}:`, err.message);
      else console.log(`Captured ${name} (${w}x${h}): ${fs.existsSync(outPath)}`);
      resolve();
    });
  });
}

async function main() {
  const devices = [
    { w: 320, h: 640, name: 'device-hero-320px.png' },
    { w: 360, h: 740, name: 'device-hero-360px.png' },
    { w: 390, h: 844, name: 'device-hero-390px.png' },
    { w: 430, h: 932, name: 'device-hero-430px.png' },
    { w: 768, h: 1024, name: 'device-hero-768px.png' },
    { w: 1280, h: 800, name: 'device-hero-1280px.png' },
  ];

  for (const d of devices) {
    await captureHero(d.w, d.h, d.name);
  }
}

main();

