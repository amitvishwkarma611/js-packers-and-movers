import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputImage = path.resolve('public/logo.png');
const outputDir = path.resolve('public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  try {
    const image = sharp(inputImage);
    const metadata = await image.metadata();
    
    // Generate favicon
    await image
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    console.log('Generated favicon-32x32.png');

    for (const size of sizes) {
      // Standard icon (with some padding, e.g., 90% of the size)
      const standardPadding = Math.floor(size * 0.05);
      const standardInnerSize = size - (standardPadding * 2);
      
      await sharp(inputImage)
        .resize(standardInnerSize, standardInnerSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .extend({
          top: standardPadding,
          bottom: standardPadding,
          left: standardPadding,
          right: standardPadding,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(path.join(outputDir, `icon-${size}.png`));
        
      // Maskable icon (safe area 80%, so 10% padding on each side)
      const maskablePadding = Math.floor(size * 0.1);
      const maskableInnerSize = size - (maskablePadding * 2);
      
      await sharp(inputImage)
        .resize(maskableInnerSize, maskableInnerSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .extend({
          top: maskablePadding,
          bottom: maskablePadding,
          left: maskablePadding,
          right: maskablePadding,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(path.join(outputDir, `icon-${size}-maskable.png`));
        
      console.log(`Generated ${size}x${size} icons`);
    }
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
