# Scrapling Skill

Web scraping framework that handles everything from single requests to full-scale crawls. The parser learns from website changes and automatically relocates elements when pages update.

## When to Use

Use Scrapling when:
- Scraping websites that change frequently (adaptive element relocation)
- Bypassing anti-bot systems (Cloudflare Turnstile)
- Building concurrent crawlers with pause/resume
- Needing both HTTP requests and browser automation
- Working with Python for web scraping

## Installation

```bash
pip install scrapling
```

## Core Concepts

### Fetchers (HTTP & Browser)

```python
from scrapling.fetchers import Fetcher, StealthyFetcher, DynamicFetcher

# Fast HTTP with TLS fingerprinting
page = Fetcher.get('https://example.com')

# Stealth mode - bypasses Cloudflare, etc
page = StealthyFetcher.fetch('https://example.com', headless=True, network_idle=True)

# Full browser automation with Playwright
page = DynamicFetcher.fetch('https://example.com')
```

### Selection Methods

```python
page = Fetcher.get('https://quotes.toscrape.com/')

# CSS selectors
quotes = page.css('.quote .text::text').getall()

# XPath selectors  
quotes = page.xpath('//span[@class="text"]/text()').getall()

# BeautifulSoup-style
quotes = page.find_all('div', class_='quote')

# Find by text
quotes = page.find_by_text('quote', tag='div')
```

### Adaptive Selection (Survives Website Changes)

```python
# Save selectors that auto-relocate on page changes
products = page.css('.product', auto_save=True)

# Later, if website changes structure:
products = page.css('.product', adaptive=True)  # Finds elements using similarity
```

### Spider Framework (Crawling)

```python
from scrapling.spiders import Spider, Request, Response

class QuotesSpider(Spider):
    name = "quotes"
    start_urls = ["https://quotes.toscrape.com/"]
    concurrent_requests = 10

    async def parse(self, response: Response):
        for quote in response.css('.quote'):
            yield {
                "text": quote.css('.text::text').get(),
                "author": quote.css('.author::text').get(),
            }
        
        # Follow pagination
        next_page = response.css('.next a')
        if next_page:
            yield response.follow(next_page[0].attrib['href'])

result = QuotesSpider().start()
result.items.to_json("quotes.json")
```

### Pause & Resume

```bash
# Start crawl with checkpointing
QuotesSpider(crawldir="./crawl_data").start()

# Press Ctrl+C to pause gracefully
# Later, resume from same point:
QuotesSpider(crawldir="./crawl_data").start()
```

### Session Management

```python
from scrapling.fetchers import FetcherSession

with FetcherSession(impersonate='chrome') as session:
    page = session.get('https://quotes.toscrape.com/', stealthy_headers=True)
    quotes = page.css('.quote .text::text').getall()
```

### Proxy Rotation

```python
from scrapling.fetchers import StealthyFetcher
from scrapling.spiders import ProxyRotator

# Built-in rotation
fetcher = StealthyFetcher(proxy_rotator=ProxyRotator(['proxy1:port', 'proxy2:port']))
```

### CLI Usage

```bash
# Extract to file directly
scrapling extract get 'https://example.com' content.md

# With CSS selector
scrapling extract get 'https://example.com' content.txt --css-selector '#products'

# Stealth fetch (bypass Cloudflare)
scrapling extract stealthy-fetch 'https://example.com' result.html --solve-cloudflare
```

## Key Features

- 🕷️ Scrapy-like Spider API
- ⚡ Concurrent crawling with throttling
- 🔄 Multi-session support (HTTP + browser)
- 💾 Pause & resume with checkpoints
- 🛡️ Anti-bot bypass (Cloudflare Turnstile)
- 📡 Streaming mode for real-time stats
- 🎯 Smart element tracking (relocates after DOM changes)
- 🔍 Find similar elements
- 🤖 MCP server for AI integration
