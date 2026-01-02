import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = './public/game-assets';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImage(prompt, filename, size = '1024x1024') {
  const zai = await ZAI.create();

  const response = await zai.images.generations.create({
    prompt: prompt,
    size: size
  });

  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, 'base64');
  const outputPath = path.join(outputDir, filename);
  fs.writeFileSync(outputPath, buffer);

  console.log(`✓ Generated: ${filename}`);
  return outputPath;
}

async function generateAllImages() {
  console.log('🎨 Generating game assets...\n');

  try {
    // Moneda de oro - recompensa
    await generateImage(
      'Cute cartoon golden coin with star, 3D, cartoon style, bright colors, happy expression, isolated on transparent background, game asset',
      'coin.png',
      '512x512'
    );

    // Mascota - personaje simpático
    await generateImage(
      'Friendly cute robot mascot, round shape, big eyes, happy smile, colorful cartoon style, educational character, 3D render, bright and cheerful',
      'mascot.png',
      '1024x1024'
    );

    // Nivel 1 - Monomio
    await generateImage(
      'Simple mathematical expression with one term, colorful cartoon style, educational, friendly numbers, bright yellow background, game icon, 3D',
      'level-monomial.png',
      '512x512'
    );

    // Nivel 2 - Binomio
    await generateImage(
      'Mathematical expression with two terms, colorful cartoon style, educational, friendly numbers and letters, orange background, game icon, 3D',
      'level-binomial.png',
      '512x512'
    );

    // Nivel 3 - Trinomio
    await generateImage(
      'Mathematical expression with three terms, colorful cartoon style, educational, friendly numbers and letters, green background, game icon, 3D',
      'level-trinomial.png',
      '512x512'
    );

    // Nivel 4 - Cuatrinomio
    await generateImage(
      'Mathematical expression with four terms, colorful cartoon style, educational, friendly numbers and letters, purple background, game icon, 3D, challenging',
      'level-quadrinomial.png',
      '512x512'
    );

    // Fondo del juego
    await generateImage(
      'Colorful abstract background for kids educational game, soft pastel colors, playful geometric shapes, friendly and inviting, suitable for children',
      'game-background.png',
      '1440x720'
    );

    // Estrella de victoria
    await generateImage(
      'Golden star trophy, cartoon style, shining, celebration, 3D render, bright and cheerful, game achievement icon',
      'victory-star.png',
      '512x512'
    );

    // Ícono de ayuda
    await generateImage(
      'Light bulb idea icon, cartoon style, bright yellow, helpful, educational, 3D, friendly',
      'help-icon.png',
      '512x512'
    );

    console.log('\n🎉 All images generated successfully!');
  } catch (error) {
    console.error('❌ Error generating images:', error);
  }
}

generateAllImages();
