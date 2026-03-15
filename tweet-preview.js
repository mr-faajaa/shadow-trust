const fs = require('fs');

// Tweet content from Camoufox
const tweetContent = {
  author: "@shawmakesmagic (Verified)",
  text: "Over the last year we've built up a plugin ecosystem of 200+ plugins, tested and verified by the team to not contain malicious code. You can install our entire plugin ecosystem into OpenClaw: npm install @elizaos/openclaw-adapter",
  metrics: {
    replies: 53,
    reposts: 42,
    likes: 370,
    bookmarks: 296,
    views: "24.4K"
  },
  link: "github.com/elizaOS/openclaw-adapter"
};

// Generate a simple HTML representation
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    .tweet { border: 1px solid #e1e8ed; border-radius: 16px; padding: 16px; background: white; }
    .author { font-weight: bold; color: #0f1419; }
    .handle { color: #536471; font-weight: normal; }
    .verified { color: #1d9bf0; margin-left: 4px; }
    .text { margin: 12px 0; font-size: 15px; line-height: 1.5; color: #0f1419; }
    .code { background: #f7f9f9; padding: 8px 12px; border-radius: 8px; font-family: monospace; font-size: 13px; margin: 8px 0; }
    .metrics { display: flex; gap: 20px; color: #536471; font-size: 14px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #eff3f4; }
    .metric { display: flex; align-items: center; gap: 6px; }
  </style>
</head>
<body>
  <div class="tweet">
    <div><span class="author">Shaw (eth/acc)</span><span class="verified">✓</span> <span class="handle">@shawmakesmagic</span></div>
    <div class="text">${tweetContent.text}</div>
    <div class="code">npm install @elizaos/openclaw-adapter</div>
    <div class="metrics">
      <div class="metric">💬 ${tweetContent.metrics.replies}</div>
      <div class="metric">🔁 ${tweetContent.metrics.reposts}</div>
      <div class="metric">❤️ ${tweetContent.metrics.likes}</div>
      <div class="metric">👁️ ${tweetContent.metrics.views}</div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('/tmp/tweet-preview.html', html);
console.log('HTML preview saved to /tmp/tweet-preview.html');
console.log('\nTweet Summary:');
console.log('Author:', tweetContent.author);
console.log('Text:', tweetContent.text);
console.log('Metrics:', tweetContent.metrics);
