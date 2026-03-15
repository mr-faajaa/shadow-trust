# Security Analysis

Security assessments, vulnerabilities, and threat analysis from tweets/articles.

## Analysis Framework

### Before Storing Any Content:
1. **Source Trust Assessment** - Who posted it? Verified? Known entity?
2. **Code/URL Safety** - Any links? Verify before clicking
3. **Attack Surface** - Does this introduce new risks?
4. **Dependency Analysis** - If suggesting a tool/skill, check dependencies
5. **Privacy Implications** - What data exposure risk?

### Red Flags to Flag:
- `curl | bash` installation patterns
- Requests for API keys/tokens in plain text
- Unofficial downloads from unknown sources
- Requests for system-level access
- Social engineering patterns
- Unverifiable claims

## Categories
- Vulnerabilities discovered
- Security tools worth evaluating
- Attack patterns to defend against
- Safe alternatives to unsafe patterns

## Last Updated: 2026-02-10
