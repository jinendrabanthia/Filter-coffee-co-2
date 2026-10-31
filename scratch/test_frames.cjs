const sharp = require('sharp');
const fs = require('fs');

async function testFrames() {
  const solidImg = await sharp('public/images/fcc-trademark-logo-2x.png').raw().toBuffer({ resolveWithObject: true });
  const outlineImg = await sharp('public/images/fcc-trademark-outline-2x.png').raw().toBuffer({ resolveWithObject: true });
  const W = solidImg.info.width, H = solidImg.info.height;

  // Let's create an image for:
  // pFilter, pCoffee, pCo (0..1)
  async function renderFrame(pFilter, pCoffee, pCo, outName) {
    const frame = Buffer.alloc(W * H * 4);
    // Background pure white
    for (let i = 0; i < W * H; i++) {
      frame[i * 4] = 255;
      frame[i * 4 + 1] = 255;
      frame[i * 4 + 2] = 255;
      frame[i * 4 + 3] = 255;
    }

    const xFilterCut = Math.round(W * 0.3945); // 808
    const xCoffeeCut = Math.round(W * 0.8603); // 1762

    // Letter bounds: top ~ 32, bottom ~ 196 (span 164)
    const yBot = 196, yTop = 32, span = yBot - yTop;
    const yFilterLine = yBot - pFilter * span;
    const yCoffeeLine = yBot - pCoffee * span;
    const yCoLine = yBot - pCo * span;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;

        // Check if solid fill is revealed
        let fillAlpha = 0;
        if (x < xFilterCut) {
          if (y >= yFilterLine && pFilter > 0) fillAlpha = solidImg.data[idx + 3];
        } else if (x < xCoffeeCut) {
          if (y >= yCoffeeLine && pCoffee > 0) fillAlpha = solidImg.data[idx + 3];
        } else {
          if (y >= yCoLine && pCo > 0) fillAlpha = solidImg.data[idx + 3];
        }

        const outlAlpha = outlineImg.data[idx + 3];

        // Composite:
        // solid fill is #111111 (17, 17, 17) with fillAlpha
        // outline is #111111 (17, 17, 17) with outlAlpha
        // combined alpha of black:
        const combinedAlpha = Math.max(fillAlpha, outlAlpha) / 255;
        // Blend over white (255)
        const finalR = Math.round(255 * (1 - combinedAlpha) + 17 * combinedAlpha);
        frame[idx] = finalR;
        frame[idx + 1] = finalR;
        frame[idx + 2] = finalR;
        frame[idx + 3] = 255;
      }
    }

    await sharp(frame, { raw: { width: W, height: H, channels: 4 } })
      .png()
      .toFile(outName);
    console.log(`Rendered frame: ${outName}`);
  }

  await renderFrame(0.0, 0.0, 0.0, 'scratch/frame-0s.png');
  await renderFrame(0.5, 0.0, 0.0, 'scratch/frame-1s.png');
  await renderFrame(1.0, 0.5, 0.0, 'scratch/frame-3s.png');
  await renderFrame(1.0, 1.0, 0.5, 'scratch/frame-5s.png');
  await renderFrame(1.0, 1.0, 1.0, 'scratch/frame-6s.png');
}

testFrames();

