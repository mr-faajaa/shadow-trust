---
title: "API Keys Stored Unencrypted in Config"
date: 2026-02-03
category: security
memoryType: lesson
priority: 🔴
tags: [security, api-keys, config]
---

**Lesson:** API keys are stored unencrypted in `/home/ubuntu/.openclaw/openclaw.json`

**What's stored:**
- Telegram Bot Token
- Gateway Auth Token
- ElevenLabs API Key (sag)
- Google API Key (nano-banana-pro)

**Risk:** Anyone with file access can read these keys. The config file is necessary for operation but not secured.

**Mitigation:**
- Use environment variables where possible
- Consider secrets management for production
- Be mindful of this exposure when sharing screen access
