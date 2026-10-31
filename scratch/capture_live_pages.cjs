const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artDir = 'C:\\Users\\asus\\.gemini\\antigravity\\brain\\5fe758b3-c8ce-4f6c-9041-f6cf693cbf85';
const distDir = path.resolve('dist');

const mimes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.otf': 'font/otf',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  
  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 8099;

server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);

  const targets = [
    // 1. Mobile screen sizes requested by user
    { name: 'responsive-hero-360px.png',  w: 360,  h: 780,  url: `http://localhost:${PORT}/`, budget: 8500 },
    { name: 'responsive-hero-390px.png',  w: 390,  h: 844,  url: `http://localhost:${PORT}/`, budget: 8500 },
    { name: 'responsive-hero-430px.png',  w: 430,  h: 932,  url: `http://localhost:${PORT}/`, budget: 8500 },
    // 2. Tablet requested by user
    { name: 'responsive-hero-768px.png',  w: 768,  h: 1024, url: `http://localhost:${PORT}/`, budget: 8500 },
    // 3. Desktop requested by user
    { name: 'responsive-hero-1440px.png', w: 1440, h: 900,  url: `http://localhost:${PORT}/`, budget: 8500 },
    // 4. Subpages on mobile
    { name: 'responsive-about-390px.png', w: 390,  h: 844,  url: `http://localhost:${PORT}/about`, budget: 2000 },
    { name: 'responsive-work-390px.png',  w: 390,  h: 844,  url: `http://localhost:${PORT}/work`, budget: 2000 },
    { name: 'responsive-clients-390px.png', w: 390, h: 844, url: `http://localhost:${PORT}/clients`, budget: 2000 },
    { name: 'responsive-services-390px.png', w: 390, h: 844, url: `http://localhost:${PORT}/services`, budget: 2000 },
  ];

  for (const t of targets) {
    const outPath = path.join(artDir, t.name);
    const args = [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${t.w},${t.h}`,
      `--screenshot=${outPath}`,
      `--virtual-time-budget=${t.budget || 2000}`,
      t.url,
    ];

    await new Promise((resolve) => {
      execFile(edgePath, args, (err, stdout, stderr) => {
        if (err) console.error(`Error capturing ${t.name}:`, err.message);
        else console.log(`Captured ${t.name} (${t.w}x${t.h})`);
        resolve();
      });
    });
  }

  server.close(() => {
    console.log('Server closed successfully.');
    process.exit(0);
  });
});
