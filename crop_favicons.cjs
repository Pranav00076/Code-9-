const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'favicon_io');
const publicPath = path.join(__dirname, 'public');

async function processImages() {
  try {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
      if (file.endsWith('.png')) {
        const filePath = path.join(directoryPath, file);
        const image = await Jimp.read(filePath);
        const originalWidth = image.bitmap.width;
        
        // Autocrop removes transparent borders
        image.autocrop();
        
        // Resize back to original size so that the icon fills the entire image
        image.resize(originalWidth, Jimp.AUTO);
        
        // Ensure it's square if the original was square, otherwise scale to fit
        if (originalWidth === image.bitmap.height || file.includes('x')) {
            image.contain(originalWidth, originalWidth, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
        }
        
        const outPath = path.join(publicPath, file);
        await image.writeAsync(outPath);
        console.log(`Processed: ${file} and saved to public/`);
      }
    }
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
