(() => {
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');
  const heroImg = document.getElementById('heroImg');

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
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));

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
