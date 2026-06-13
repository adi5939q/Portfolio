document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================================================
  // THEME SWITCHER
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference, otherwise default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================================================
  // STICKY NAVBAR ON SCROLL
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body overflow to prevent background scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  };

  mobileToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ==========================================================================
  // ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // ==========================================================================
  // TYPING ANIMATION
  // ==========================================================================
  const typingTextSpan = document.getElementById('typing-text');
  const roles = [
    'Student at REVA University',
    'Frontend Developer',
    'Tech Enthusiast',
    'Problem Solver'
  ];
  
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newRoleDelay = 2000; // Delay between roles
  
  let roleIndex = 0;
  let charIndex = 0;
  
  const type = () => {
    if (charIndex < roles[roleIndex].length) {
      typingTextSpan.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newRoleDelay);
    }
  };
  
  const erase = () => {
    if (charIndex > 0) {
      typingTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      roleIndex++;
      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }
      setTimeout(type, typingSpeed + 500);
    }
  };

  // Start typing animation
  if (roles.length && typingTextSpan) {
    setTimeout(type, 1000);
  }

  // ==========================================================================
  // CONTACT FORM VALIDATION & MOCK SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic field checking
      if (!name || !email || !subject || !message) {
        showFeedback('Please fill out all fields.', 'error');
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Mock API timeout
      setTimeout(() => {
        showFeedback('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 1500);
    });
  }

  const showFeedback = (msg, type) => {
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    
    // Automatically hide after 5 seconds
    setTimeout(() => {
      formFeedback.className = 'form-feedback hidden';
    }, 5000);
  };
});
