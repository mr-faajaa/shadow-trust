# Remote Browser Setup Guide

Give your OpenClaw agent on a VPS access to your local browser session.

## Overview

This guide explains how to:
1. Start your browser with remote debugging
2. Expose it via Tailscale VPN
3. Connect from your OpenClaw VPS

## Prerequisites

- [Tailscale](https://tailscale.com/) installed on both machines (VPS + your computer)
- Chrome/Brave/Edge browser
- OpenClaw running on a VPS

---

## Step 1: Install Tools on VPS

```bash
# Install agent-browser CLI
npm install -g agent-browser
```

---

## Step 2: Find Your Profile Directory Name

### Windows

Run in PowerShell:
```powershell
Get-ChildItem "$env:USERPROFILE\AppData\Local\BraveSoftware\Brave-Browser\User Data\" -Directory
```

Look for profile folders - they may show as:
- `Default`
- `Profile 1`, `Profile 2`, etc.
- Or a custom name like `Faajaa`

**Note:** The folder name may differ from the display name shown in Brave.

---

## Step 3: Start Browser with Debug Port

### Windows (PowerShell)

```powershell
# Replace "Profile X" with your actual profile folder name
"C:\Users\YOUR_USER\AppData\Local\BraveSoftware\Brave-Browser\Application\brave.exe" --remote-debugging-port=9222 --profile-directory="Profile X"
```

Example for Profile 3:
```powershell
"C:\Users\uthma\AppData\Local\BraveSoftware\Brave-Browser\Application\brave.exe" --remote-debugging-port=9222 --profile-directory="Profile 3"
```

### macOS (Terminal)

```bash
# Chrome
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --profile-directory="Profile X"

# Brave
/Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser --remote-debugging-port=9222 --profile-directory="Profile X"
```

### Linux

```bash
# Chrome
google-chrome --remote-debugging-port=9222 --profile-directory="Profile X"

# Brave
brave-browser --remote-debugging-port=9222 --profile-directory="Profile X"
```

---

## Step 4: Expose via Tailscale

### On Your Local Machine

```powershell
# Windows (PowerShell)
tailscale serve --tcp 9222 localhost:9222

# macOS/Linux
tailscale serve --tcp 9222 localhost:9222
```

Verify it's working:
```bash
curl http://localhost:9222/json/version
```

---

## Step 5: Connect from VPS

### Find Your Tailscale IP

On your VPS:
```bash
tailscale status | grep YOUR_COMPUTER_NAME
```

### Use agent-browser

```bash
# List tabs
agent-browser --cdp http://100.x.x.x:9222 tab list

# Take screenshot
agent-browser --cdp http://100.x.x.x:9222 screenshot

# Open URL
agent-browser --cdp http://100.x.x.x:9222 open https://example.com

# Get page snapshot
agent-browser --cdp http://100.x.x.x:9222 snapshot
```

---

## Quick Reference

| Action | Command |
|--------|---------|
| Find profiles (Win) | `Get-ChildItem "$env:USERPROFILE\AppData\Local\BraveSoftware\Brave-Browser\User Data\" -Directory` |
| Start Brave (Win) | `"PATH\brave.exe" --remote-debugging-port=9222 --profile-directory="Profile X"` |
| Tailscale serve | `tailscale serve --tcp 9222 localhost:9222` |
| List tabs | `agent-browser --cdp IP:9222 tab list` |
| Screenshot | `agent-browser --cdp IP:9222 screenshot` |
| Open URL | `agent-browser --cdp IP:9222 open URL` |

---

## Common Issues

### Profile not found / prompts for profile selection
- Close ALL browser instances first
- Use the exact folder name from Step 2 (not the display name)
- Try `--profile-directory="Profile 3"` or whatever number you see

### Port shows closed
- Ensure browser is running with `--remote-debugging-port=9222`
- Check with `netstat -ano | findstr :9222`

### Need to restart
1. Close browser completely
2. Start again with debug port
3. Restart tailscale serve

---

## Security Notes

1. **Tailscale is private** - only your devices on the same tailnet can connect
2. **Close when done** - stop the browser or disable remote debugging when not in use
3. **Use separate profile** - create a dedicated profile for agent use

