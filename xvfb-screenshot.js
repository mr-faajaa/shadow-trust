const { execSync } = require('child_process');

const url = process.argv[2] || 'https://x.com/shawmakesmagic/status/2020662587525124282';
const output = process.argv[3] || '/home/ubuntu/.openclaw/media/outbound/screenshot.png';

// Use chromium to take screenshot
const cmd = `xvfb-run -a chromium-browser --headless --disable-gpu --no-sandbox --screenshot="${output}" --window-size=1920,1080 "${url}" 2>/dev/null && echo "Screenshot saved to ${output}" && ls -la "${output}"`;

try {
  execSync(cmd, { timeout: 60000 });
} catch (e) {
  console.error('Error:', e.message);
}
