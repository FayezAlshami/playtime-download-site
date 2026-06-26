const API = 'https://api.play.nivx.org/api';

// أرقام عرض فقط — منفصلة تماماً عن الداشبورد
const display = {
  visits: 8247,
  downloads: 2138,
};

function formatNumber(n) {
  return Math.floor(n).toLocaleString('ar-SA');
}

function renderStats() {
  const visitEl = document.getElementById('visit-count');
  const downloadEl = document.getElementById('download-count');
  if (visitEl) visitEl.textContent = formatNumber(display.visits);
  if (downloadEl) downloadEl.textContent = formatNumber(display.downloads);
}

function bumpStat(type) {
  const el = document.getElementById(type === 'visits' ? 'visit-count' : 'download-count');
  if (!el) return;

  display[type] += 1;
  el.textContent = formatNumber(display[type]);
  el.classList.remove('stat-bump');
  void el.offsetWidth;
  el.classList.add('stat-bump');
  setTimeout(() => el.classList.remove('stat-bump'), 700);
}

function scheduleMarketingBumps() {
  // أول زيادة بعد انتظار قصير — يشعر الزائر أن في نشاط حي
  const firstDelay = 12000 + Math.random() * 6000;
  setTimeout(() => bumpStat('visits'), firstDelay);

  // بعد ~5 دقائق — زيادة خفيفة إضافية إذا بقي على الصفحة
  setTimeout(() => {
    bumpStat('visits');
    setTimeout(() => {
      if (Math.random() > 0.35) bumpStat('downloads');
    }, 4000 + Math.random() * 3000);
  }, 5 * 60 * 1000);
}

async function trackVisit() {
  try {
    await fetch(`${API}/app/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (_) {
    // التتبع الحقيقي للداشبورد — لا يؤثر على الأرقام المعروضة
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  scheduleMarketingBumps();
  trackVisit();
});
