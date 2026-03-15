const { chromium } = require('playwright-core');
const path = require('path');

async function screenshot(url, outputPath) {
  console.log('Launching browser...');
  
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  console.log('Navigating to:', url);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: outputPath, fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved to:', outputPath);
}

const url = process.argv[2] || 'https://x.com/shawmakesmagic/status/2020662587525124282';
const output = process.argv[3] || '/home/ubuntu/.openclaw/media/outbound/playwright-screenshot.png';

screenshot(url, output).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
