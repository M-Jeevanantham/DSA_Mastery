const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'dsa-complete.html');
const outDir = path.join(__dirname, 'frontend', 'src', 'data');
const outPath = path.join(outDir, 'index.js');

try {
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  // Find the content inside the <script> tags
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptMatch) {
    console.error('No script tag found in dsa-complete.html');
    process.exit(1);
  }
  
  const scriptContent = scriptMatch[1];
  
  // We want to export WEEKS, PHASES, LESSONS, etc.
  // The original script uses "const WEEKS=[...", so we can replace "const " with "export const " for the top-level variables.
  
  // Let's just create a modified version of the script block.
  // We only want the data definitions, not the functions like toggleWeek, refreshAll, etc.
  
  let exports = [];
  
  // Regex to match "const NAME = ..." or "const NAME={" or "const NAME=["
  const varRegex = /const\s+([A-Z_a-z0-9]+)\s*=\s*([\[\{][\s\S]*?\n\];|\n\};|[\s\S]*?;)/g;
  
  // Let's use a simpler approach: extract everything up to "let done=JSON.parse..." which is where the functions start.
  const dataLayerEnd = scriptContent.indexOf("let done=JSON.parse");
  
  let dataLayer = scriptContent.substring(0, dataLayerEnd);
  
  // Replace "const " with "export const "
  dataLayer = dataLayer.replace(/^const /gm, 'export const ');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(outPath, dataLayer, 'utf8');
  console.log(`Successfully extracted data to ${outPath}`);
  
} catch (error) {
  console.error('Error extracting data:', error);
}
