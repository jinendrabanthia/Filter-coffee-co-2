const sharp = require('sharp');
const fs = require('fs');

function polygonArea(pts) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i][0] * pts[j][1];
    area -= pts[j][0] * pts[i][1];
  }
  return area / 2;
}

async function vectorize() {
  const { data, info } = await sharp('public/images/fcc-trademark-logo.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;

  // 1. Grid
  const grid = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * info.channels;
      const a = info.channels === 4 ? data[idx + 3] : 255;
      const dark = 1 - (data[idx] + data[idx + 1] + data[idx + 2]) / (3 * 255);
      if (a > 120 && dark > 0.4) {
        grid[y * W + x] = 1;
      }
    }
  }

  // 2. Marching squares segments
  const segments = [];
  for (let y = 0; y < H - 1; y++) {
    for (let x = 0; x < W - 1; x++) {
      const tl = grid[y * W + x];
      const tr = grid[y * W + x + 1];
      const bl = grid[(y + 1) * W + x];
      const br = grid[(y + 1) * W + x + 1];
      const code = (tl << 3) | (tr << 2) | (br << 1) | bl;

      const top = [x + 0.5, y];
      const right = [x + 1, y + 0.5];
      const bottom = [x + 0.5, y + 1];
      const left = [x, y + 0.5];

      switch (code) {
        case 1: segments.push([left, bottom]); break;
        case 2: segments.push([bottom, right]); break;
        case 3: segments.push([left, right]); break;
        case 4: segments.push([top, right]); break;
        case 5: segments.push([left, top]); segments.push([bottom, right]); break;
        case 6: segments.push([top, bottom]); break;
        case 7: segments.push([left, top]); break;
        case 8: segments.push([top, left]); break;
        case 9: segments.push([top, bottom]); break;
        case 10: segments.push([top, right]); segments.push([left, bottom]); break;
        case 11: segments.push([top, right]); break;
        case 12: segments.push([left, right]); break;
        case 13: segments.push([bottom, right]); break;
        case 14: segments.push([left, bottom]); break;
      }
    }
  }

  // 3. Chain segments into loops
  const ptKey = pt => `${Math.round(pt[0] * 2)},${Math.round(pt[1] * 2)}`;
  const startMap = new Map();
  segments.forEach((s, idx) => {
    const k = ptKey(s[0]);
    if (!startMap.has(k)) startMap.set(k, []);
    startMap.get(k).push(idx);
  });

  const used = new Uint8Array(segments.length);
  const rawLoops = [];

  for (let i = 0; i < segments.length; i++) {
    if (used[i]) continue;
    used[i] = 1;
    const loop = [segments[i][0], segments[i][1]];
    let currentPt = segments[i][1];

    let maxSteps = segments.length;
    while (maxSteps-- > 0) {
      const k = ptKey(currentPt);
      const candidates = startMap.get(k);
      let found = false;
      if (candidates) {
        for (const cIdx of candidates) {
          if (!used[cIdx]) {
            used[cIdx] = 1;
            currentPt = segments[cIdx][1];
            loop.push(currentPt);
            found = true;
            break;
          }
        }
      }
      if (!found) break;
      if (ptKey(currentPt) === ptKey(loop[0])) break;
    }

    if (loop.length > 8) {
      const a = Math.abs(polygonArea(loop));
      if (a > 25) { // real letter part
        rawLoops.push(loop);
      }
    }
  }

  console.log(`Found ${rawLoops.length} significant contour loops (expected 18).`);

  // 4. Simplify loops using RDP
  function rdp(points, epsilon) {
    if (points.length <= 2) return points;
    let maxD = 0, index = 0;
    const [p1, p2] = [points[0], points[points.length - 1]];
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    const lenSq = dx * dx + dy * dy;

    for (let i = 1; i < points.length - 1; i++) {
      const p = points[i];
      let d = 0;
      if (lenSq === 0) {
        d = Math.hypot(p[0] - p1[0], p[1] - p1[1]);
      } else {
        const u = ((p[0] - p1[0]) * dx + (p[1] - p1[1]) * dy) / lenSq;
        const clampedU = Math.max(0, Math.min(1, u));
        const px = p1[0] + clampedU * dx;
        const py = p1[1] + clampedU * dy;
        d = Math.hypot(p[0] - px, p[1] - py);
      }
      if (d > maxD) {
        maxD = d;
        index = i;
      }
    }

    if (maxD > epsilon) {
      const left = rdp(points.slice(0, index + 1), epsilon);
      const right = rdp(points.slice(index), epsilon);
      return left.slice(0, -1).concat(right);
    } else {
      return [p1, p2];
    }
  }

  const filterLoops = [];
  const coffeeLoops = [];
  const coLoops = [];

  rawLoops.forEach(loop => {
    // 0.35 gives tight curve fidelity with low point count
    const simplified = rdp(loop, 0.35);
    const minX = Math.min(...simplified.map(p => p[0]));
    const maxX = Math.max(...simplified.map(p => p[0]));
    const centerX = (minX + maxX) / 2;

    if (centerX < 404) filterLoops.push(simplified);
    else if (centerX < 881) coffeeLoops.push(simplified);
    else coLoops.push(simplified);
  });

  function loopsToPath(loopsList) {
    return loopsList.map(pts => {
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        d += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
      }
      d += ' Z';
      return d;
    }).join(' ');
  }

  const filterPath = loopsToPath(filterLoops);
  const coffeePath = loopsToPath(coffeeLoops);
  const coPath = loopsToPath(coLoops);

  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 110" fill-rule="evenodd">
  <path id="filter-word" d="${filterPath}" />
  <path id="coffee-word" d="${coffeePath}" />
  <path id="co-word" d="${coPath}" />
</svg>`;

  fs.writeFileSync('public/images/fcc-trademark-vector.svg', fullSvg.trim());
  
  // Also export as a clean JS module with path constants!
  const jsContent = `// Exact vectorized paths extracted directly from trademark artwork (1024 x 110)
export const FILTER_PATH = "${filterPath}";
export const COFFEE_PATH = "${coffeePath}";
export const CO_PATH = "${coPath}";
`;
  fs.writeFileSync('src/components/fcc-paths.js', jsContent.trim());
  console.log('Saved vector svg and src/components/fcc-paths.js successfully!');
  console.log(`Loops -> Filter: ${filterLoops.length}, Coffee: ${coffeeLoops.length}, Co: ${coLoops.length}`);
}

vectorize();
