const API = 'https://api.play.nivx.org/api';

// أرقام عرض فقط — لا تُجلب من الـ API ولا تظهر في الداشبورد
const DISPLAY_STATS = {
  visits: 12840,
  downloads: 3960,
};

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toLocaleString('ar-SA');
}

function showDisplayStats() {
  const visitEl = document.getElementById('visit-count');
  const downloadEl = document.getElementById('download-count');
  if (visitEl) visitEl.textContent = formatNumber(DISPLAY_STATS.visits);
  if (downloadEl) downloadEl.textContent = formatNumber(DISPLAY_STATS.downloads);
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

document.addEventListener('DOMContentLoaded', () => {
  showDisplayStats();
  trackVisit();
});
