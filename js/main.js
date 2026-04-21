// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// ===== REVEAL ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...(el.parentElement?.children || [])].filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(el);
        setTimeout(() => el.classList.add('visible'), Math.min(idx * 80, 400));
        observer.unobserve(el);
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== STAT COUNTER =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        const duration = 1800;
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target);
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
});

// ===== LANGUAGE SWITCHER =====
let currentLang = localStorage.getItem('cll-lang') || 'en';

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('cll-lang', lang);

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (!text) return;
        // Preserve child elements (SVGs etc) — only update text nodes
        if (el.childElementCount === 0) {
            el.textContent = text;
        } else {
            // Find last text node and update it, or use innerHTML carefully
            el.innerHTML = text;
        }
    });

    // Toggle active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Toggle font class on body
    document.body.classList.toggle('lang-bn', lang === 'bn');

    // Update html lang attribute
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Apply on load
applyLang(currentLang);
