document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const heroScroll = document.querySelector('.hero-scroll');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    const isActive = navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.section-header, .menu-category, .review-card, .order-card, .about-card-inner, .location-card, .feature-item'
  );

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const menuCards = document.querySelectorAll('.menu-category');
  menuCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  const reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let autoTimer;

    function goToSlide(index) {
      heroSlides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-selected', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % heroSlides.length);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(nextSlide, 6000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
    dots.forEach(d => {
      d.addEventListener('click', () => {
        const idx = parseInt(d.getAttribute('data-slide'), 10);
        if (!isNaN(idx)) { goToSlide(idx); resetAuto(); }
      });
    });

    autoTimer = setInterval(nextSlide, 6000);
  }

  const navLinksSmooth = document.querySelectorAll('a[href^="#"]');
  navLinksSmooth.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});