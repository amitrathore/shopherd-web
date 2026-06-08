// reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.block__copy, .block__art, .hero__inner > *').forEach((el) => {
  el.classList.add('reveal');
  io.observe(el);
});

// subtle parallax for floating stars
const stars = document.querySelectorAll('.float-star');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    stars.forEach((s, i) => {
      const speed = (i + 1) * 0.06;
      s.style.translate = `0 ${y * speed * -1}px`;
    });
    ticking = false;
  });
}, { passive: true });

// cursor-follow tilt on posters
document.querySelectorAll('.poster, .splitcard, .vipcard').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
