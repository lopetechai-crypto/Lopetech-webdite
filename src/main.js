import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 1. ORIONEX-STYLE PRELOADER (Cycling Characters) ---
  const preloader = document.getElementById('preloader');
  const characters = document.querySelectorAll('.preloader-character');
  let currentChar = 0;
  
  // Cycle through characters every 800ms
  const charCycle = setInterval(() => {
    characters[currentChar].classList.remove('active');
    currentChar = (currentChar + 1) % characters.length;
    characters[currentChar].classList.add('active');
  }, 800);

  // After ~3 seconds, fade out the preloader
  setTimeout(() => {
    clearInterval(charCycle);
    preloader.classList.add('loaded');
    document.body.style.overflowY = 'auto';
    // Remove from DOM after fade
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 700);
  }, 3000);

  // Disable scrolling while preloader runs
  document.body.style.overflowY = 'hidden';

  // --- 2. FLOATING HAMBURGER MENU OVERLAY ---
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  const openMenu = () => {
    menuOverlay.classList.add('active');
  };

  const closeMenu = () => {
    menuOverlay.classList.remove('active');
  };

  if (menuToggle && menuClose && menuOverlay) {
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- 3. DYNAMIC SCROLL THEME SWITCHER (IntersectionObserver) ---
  const scrollTriggers = document.querySelectorAll('.scroll-trigger');
  
  const themeObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Trigger theme switch when section takes up the center of the viewport
    threshold: 0
  };

  const themeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const theme = entry.target.getAttribute('data-theme');
        
        if (theme === 'light') {
          document.body.classList.add('light-theme');
        } else {
          document.body.classList.remove('light-theme');
        }
      }
    });
  }, themeObserverOptions);

  scrollTriggers.forEach(trigger => {
    themeObserver.observe(trigger);
  });

  // --- 3.5 FEEL GOOD SCROLL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate once per load
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- 4. SERVICES ACCORDION INTERACTION ---
  const accordionItems = document.querySelectorAll('.services-accordion-list .accordion-item');

  const initServicesAccordion = () => {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      
      // If active by default, set its height
      if (item.classList.contains('active')) {
        content.style.height = `${content.scrollHeight}px`;
      }
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Collapse all items
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.height = '0px';
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          content.style.height = `${content.scrollHeight}px`;
        }
      });
    });
  };

  if (accordionItems.length > 0) {
    initServicesAccordion();
  }

  // --- 5. FAQ ACCORDION INTERACTION ---
  const faqItems = document.querySelectorAll('.faq-accordion-list .faq-item');

  const initFaqAccordion = () => {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      const content = item.querySelector('.faq-content');
      
      // If active by default, set height
      if (item.classList.contains('active')) {
        content.style.height = `${content.scrollHeight}px`;
      }
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Collapse all faq items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.height = '0px';
        });
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          content.style.height = `${content.scrollHeight}px`;
        }
      });
    });
  };

  if (faqItems.length > 0) {
    initFaqAccordion();
  }

  // --- 6. ANIMATED STATS COUNTERS ---
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let current = 0;
      const duration = 1500; // Total animation length in ms
      const stepTime = Math.abs(Math.floor(duration / target));
      
      const timer = setInterval(() => {
        current += 1;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // Format layout suffix
        if (target === 50) {
          stat.textContent = `${current}+`;
        } else if (target === 98) {
          stat.textContent = `${current}%`;
        } else if (target === 5) {
          stat.textContent = `${current}Y`;
        } else {
          stat.textContent = `${current}+`;
        }
      }, stepTime);
    });
  };

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          statsAnimated = true;
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  // --- 7. FLOATING ACTION WORK STACK ---
  const floatingWorkStack = document.getElementById('floating-work-stack-btn');
  if (floatingWorkStack) {
    floatingWorkStack.addEventListener('click', (e) => {
      e.preventDefault();
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 8. PREVENT CONTACT FORM RELOAD & SHOW MICRO-FEEDBACK ---
  const contactForm = document.getElementById('project-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✦';
        submitBtn.style.backgroundColor = '#00ff66';
        submitBtn.style.color = '#000000';
        
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 3000);
      }, 1500);
    });
  }

  // Adjust accordion height on window resize to keep layout pixel-perfect
  window.addEventListener('resize', () => {
    const activeAccordionContent = document.querySelector('.services-accordion-list .accordion-item.active .accordion-content');
    if (activeAccordionContent) {
      activeAccordionContent.style.height = `${activeAccordionContent.scrollHeight}px`;
    }
    const activeFaqContent = document.querySelector('.faq-accordion-list .faq-item.active .faq-content');
    if (activeFaqContent) {
      activeFaqContent.style.height = `${activeFaqContent.scrollHeight}px`;
    }
  });
  // --- 9. MAGNETIC BUTTON EFFECTS (Desktop Only) ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    const magneticBtns = document.querySelectorAll('.pill-btn, .project-options-btn, .hamburger-btn');
    
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      
      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.15s ease-out';
      });
    });

    // --- 10. MOUSE-TRACKING GRADIENT GLOW (Dark Sections) ---
    const darkSections = document.querySelectorAll('.dark-bg');
    
    darkSections.forEach(section => {
      section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        section.style.setProperty('--mouse-x', `${x}px`);
        section.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // --- 11. WORD-BY-WORD TEXT REVEAL ON HERO TITLE ---
  const heroTitle = document.querySelector('.hero-main-title');
  if (heroTitle) {
    const originalHTML = heroTitle.innerHTML;
    // Split text but preserve HTML tags like <span>
    const parts = originalHTML.split(/(<[^>]+>)/);
    let wordIndex = 0;
    
    const wrappedHTML = parts.map(part => {
      if (part.startsWith('<')) return part; // preserve tags
      return part.split(/(\s+)/).map(word => {
        if (word.trim() === '') return word;
        wordIndex++;
        return `<span class="word-reveal" style="animation-delay: ${wordIndex * 0.12}s">${word}</span>`;
      }).join('');
    }).join('');
    
    heroTitle.innerHTML = wrappedHTML;
  }

  // --- 12. GLOSSY CURSOR FOLLOWER (Desktop Only) ---
  if (!isTouchDevice) {
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursorFollower) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;
      let isMoving = false;
      let isHovering = false;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isMoving) {
          isMoving = true;
          cursorFollower.style.opacity = '1';
        }
      });

      // Interactive hover states
      const hoverables = document.querySelectorAll('a, button, .pill-btn, .project-card, .faq-header');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          isHovering = true;
          cursorFollower.style.background = 'rgba(255, 255, 255, 0.15)';
          cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          cursorFollower.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2), inset 0 4px 6px rgba(255, 255, 255, 0.4)';
        });
        el.addEventListener('mouseleave', () => {
          isHovering = false;
          cursorFollower.style.background = 'rgba(255, 77, 0, 0.25)';
          cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          cursorFollower.style.boxShadow = '0 0 20px rgba(255, 77, 0, 0.2), inset 0 4px 6px rgba(255, 255, 255, 0.3)';
        });
      });

      const animateCursor = () => {
        // Linear interpolation for smooth trailing
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        const scale = isHovering ? 'scale(1.8)' : 'scale(1)';
        cursorFollower.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) ${scale}`;
        
        requestAnimationFrame(animateCursor);
      };
      
      animateCursor();
    }
  }

});
