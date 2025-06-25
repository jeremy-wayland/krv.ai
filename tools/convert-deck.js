// tools/convert-deck.js
const { PDFImage } = require("pdf-image");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function convert(pdfPath) {
  const pdfImage = new PDFImage(pdfPath, {
    convertOptions: { "-density": "150", "-quality": "90" },
  });
  const pageCount = await pdfImage.numberOfPages();

  const slidesDir = path.join(__dirname, "..", "public", "deck", "slides");
  const thumbsDir = path.join(__dirname, "..", "public", "deck", "thumbs");
  fs.mkdirSync(slidesDir, { recursive: true });
  fs.mkdirSync(thumbsDir, { recursive: true });

  for (let i = 0; i < pageCount; i++) {
    const imagePath = await pdfImage.convertPage(i);
    const slidePath = path.join(slidesDir, `slide-${i + 1}.jpg`);
    fs.renameSync(imagePath, slidePath);

    // generate thumbnail
    await sharp(slidePath)
      .resize({ height: 100 })
      .jpeg({ quality: 80 })
      .toFile(path.join(thumbsDir, `thumb-${i + 1}.jpg`));
    console.log(`Generated slide-${i + 1} and thumb-${i + 1}`);
  }
}

convert(path.join(__dirname, "..", "public", "deck", "PitchDeck.pdf"));
