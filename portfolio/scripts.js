/* ===========================
   PORTFOLIO SCRIPTS
   Tarunjit Saha
=========================== */

'use strict';

// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }, 1600);
  }
});

// Prevent flash
document.body.classList.add('no-scroll');

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower
  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  };
  animateFollower();

  // Cursor hover states
  const interactiveEls = document.querySelectorAll('a, button, .project-item, .cert-card, .channel-item');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursorFollower.style.width = '52px';
      cursorFollower.style.height = '52px';
      cursorFollower.style.borderColor = 'rgba(91,127,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursorFollower.style.width = '36px';
      cursorFollower.style.height = '36px';
      cursorFollower.style.borderColor = 'rgba(91,127,255,0.5)';
    });
  });

  // Hide on leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

// ===========================
// NAVIGATION — Scroll State
// ===========================
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
}

// ===========================
// TYPING ANIMATION (Hero)
// ===========================
const typingEl = document.querySelector('.typing-animation');
if (typingEl) {
  const professions = [
    'Machine Learning Engineer',
    'Deep Learning Specialist',
    'Generative AI Developer',
    'Data Scientist',
    'AI Enthusiast'
  ];
  let idx = 0, charIdx = 0, isDeleting = false;

  const type = () => {
    const current = professions[idx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIdx === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      idx = (idx + 1) % professions.length;
      speed = 400;
    }

    setTimeout(type, speed);
  };
  setTimeout(type, 1800); // Start after loader
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => {
  revealObserver.observe(el);
});

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===========================
// COUNTER ANIMATION (Experience Page)
// ===========================
const counterEls = document.querySelectorAll('.number-val');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString();
          if (current < target) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString();
          }
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));
}

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

if (filterBtns.length && projectItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach((item, i) => {
        const categories = item.getAttribute('data-category') || '';
        const match = filter === 'all' || categories.includes(filter);

        if (match) {
          item.classList.remove('hidden');
          item.style.animationDelay = (i * 0.08) + 's';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 80);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ===========================
// CONTACT FORM SUBMISSION
// ===========================
const contactForm = document.getElementById('contact-form');
const resultEl = document.getElementById('result');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && resultEl && submitBtn) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        resultEl.className = 'form-result success';
        resultEl.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      resultEl.className = 'form-result error';
      resultEl.textContent = '✕ Something went wrong. Please email me directly at tarun2003jit@gmail.com';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }

    // Auto-clear message after 6 seconds
    setTimeout(() => {
      resultEl.className = 'form-result';
      resultEl.textContent = '';
    }, 6000);
  });
}

// ===========================
// FEATURED CARDS — Scroll Reveal
// ===========================
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.featured-card, .cert-card, .number-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});

// ===========================
// SMOOTH HOVER — Project Items
// ===========================
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', () => {
    const link = item.querySelector('.project-links a');
    if (link) {
      window.open(link.href, link.target || '_self');
    }
  });
});

// ===========================
// PARALLAX — Orbs
// ===========================
const orbs = document.querySelectorAll('.orb');
if (orbs.length && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 8;
      orb.style.transform = `translate(${xPct * speed}px, ${yPct * speed}px)`;
    });
  }, { passive: true });
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// ===========================
// STAGGER REVEAL — Timeline Items
// ===========================
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-24px)';
  item.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
  timelineObserver.observe(item);
});

// ===========================
// FORM INPUT — Floating Labels Effect
// ===========================
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});
