const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const html = '<!DOCTYPE html><html><body><h1 id="out"></h1><script>document.getElementById("out").textContent = "W:" + window.innerWidth + " H:" + window.innerHeight;</script></body></html>';
fs.writeFileSync('scratch/test_width.html', html);
const p = 'file:///' + path.resolve('scratch/test_width.html').replace(/\\/g, '/');

execFile(edgePath, ['--headless=new', '--no-sandbox', '--window-size=320,568', `--screenshot=${path.resolve('scratch/width.png')}`, p], (err) => {
  console.log('Screenshot done');
});

