const sharp = require('sharp');
const fs = require('fs');

async function generate() {
  console.log('Generating 2x high-resolution assets (2048 x 220)...');

  // 1. Upscale original logo with Lanczos3 to 2048x220
  const upscaledBuffer = await sharp('public/images/fcc-trademark-logo.png')
    .resize(2048, 220, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  // Save 2x solid logo
  await sharp(upscaledBuffer).toFile('public/images/fcc-trademark-logo-2x.png');
  console.log('Saved public/images/fcc-trademark-logo-2x.png');

  // 2. Read raw pixels of 2x logo
  const { data, info } = await sharp(upscaledBuffer).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;

  const grid = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * info.channels;
      const a = info.channels === 4 ? data[idx + 3] : 255;
      const dark = 1 - (data[idx] + data[idx + 1] + data[idx + 2]) / (3 * 255);
      grid[y * W + x] = (a / 255) * dark;
    }
  }

  // 3. Distance transform for 2x
  // On 2x, letters are 164px tall (y=32 to 194).
  // A clean thin stroke is around 3.5 - 4.0 px on 2x (corresponding to ~1.75 - 2px on 1x).
  const dist = new Float32Array(W * H);
  const R = 14;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (grid[y * W + x] < 0.25) {
        dist[y * W + x] = 0;
        continue;
      }
      let minDistSq = R * R;
      for (let dy = -R; dy <= R; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= H) {
          minDistSq = Math.min(minDistSq, dy * dy);
          continue;
        }
        for (let dx = -R; dx <= R; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= W) {
            minDistSq = Math.min(minDistSq, dx * dx + dy * dy);
            continue;
          }
          if (grid[ny * W + nx] < 0.5) {
            const d2 = dx * dx + dy * dy;
            if (d2 < minDistSq) minDistSq = d2;
          }
        }
      }
      dist[y * W + x] = Math.sqrt(minDistSq);
    }
  }

  // 4. Generate outline
  const strokeWidth = 3.6; // ~1.8px on 1x
  const outlineData = Buffer.alloc(W * H * 4);

  for (let i = 0; i < W * H; i++) {
    const d = dist[i];
    const g = grid[i];
    let alpha = 0;
    if (g > 0.1) {
      if (d <= strokeWidth) {
        const edgeFactor = Math.min(1, Math.max(0, strokeWidth - d + 0.6));
        alpha = Math.round(255 * g * edgeFactor);
      }
    }
    outlineData[i * 4] = 17;     // #111111 -> rgb(17, 17, 17)
    outlineData[i * 4 + 1] = 17;
    outlineData[i * 4 + 2] = 17;
    outlineData[i * 4 + 3] = alpha;
  }

  await sharp(outlineData, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile('public/images/fcc-trademark-outline-2x.png');

  console.log('Saved public/images/fcc-trademark-outline-2x.png successfully!');
}

generate();

