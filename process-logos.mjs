/**
 * Process and standardize all client logos:
 * 1. Removes any background (white, off-white, light gray) into 100% transparent alpha.
 * 2. Trims bounding boxes to the exact artwork boundaries.
 * 3. Optical area normalization so wide and square logos share balanced perceptual weight.
 * 4. Centers onto a standardized 400x400 transparent 1:1 canvas.
 * 5. Outputs clean files to public/images/clients/<slug>.png.
 */
import fs from 'fs';
import sharp from 'sharp';

const CLIENT_SOURCES = [
  // 1. P&G
  { slug: 'olay',               src: 'public/images/work/olay.png',                                  mode: 'transparent' },
  { slug: 'pg',                 src: 'public/images/work/pg.svg',                                   mode: 'transparent' },
  { slug: 'zzzquil',            src: 'public/images/work/image_cfe4d60d.jpg',                        mode: 'white-bg-flood' },

  // 2. L'ORÉAL
  { slug: 'loreal',             src: 'public/images/work/loreal.png',                                mode: 'transparent' },
  { slug: 'kerastase',          src: 'public/images/work/kerastase.png',                             mode: 'transparent' },
  { slug: 'kiehls',             src: 'public/images/work/kiehls.png',                                mode: 'transparent' },
  { slug: 'matrix',             src: 'public/images/work/matrix.png',                                mode: 'transparent' },
  { slug: 'biolage',            src: 'public/images/work/biolage.png',                               mode: 'transparent' },
  { slug: 'cheryl',             src: 'public/images/work/cheryl.png',                                mode: 'transparent' },

  // 3. GALDERMA
  { slug: 'cetaphil',           src: 'public/images/work/cetaphil.png',                              mode: 'transparent' },
  { slug: 'biluma',             src: 'public/images/work/download (4).jpg',                          mode: 'preserve-colors' },
  { slug: 'galderma',           src: 'public/images/work/galderma.png',                              mode: 'transparent' },

  // 4. RELIANCE
  { slug: 'sephora',            src: 'public/images/work/sephora.png',                               mode: 'transparent' },

  // 5. NYKAA
  { slug: 'nykaa',              src: 'public/images/work/nykaa.png',                                 mode: 'transparent' },
  { slug: 'nykaa-beauty',       src: 'public/images/work/nykaa-beauty.png',                          mode: 'transparent' },
  { slug: 'kaybeauty',          src: 'public/images/work/kaybeauty.png',                             mode: 'transparent' },

  // 6. DR. REDDY'S
  { slug: 'dr-reddys',          src: 'public/images/work/dr-reddys.png',                             mode: 'transparent' },

  // 7. PRESTIGE & D2C BRANDS
  { slug: 'esteelauder',        src: 'public/images/work/esteelauder.png',                           mode: 'transparent' },
  { slug: 'benefit',            src: 'public/images/work/benefit.png',                               mode: 'transparent' },
  { slug: 'lactocalamine',      src: 'public/images/work/lactocalamine.png',                         mode: 'transparent' },
  { slug: 'sebamed',            src: 'public/images/work/sebamed.png',                               mode: 'transparent' },
  { slug: 'plum',               src: 'public/images/work/dfaa90c4-c8cb-4a09-81de-e0416b801082.png',  mode: 'white-bg-letters' },
  { slug: 'forest-essentials',  src: 'public/images/work/Forest-Essentials-Logo1.jpg',               mode: 'white-bg-flood' },
  { slug: 'loccitane',          src: 'public/images/work/stampa-174408591.webp',                     mode: 'white-bg-letters' },
  { slug: 'laneige',            src: 'public/images/work/06410d77-9049-4aba-8e47-58c6aede0cd2.avif', mode: 'white-bg-letters' },
  { slug: 'ponds',              src: 'public/images/work/738d3c24087009330c1f293f06615a28.jpg',      mode: 'white-bg-letters' },
  { slug: 'tresemme',           src: 'public/images/work/images.jpg',                                mode: 'white-bg-letters' },
  { slug: 'biore',              src: 'public/images/work/images (1).png',                            mode: 'white-bg-letters' },
  { slug: 'mustela',            src: 'public/images/work/images (2).png',                            mode: 'white-bg-letters' },
  { slug: 'starbucks',          src: 'public/images/work/images (3).png',                            mode: 'white-bg-flood' },
  { slug: 'kelloggs',           src: 'public/images/work/images (4).png',                            mode: 'white-bg-letters' },
  { slug: 'yakult',             src: 'public/images/work/images (5).png',                            mode: 'white-bg-letters' },
  { slug: 'forevermark',        src: 'public/images/work/images (6).png',                            mode: 'white-bg-letters' },
  { slug: 'kimirica',           src: 'public/images/work/images (7).png',                            mode: 'white-bg-letters' },
  { slug: 'natures-basket',     src: 'public/images/work/2e383e4f-8d44-4c97-bb45-bc22972fd290.png',  mode: 'white-bg-letters' },
  { slug: 'belif',              src: 'public/images/work/images.png',                                mode: 'white-bg-letters' },
  { slug: 'truefitt-hill',      src: 'public/images/work/truefitt-hill-665151.png',                  mode: 'transparent' },
  { slug: 'the-beauty-co',      src: 'public/images/work/ph-11134275-7ra0r-mdcwnmd6cdimaf.jpg',      mode: 'white-bg-letters' },
  { slug: 'parcos',             src: 'public/images/work/download (1).png',                          mode: 'white-bg-letters' },
  { slug: 'sereko',             src: 'public/images/work/images.png',                                mode: 'white-bg-letters' },
  { slug: 'vanity-wagon',       src: 'public/images/work/download.jpg',                              mode: 'white-bg-letters' },
  { slug: 'flormar',            src: 'public/images/work/download.png',                              mode: 'white-bg-letters' },
  { slug: 'aroma-magic',        src: 'public/images/work/download (1).jpg',                          mode: 'white-bg-letters' },
  { slug: 'bharat-vedica',      src: 'public/images/work/download (2).jpg',                          mode: 'white-bg-letters' },
  { slug: 'olivia',             src: 'public/images/work/download (3).jpg',                          mode: 'white-bg-letters' },
  { slug: 'aptagrow',           src: 'public/images/work/image_5424a54a.jpg',                        mode: 'white-bg-letters' },
  { slug: 'waffle-mill',        src: 'public/images/work/image_a85bd6fd.jpg',                        mode: 'white-bg-letters' },
  { slug: 'oradoro',            src: 'public/images/work/image_5830b670.jpg',                        mode: 'white-bg-letters' },
  { slug: 'global-beauty-secrets', src: 'public/images/work/image_7a4564bd.jpg',                     mode: 'white-bg-letters' },
  { slug: 'lovechild',          src: 'public/images/work/lovechild-by-masaba-logo-big.jpg',          mode: 'white-bg-letters' },
];

