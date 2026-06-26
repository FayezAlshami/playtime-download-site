const API = 'https://api.play.nivx.org/api';

function formatNumber(n) {
  if (n === null || n === undefined) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString('ar-SA');
}

async function trackVisit() {
  try {
    await fetch(`${API}/app/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (_) {
    // non-blocking — ignore network errors
  }
}

async function loadStats() {
  try {
    const res = await fetch(`${API}/app/stats`);
    // stats endpoint is JWT-protected; if public stats are desired in future,
    // the backend can expose them. For now we just update after download click.
  } catch (_) {}
}

function attachDownloadTracking() {
  const btn = document.getElementById('download-btn');
  if (!btn) return;

  btn.addEventListener('click', async (e) => {
    // Let the browser follow the href naturally; tracking is server-side
    // via the /download route which increments the counter before streaming.
    // No need for extra JS tracking here.
  });
}

// ── Entry point ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  trackVisit();
  attachDownloadTracking();
});
