const { execSync } = require('child_process');
const fs = require('fs');

const url = process.argv[2] || 'https://x.com/shawmakesmagic/status/2020662587525124282';
const output = process.argv[3] || '/home/ubuntu/.openclaw/media/outbound/screenshot.png';

// Use chromium in headless mode
const cmd = `chromium-browser --headless --disable-gpu --no-sandbox --virtual-time-budget=5000 --dump-dom "${url}" > /tmp/page.html 2>/dev/null && echo "Page saved"`;

try {
  execSync(cmd, { timeout: 30000 });
  console.log('Page saved to /tmp/page.html');
  
  // Read and show first 500 chars
  const html = fs.readFileSync('/tmp/page.html', 'utf8');
  console.log('HTML length:', html.length, 'chars');
  console.log('First 500 chars:', html.substring(0, 500));
} catch (e) {
  console.error('Error:', e.message);
}