const EXTRA_BRANDS = [
  { slug: 'palmolive',      text: 'PALMOLIVE',      font: 'sans-serif', size: 36, weight: '800', tracking: '0.12em' },
  { slug: 'acelabs',        text: 'ACELABS',        font: 'sans-serif', size: 34, weight: '700', tracking: '0.16em' },
];

fs.mkdirSync('public/images/clients', { recursive: true });

async function getTrimmedLogoBuffer(item) {
  let img = sharp(item.src);
  if (item.mode === 'transparent') {
    return await img.ensureAlpha().trim().png().toBuffer();
  }

  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  if (item.mode === 'preserve-colors') {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const brightness = (r + g + b) / 3;
      if (brightness >= 240) {
        data[i+3] = 0;
      } else {
        const alpha = Math.min(255, Math.round((255 - brightness) * 1.4));
        data[i+3] = alpha;
      }
    }
  } else if (item.mode === 'white-bg-letters') {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const brightness = (r + g + b) / 3;
      if (brightness >= 225) {
        data[i+3] = 0;
      } else {
        const alpha = Math.min(255, Math.round((255 - brightness) * 1.3));
        data[i] = 20;
        data[i+1] = 20;
        data[i+2] = 20;
        data[i+3] = alpha;
      }
    }
  } else if (item.mode === 'white-bg-flood') {
    const isBg = (r, g, b) => r >= 225 && g >= 225 && b >= 225;
    const visited = new Uint8Array(width * height);
    const queue = [];

    for (let x = 0; x < width; x++) {
      if (isBg(data[x*4], data[x*4+1], data[x*4+2])) { visited[x] = 1; queue.push(x); }
      const bIdx = (height - 1) * width + x;
      if (isBg(data[bIdx*4], data[bIdx*4+1], data[bIdx*4+2])) { visited[bIdx] = 1; queue.push(bIdx); }
    }
    for (let y = 0; y < height; y++) {
      const lIdx = y * width;
      if (isBg(data[lIdx*4], data[lIdx*4+1], data[lIdx*4+2]) && !visited[lIdx]) { visited[lIdx] = 1; queue.push(lIdx); }
      const rIdx = y * width + width - 1;
      if (isBg(data[rIdx*4], data[rIdx*4+1], data[rIdx*4+2]) && !visited[rIdx]) { visited[rIdx] = 1; queue.push(rIdx); }
    }

    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      const px = pos % width;
      const py = Math.floor(pos / width);
      const neighbors = [
        px > 0 ? pos - 1 : -1,
        px < width - 1 ? pos + 1 : -1,
        py > 0 ? pos - width : -1,
        py < height - 1 ? pos + width : -1
      ];
      for (const n of neighbors) {
        if (n !== -1 && !visited[n]) {
          const nIdx = n * 4;
          if (isBg(data[nIdx], data[nIdx+1], data[nIdx+2])) {
            visited[n] = 1;
            queue.push(n);
          }
        }
      }
    }

    for (let i = 0; i < visited.length; i++) {
      if (visited[i]) data[i * 4 + 3] = 0;
    }
  }

  return await sharp(data, { raw: { width, height, channels: 4 } }).trim().png().toBuffer();
}

