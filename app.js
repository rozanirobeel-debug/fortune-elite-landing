(() => {
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');
  const heroImg = document.getElementById('heroImg');
  const cinematicSection = document.getElementById('cinematic');
  const cinematicImg = document.getElementById('cinematicImg');

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 60);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progress.style.width = pct + '%';

    if (heroImg) {
      const heroHeight = window.innerHeight;
      const shift = Math.min(y * 0.35, heroHeight * 0.4);
      heroImg.style.transform = `scale(1.08) translateY(${shift}px)`;
    }

    if (cinematicSection && cinematicImg) {
      const rect = cinematicSection.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolledInto = -rect.top;
      let t = total > 0 ? scrolledInto / total : 0;
      t = Math.max(0, Math.min(1, t));
      const scale = 1 + t * 0.35;
      const brightness = 0.75 + t * 0.35;
      cinematicImg.style.transform = `scale(${scale.toFixed(3)})`;
      cinematicImg.style.filter = `saturate(1) brightness(${brightness.toFixed(2)})`;
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll('.reveal, #buildingDraw');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));

  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.getElementById('enquiryForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = "Thanks — this preview form doesn't send anywhere yet. Hook it up to a real inbox before launch.";
      note.style.color = '#ffb066';
    });
  }
})();
