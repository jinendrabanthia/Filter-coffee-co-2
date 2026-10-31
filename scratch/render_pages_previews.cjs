const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';

function createAboutHtml() {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #F7F5EF;
      color: #111111;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
    }
    .wrap {
      width: 390px;
      margin: 0 auto;
      background: #F7F5EF;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      overflow-x: hidden;
    }
    .hero {
      padding: 100px 20px 40px;
      border-bottom: 1px solid rgba(17,17,17,0.1);
    }
    .subhead {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #2563EB;
      margin-bottom: 12px;
    }
    .headline {
      font-size: 2.2rem;
      font-weight: 900;
      line-height: 0.98;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 24px;
    }
    .copy-block {
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-size: 17px;
      line-height: 1.55;
      font-weight: 600;
      color: #111111;
    }
    .copy-accent {
      font-weight: 900;
      color: #2563EB;
    }
    .values-strip {
      background: #2563EB;
      color: #111111;
      padding: 40px 20px;
    }
    .value-card {
      border-top: 2px solid #111111;
      padding-top: 20px;
      margin-bottom: 24px;
    }
    .value-num {
      font-family: monospace;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #111111;
      display: block;
      margin-bottom: 8px;
    }
    .value-title {
      font-size: 22px;
      font-weight: 900;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 8px;
      line-height: 1.1;
    }
    .value-desc {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.45;
      color: #111111;
    }
    .transition-strip {
      background: #111111;
      color: #FFFFFF;
      padding: 48px 20px;
      text-align: center;
    }
    .strip-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #BFE9FF;
      margin-bottom: 12px;
    }
    .strip-title {
      font-size: 22px;
      font-weight: 900;
      text-transform: uppercase;
      color: #FFFFFF !important;
      margin-bottom: 24px;
      line-height: 1.15;
    }
    .strip-btn {
      display: inline-flex;
      background: #2563EB;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 9999px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <p class="subhead">THE PEOPLE &amp; BELIEFS</p>
      <h1 class="headline">A LITTLE DIFFERENT. THAT'S THE WHOLE POINT.</h1>
      <div class="copy-block">
        <p>We believe creativity should have a personality.</p>
        <p>We're a creative marketing agency that enjoys challenging the ordinary, finding unexpected ideas and building brands with something to say.</p>
        <p>We don't believe every brand should look or sound the same.</p>
        <p class="copy-accent">And we wouldn't have it any other way.</p>
      </div>
    </div>
    <div class="values-strip">
      <div class="value-card">
        <span class="value-num">01 / DISRUPTION</span>
        <h3 class="value-title">WE CHALLENGE THE ORDINARY.</h3>
        <p class="value-desc">If everyone is zigging, we look for the meaningful zag that sets your brand apart.</p>
      </div>
      <div class="value-card">
        <span class="value-num">02 / CURIOSITY</span>
        <h3 class="value-title">WE FIND UNEXPECTED IDEAS.</h3>
        <p class="value-desc">Great insights come from deep cultural curiosity, consumer honesty, and fearless exploration.</p>
      </div>
      <div class="value-card" style="margin-bottom:0;">
        <span class="value-num">03 / VOICE</span>
        <h3 class="value-title">WE BUILD BRANDS WITH SOMETHING TO SAY.</h3>
        <p class="value-desc">Memorable brands don't whisper in the background; they spark conversations that last.</p>
      </div>
    </div>
    <div class="transition-strip">
      <p class="strip-label">THE NEXT STEP</p>
      <h2 class="strip-title">ENOUGH ABOUT US. LET'S TALK ABOUT YOU.</h2>
      <a class="strip-btn">START A CONVERSATION →</a>
    </div>
  </div>
</body>
</html>`;
}

async function renderHtml(html, outName, width = 390, height = 844) {
  const htmlPath = path.resolve(`scratch/${outName}.html`);
  fs.writeFileSync(htmlPath, html);
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const outPath = path.join(artDir, outName);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-page-'));

  return new Promise((resolve) => {
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--user-data-dir=${tempDir}`,
      `--window-size=${width},${height}`,
      `--screenshot=${outPath}`,
      fileUrl,
    ];

    execFile(edgePath, args, (err) => {
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      if (err) console.error(`Error on ${outName}:`, err.message);
      else console.log(`Rendered ${outName} (${width}x${height}): ${fs.existsSync(outPath)}`);
      resolve();
    });
  });
}

async function main() {
  await renderHtml(createAboutHtml(), 'page-about-mobile-390px.png', 410, 1100);
}

main();