async function processAll() {
  const CANVAS_SIZE = 400;

  for (const item of CLIENT_SOURCES) {
    try {
      const trimmedBuf = await getTrimmedLogoBuffer(item);
      const meta = await sharp(trimmedBuf).metadata();
      const W = meta.width;
      const H = meta.height;
      const R = W / H;

      let Bw, Bh;
      if (R >= 3.0) { Bw = 330; Bh = 110; }
      else if (R >= 2.0) { Bw = 300; Bh = 140; }
      else if (R >= 1.3) { Bw = 260; Bh = 170; }
      else if (R >= 0.8) { Bw = 210; Bh = 210; }
      else { Bw = 170; Bh = 230; }

      const scale = Math.min(Bw / W, Bh / H);
      const scaledW = Math.max(1, Math.round(W * scale));
      const scaledH = Math.max(1, Math.round(H * scale));

      const resizedLogo = await sharp(trimmedBuf)
        .resize(scaledW, scaledH, { fit: 'fill' })
        .toBuffer();

      const left = Math.round((CANVAS_SIZE - scaledW) / 2);
      const top = Math.round((CANVAS_SIZE - scaledH) / 2);

      const outPath = `public/images/clients/${item.slug}.png`;
      await sharp({
        create: {
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{ input: resizedLogo, left, top }])
      .png()
      .toFile(outPath);

      console.log(`✓ ${item.slug.padEnd(20)}: raw ${W}x${H} -> scaled ${scaledW}x${scaledH} -> 400x400`);
    } catch (err) {
      console.error(`✗ Error on ${item.slug}:`, err.message);
    }
  }

  for (const b of EXTRA_BRANDS) {
    const svg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <text x="200" y="200" text-anchor="middle" dominant-baseline="central"
            font-family="${b.font}, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-weight="${b.weight}"
            font-size="${b.size}px"
            letter-spacing="${b.tracking}"
            fill="#171717">${b.text}</text>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(`public/images/clients/${b.slug}.png`);
    console.log(`✓ ${b.slug.padEnd(20)}: generated typography wordmark -> 400x400`);
  }

  console.log('\nAll 51 client logos generated in public/images/clients/ !');
}

processAll();
