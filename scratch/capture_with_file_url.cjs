const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';
const distHtml = path.resolve('dist/index.html');

let htmlContent = fs.readFileSync(distHtml, 'utf8');

// Convert absolute paths to relative paths for file:/// compatibility
htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="./assets/');
htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="./assets/');
htmlContent = htmlContent.replace(/href="\/images\//g, 'href="../public/images/');
htmlContent = htmlContent.replace(/src="\/images\//g, 'src="../public/images/');

const previewHtmlPath = path.resolve('dist/preview_local.html');
fs.writeFileSync(previewHtmlPath, htmlContent);

const fileUrl = 'file:///' + previewHtmlPath.replace(/\\/g, '/');

const targets = [
  { name: 'responsive-360px.png',  w: 360,  h: 780 },
  { name: 'responsive-390px.png',  w: 390,  h: 844 },
  { name: 'responsive-430px.png',  w: 430,  h: 932 },
  { name: 'responsive-768px.png',  w: 768,  h: 1024 },
  { name: 'responsive-1440px.png', w: 1440, h: 900 },
];

async function run() {
  for (const t of targets) {
    const outPath = path.join(artDir, t.name);
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--allow-file-access-from-files',
      `--window-size=${t.w},${t.h}`,
      `--screenshot=${outPath}`,
      '--virtual-time-budget=8000',
      fileUrl,
    ];

    await new Promise((resolve) => {
      execFile(edgePath, args, (err, stdout, stderr) => {
        if (err) console.error(`Error for ${t.name}:`, err.message);
        else console.log(`Successfully generated ${t.name} (${t.w}x${t.h})`);
        resolve();
      });
    });
  }
}

run();

