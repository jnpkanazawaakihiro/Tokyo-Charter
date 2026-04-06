/* =====================================================
   MEDI ALPHA PLUS — main.js
   ===================================================== */

/* ---------- CTA リンク設定 ---------- */
const CTA_URL = 'https://medialphaplus.myshopify.com/pages/%E3%83%81%E3%83%A3%E3%83%BC%E3%82%BF%E3%83%BC%E8%A6%8B%E7%A9%8D';

/* ---------- ヘッダースクロール ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---------- モバイルメニュー ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ---------- CTA ボタン — 全てのCTAに同一URLを設定 ---------- */
document.querySelectorAll('[data-cta]').forEach(el => {
  el.addEventListener('click', () => {
    window.open(CTA_URL, '_blank', 'noopener,noreferrer');
  });
});

/* ---------- フローティングCTA ---------- */
const floatingCta = document.getElementById('floatingCta');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    floatingCta?.classList.add('visible');
  } else {
    floatingCta?.classList.remove('visible');
  }
}, { passive: true });

/* ---------- 見積シミュレーター ---------- */
const PRICES = {
  base: {
    nagoya: 30000,
    gifu:   35000,
    shiga:  35000,
    kyoto:  38000,
    nara:   38000,
    osaka:  40000,
  },
  temp: {
    normal: 0,
    cold:   5000,
    frozen: 10000,
  },
  weight: {
    under: 0,
    over:  5000,
  }
};

function calcPrice() {
  const area   = document.getElementById('simArea')?.value   || 'nagoya';
  const temp   = document.getElementById('simTemp')?.value   || 'normal';
  const weight = document.getElementById('simWeight')?.value || 'under';

  const total = (PRICES.base[area] || 30000)
              + (PRICES.temp[temp] || 0)
              + (PRICES.weight[weight] || 0);

  const el = document.getElementById('simPrice');
  if (el) {
    el.textContent = '¥' + total.toLocaleString('ja-JP');
  }
}

['simArea','simTemp','simWeight'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', calcPrice);
});
calcPrice();

/* ---------- お問い合わせフォーム ---------- */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  // 必須チェック
  contactForm.querySelectorAll('[required]').forEach(field => {
    const err = field.parentElement.querySelector('.form-error');
    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = '#e63946';
      if (err) err.style.display = 'block';
    } else {
      field.style.borderColor = '';
      if (err) err.style.display = 'none';
    }
  });

  if (!valid) return;

  // 送信成功演出（実際はメール等に転送が必要）
  contactForm.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});

/* ---------- スクロールアニメーション ---------- */
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

/* ---------- スムーススクロール (ナビ) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
