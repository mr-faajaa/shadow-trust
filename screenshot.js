const puppeteer = require('puppeteer');
const path = require('path');

async function screenshot(url, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outputPath, fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to:', outputPath);
}

const url = process.argv[2] || 'https://x.com/shawmakesmagic/status/2020662587525124282';
const output = process.argv[3] || '/home/ubuntu/.openclaw/media/outbound/screenshot.png';

screenshot(url, output).catch(console.error);
