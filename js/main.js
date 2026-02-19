/* ===================================
   MAIN JAVASCRIPT
   Timeline Navigation, Scroll Animations, Interactions
   =================================== */

const eras = ['1995', '2000', '2005', '2010', '2015', '2020', '2025'];
const timelineNav = document.getElementById('timeline-nav');
const timelineProgress = document.getElementById('timeline-progress');

function startJourney() {
  const firstEra = document.getElementById('era-1995');
  if (firstEra) {
    firstEra.scrollIntoView({ behavior: 'smooth' });
  }
}

function goToEra(year) {
  const section = document.getElementById('era-' + year);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const observerOptions = {
  threshold: 0.15,
  rootMargin: '-50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const header = entry.target.querySelector('.era-header');
      const content = entry.target.querySelector('[class*="-content"]');

      if (header) header.classList.add('visible');

      if (content) {
        setTimeout(() => content.classList.add('visible'), 300);
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.era').forEach(section => {
  sectionObserver.observe(section);
});

let lastScrollY = 0;
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  const landingSection = document.getElementById('landing');
  const landingBottom = landingSection ? landingSection.offsetTop + landingSection.offsetHeight : 0;

  if (scrollY > landingBottom - windowHeight / 2) {
    timelineNav.classList.add('visible');
  } else {
    timelineNav.classList.remove('visible');
  }

  const scrollProgress = Math.min(
    ((scrollY - landingBottom) / (docHeight - landingBottom - windowHeight)) * 100,
    100
  );
  if (timelineProgress) {
    timelineProgress.style.width = Math.max(0, scrollProgress) + '%';
  }

  updateActiveEra(scrollY, windowHeight);

  lastScrollY = scrollY;
  ticking = false;
}

function updateActiveEra(scrollY, windowHeight) {
  let activeYear = null;

  eras.forEach(year => {
    const section = document.getElementById('era-' + year);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 3) {
      activeYear = year;
    }
  });

  document.querySelectorAll('.timeline-dot').forEach(dot => {
    const dotYear = dot.getAttribute('data-era');
    dot.classList.remove('active', 'passed');

    if (dotYear === activeYear) {
      dot.classList.add('active');
    } else if (activeYear && parseInt(dotYear) < parseInt(activeYear)) {
      dot.classList.add('passed');
    }
  });
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;

    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counter.dataset.animated = 'true';
      const text = counter.textContent;
      const numMatch = text.match(/[\d,]+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0].replace(/,/g, ''));
      const prefix = text.substring(0, text.indexOf(numMatch[0]));
      const suffix = text.substring(text.indexOf(numMatch[0]) + numMatch[0].length);
      const duration = 1500;
      const start = performance.now();

      function step(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);
        counter.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.3 });

const era2020 = document.getElementById('era-2020');
if (era2020) counterObserver.observe(era2020);

document.querySelectorAll('.chart-bar').forEach((bar, i) => {
  bar.style.transition = `height 0.8s ease ${i * 0.1}s`;
  bar.style.height = '0%';

  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetHeight = getComputedStyle(entry.target).getPropertyValue('--height');
        entry.target.style.height = targetHeight;
      }
    });
  }, { threshold: 0.5 });

  chartObserver.observe(bar);
});

document.querySelectorAll('.mat-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `all 0.5s ease ${i * 0.1}s`;

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  cardObserver.observe(card);
});

document.querySelectorAll('.bento-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px) scale(0.95)';
  item.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;

  const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }
    });
  }, { threshold: 0.1 });

  bentoObserver.observe(item);
});

document.querySelectorAll('.mat-flat-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(63, 81, 181, 0.2);
      width: 100px;
      height: 100px;
      left: ${e.clientX - rect.left - 50}px;
      top: ${e.clientY - rect.top - 50}px;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

const popup = document.querySelector('.popup-close-2000');
if (popup) {
  popup.addEventListener('click', function() {
    this.closest('.popup-ad-2000').style.display = 'none';
  });
}

document.querySelectorAll('.skeu-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

handleScroll();
