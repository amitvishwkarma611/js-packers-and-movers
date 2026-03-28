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
    
    for (const size of sizes) {
      // Standard icon
      await image
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
        
      // Maskable icon (add 10% padding to ensure it fits in the safe zone)
      const padding = Math.floor(size * 0.1);
      const innerSize = size - (padding * 2);
      
      await sharp(inputImage)
        .resize(innerSize, innerSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(path.join(outputDir, `icon-${size}x${size}-maskable.png`));
        
      console.log(`Generated ${size}x${size} icons`);
    }
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
