#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Configuration
const inputDir = "./public";
const outputDir = "./public/optimized";
const quality = 85;
const maxWidth = 1920;

// Supported image formats
const imageExtensions = [".jpg", ".jpeg", ".png", ".avif"];

// Recursively find all image files
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImageFiles(filePath, fileList);
    } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  try {
    const relativePath = path.relative(inputDir, inputPath);
    const outputPath = path.join(outputDir, relativePath);
    const outputDirPath = path.dirname(outputPath);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    const ext = path.extname(inputPath).toLowerCase();
    let outputFormat = ext;
    let finalOutputPath = outputPath;

    // Convert to WebP for better compression
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      outputFormat = ".webp";
      finalOutputPath = outputPath.replace(ext, ".webp");
    }

    console.log(`Optimizing: ${relativePath}`);

    let pipeline = sharp(inputPath);

    // Get image metadata
    const metadata = await pipeline.metadata();

    // Resize if too large
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    // Apply optimization based on format
    if (outputFormat === ".webp") {
      pipeline = pipeline.webp({ quality });
    } else if (outputFormat === ".avif") {
      pipeline = pipeline.avif({ quality });
    } else if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({ quality, progressive: true });
    } else if (ext === ".png") {
      pipeline = pipeline.png({ quality, progressive: true });
    }

    await pipeline.toFile(finalOutputPath);

    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(finalOutputPath).size;
    const savings = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(
      `  ✓ ${relativePath} → ${path.basename(
        finalOutputPath
      )} (${savings}% smaller)`
    );
  } catch (error) {
    console.error(`  ✗ Error optimizing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log("🖼️  Starting image optimization...\n");

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find all image files
  const imageFiles = findImageFiles(inputDir);

  if (imageFiles.length === 0) {
    console.log("No image files found.");
    return;
  }

  console.log(`Found ${imageFiles.length} image files to optimize.\n`);

  // Process images in batches to avoid overwhelming the system
  const batchSize = 5;
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    await Promise.all(batch.map(optimizeImage));
  }

  console.log("\n✅ Image optimization complete!");
  console.log(`\nOptimized images are saved in: ${outputDir}`);
  console.log("\nTo use optimized images:");
  console.log("1. Review the optimized images");
  console.log("2. Replace the original images with optimized versions");
  console.log("3. Update your code to use .webp extensions where applicable");
}

// Run the script
main().catch(console.error);
