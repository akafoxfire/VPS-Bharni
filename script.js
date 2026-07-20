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
  admissionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!admissionForm.checkValidity()) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = '#7A3B3B';
      return;
    }

    const submitBtn = admissionForm.querySelector('button[type="submit"]');
    const data = new FormData(admissionForm);
    const parentName = data.get('parentName');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    formStatus.textContent = '';

    try {
      const response = await fetch(admissionForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = `Thanks, ${parentName}. We've received your enquiry and will contact you within two working days.`;
        formStatus.style.color = '#2F5233';
        admissionForm.reset();
      } else {
        formStatus.textContent = "Something went wrong sending your enquiry — please call the admissions office instead.";
        formStatus.style.color = '#7A3B3B';
      }
    } catch (err) {
      formStatus.textContent = "Couldn't reach the server — check your connection and try again, or call the admissions office.";
      formStatus.style.color = '#7A3B3B';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Enquiry';
    }
  });
}

// ===== Sticky header shadow on scroll (every page) =====
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 14px rgba(13,22,43,0.25)' : 'none';
  });
}
