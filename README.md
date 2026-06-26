# PlayTime Download Site

Static download page for the PlayTime Android app, served at `download.play.nivx.org`.

## Structure

```
index.html   — RTL Arabic landing page (nivx dark theme)
styles.css   — Design tokens + layout
app.js       — Visit tracking via API
logo.png     — Copied from main project (not in repo, added on server)
```

## Deploy

Push to `main` → GitHub Actions syncs files to `/var/www/nivx/playtime/download-site/` via rsync.

### Required GitHub Secrets

| Secret | Value |
|--------|-------|
| `SSH_PRIVATE_KEY` | Private key for server access |
| `SSH_HOST` | `187.127.86.180` |
| `SSH_USER` | `root` |

## Logo

The `logo.png` file is not tracked in git. It must be present on the server at:
`/var/www/nivx/playtime/download-site/logo.png`
