/* ====================================================================
   PUNT I CÒPIA — main.js
   - Bilingual toggle (CA / ES) with localStorage persistence
   - Mobile nav
   - Scroll reveal via IntersectionObserver
   - Marquee duplication for seamless loop
   - Active nav highlighting
   ==================================================================== */

(() => {
    'use strict';

    /* ---------- Language toggle ---------- */
    const STORAGE_KEY = 'pic-lang';
    const DEFAULT_LANG = 'ca';
    const root = document.documentElement;

    function setLang(lang) {
        if (lang !== 'ca' && lang !== 'es') return;
        root.lang = lang;
        root.dataset.lang = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
        document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
            const isActive = btn.dataset.langSwitch === lang;
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        // Update browser tab title to match active language
        const titleEl = document.querySelector('title');
        if (titleEl && titleEl.dataset[lang]) {
            document.title = titleEl.dataset[lang];
        }
    }

    let saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (_) {}
    setLang(saved);

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-lang-switch]');
        if (!btn) return;
        setLang(btn.dataset.langSwitch);
    });

    /* ---------- Mobile nav ---------- */
    const navToggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.dataset.open === 'true';
            nav.dataset.open = String(!isOpen);
            navToggle.setAttribute('aria-expanded', String(!isOpen));
            document.body.style.overflow = !isOpen ? 'hidden' : '';
        });
        nav.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                nav.dataset.open = 'false';
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Scroll reveal ---------- */
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    } else {
        document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------- Marquee duplication ---------- */
    document.querySelectorAll('[data-marquee] .marquee__track').forEach((track) => {
        const html = track.innerHTML;
        track.innerHTML = html + html;
    });

    /* ---------- Header shadow on scroll ---------- */
    const header = document.querySelector('.site-header');
    if (header) {
        let lastY = 0;
        const onScroll = () => {
            const y = window.scrollY;
            header.classList.toggle('is-scrolled', y > 8);
            lastY = y;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Contact form (graceful no-op for demo) ---------- */
    const form = document.querySelector('[data-contact-form]');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = form.querySelector('[data-form-status]');
            if (status) {
                const ca = 'Gràcies. Et respondrem el més aviat possible.';
                const es = 'Gracias. Te responderemos lo antes posible.';
                status.textContent = root.dataset.lang === 'es' ? es : ca;
                status.hidden = false;
            }
            form.reset();
        });
    }
})();
