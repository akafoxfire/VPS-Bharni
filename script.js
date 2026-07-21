// ===== Mobile nav toggle (present on every page) =====
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Hero background photo slideshow (index.html only) =====
const heroBgImgs = document.querySelectorAll('.hero-bg-img');
if (heroBgImgs.length > 1) {
  let activeIndex = 0;
  setInterval(() => {
    heroBgImgs[activeIndex].classList.remove('is-active');
    activeIndex = (activeIndex + 1) % heroBgImgs.length;
    heroBgImgs[activeIndex].classList.add('is-active');
  }, 5000);
}

// ===== Academics stage tabs + growth rings (index.html only) =====
const stageTabs = document.querySelectorAll('.stage-tab');
const stagePanels = document.querySelectorAll('.stage-panel-content');
const stageRings = document.querySelectorAll('.stage-ring');

if (stageTabs.length) {
  const setStage = (stage) => {
    stageTabs.forEach(tab => {
      const active = tab.dataset.stage === stage;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    stagePanels.forEach(panel => {
      panel.classList.toggle('is-active', panel.dataset.stage === stage);
    });
    stageRings.forEach(ring => {
      ring.classList.toggle('is-active', ring.dataset.stage === stage);
    });
  };

  stageTabs.forEach(tab => {
    tab.addEventListener('click', () => setStage(tab.dataset.stage));
  });

  setStage('primary');
}

// ===== Admission enquiry form (index.html only, client-side demo handling) =====
const admissionForm = document.getElementById('admissionForm');
const formStatus = document.getElementById('formStatus');

if (admissionForm && formStatus) {
  admissionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!admissionForm.checkValidity()) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = '#7A3B3B';
      return;
    }

    const data = new FormData(admissionForm);
    console.log('Admission enquiry submitted:', Object.fromEntries(data));

    formStatus.textContent = `Thanks, ${data.get('parentName')}. We've received your enquiry and will contact you within two working days.`;
    formStatus.style.color = '#2F5233';
    admissionForm.reset();
  });
}

// ===== Sticky header shadow on scroll (every page) =====
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 14px rgba(13,22,43,0.25)' : 'none';
  });
}