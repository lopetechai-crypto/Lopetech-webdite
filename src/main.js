import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 1. CINEMATIC PRELOADER ---
  const preloader = document.getElementById('preloader');
  
  // After ~2.8 seconds, fade out the preloader
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('loaded');
      document.body.style.overflowY = 'auto';
      // Remove from DOM after fade transition completes
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1400);
    }
  }, 2800);

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

  // --- 3D PARTICLE & CYBER-CORE BACKGROUND ENGINE ---
  const init3DCanvas = () => {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });
    
    // 3D camera settings
    const fov = 450;
    
    // Core parameters (spinning geodesic wireframe sphere)
    const coreCenter = { x: 230, y: -40, z: 120 };
    let coreBaseRadius = 150;
    let corePulse = 0;
    const coreNodes = [];
    const coreConnections = [];
    
    // Generate geodesic sphere vertices
    const latBands = 7;
    const lonBands = 12;
    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      
      for (let lon = 0; lon <= lonBands; lon++) {
        const phi = (lon * 2 * Math.PI) / lonBands;
        const x = sinTheta * Math.cos(phi);
        const y = cosTheta;
        const z = sinTheta * Math.sin(phi);
        
        coreNodes.push({ x, y, z, lat, lon });
      }
    }
    
    // Map connections based on lat/lon indices to form a beautiful wireframe network
    for (let i = 0; i < coreNodes.length; i++) {
      for (let j = i + 1; j < coreNodes.length; j++) {
        const n1 = coreNodes[i];
        const n2 = coreNodes[j];
        const latDiff = Math.abs(n1.lat - n2.lat);
        const lonDiff = Math.abs(n1.lon - n2.lon);
        if (
          (latDiff === 0 && (lonDiff === 1 || lonDiff === lonBands)) ||
          (latDiff === 1 && (lonDiff === 0 || lonDiff === 1 || lonDiff === lonBands))
        ) {
          coreConnections.push([i, j]);
        }
      }
    }
    
    // Starfield parameters (far background depth layer)
    const starCount = 140;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 1000 - 300,
        size: Math.random() * 0.95 + 0.35
      });
    }
    
    // Interactive Constellation nodes (foreground layer)
    const particleCount = 75;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 1200,
        z: (Math.random() - 0.5) * 700,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.8 + 0.9
      });
    }
    
    // Core rotation angles & speeds
    let coreAngleX = 0.002;
    let coreAngleY = 0.003;
    let coreAngleZ = 0.001;
    
    // Mouse dynamics
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let mouseActive = false;
    
    // Click ripples
    const ripples = [];
    
    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
      mouseActive = true;
    });
    
    window.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
      mouseActive = false;
    });
    
    window.addEventListener('click', (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 280,
        speed: 7.5,
        opacity: 0.85
      });
      
      // Physical shockwave: repel particles near mouse click coordinates
      particles.forEach(p => {
        const scrollY = window.scrollY;
        // Project particle to screen space to match click
        const scale = fov / (fov + p.z);
        const projX = p.x * scale + width / 2;
        const projY = (p.y - scrollY * 0.08) * scale + height / 2;
        
        const dx = projX - e.clientX;
        const dy = projY - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 260) {
          const force = (260 - dist) * 0.08;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }
      });
    });
    
    // Helper rotations
    const rotate3dX = (p, rad) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    };
    
    const rotate3dY = (p, rad) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: p.x * cos - p.z * sin,
        y: p.y,
        z: p.x * sin + p.z * cos
      };
    };
    
    const rotate3dZ = (p, rad) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    };
    
    // Performance adaptives (target 60FPS)
    let lastTime = performance.now();
    let frameTimes = [];
    let scaleFactor = 1.0;
    
    const render = (time) => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      frameTimes.push(delta);
      if (frameTimes.length > 50) {
        frameTimes.shift();
        const avgDelta = frameTimes.reduce((a, b) => a + b) / 50;
        const fps = 1000 / avgDelta;
        if (fps < 48 && scaleFactor > 0.65) {
          scaleFactor = Math.max(0.65, scaleFactor - 0.05);
        } else if (fps > 56 && scaleFactor < 1.0) {
          scaleFactor = Math.min(1.0, scaleFactor + 0.02);
        }
      }
      
      ctx.clearRect(0, 0, width, height);
      
      // Interpolate mouse coordinates smoothly
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      
      const scrollY = window.scrollY;
      const zScrollShift = scrollY * 0.65;
      
      // Ambient slow-shifting color hues
      const hueShift = (time * 0.012) % 360;
      
      // --- 1. RENDER DEEP STARFIELD ---
      const minZ = -300;
      const maxZ = 700;
      const rangeZ = maxZ - minZ;
      
      const activeStars = Math.floor(stars.length * scaleFactor);
      for (let i = 0; i < activeStars; i++) {
        const s = stars[i];
        if (!s) continue;
        
        let starZ = s.z - zScrollShift * 0.15;
        starZ = ((starZ - minZ) % rangeZ + rangeZ) % rangeZ + minZ;
        
        let starPos = { x: s.x, y: s.y, z: starZ };
        starPos = rotate3dY(starPos, mouseX * 0.06);
        starPos = rotate3dX(starPos, mouseY * 0.06);
        
        const scale = fov / (fov + starPos.z);
        const projX = starPos.x * scale + width / 2;
        const projY = (starPos.y - scrollY * 0.04) * scale + height / 2;
        
        let opacity = 0.8;
        if (starPos.z > 500) opacity = (maxZ - starPos.z) / 200;
        else if (starPos.z < -100) opacity = (starPos.z - minZ) / 200;
        opacity = Math.max(0, Math.min(0.65, opacity));
        
        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, s.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.45})`;
          ctx.fill();
        }
      }
      
      // --- 2. RENDER CLICK RIPPLES ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity -= 0.02;
        
        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 77, 0, ${r.opacity * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      // --- 3. RENDER 3D CYBER-CORE GEODESIC SHIELD ---
      corePulse += 0.015;
      const currentCoreRadius = coreBaseRadius + Math.sin(corePulse) * 15;
      
      coreAngleX += 0.0015;
      coreAngleY += 0.0025;
      coreAngleZ += 0.0008;
      
      const rotatedCoreNodes = [];
      const coreXOffset = width > 992 ? width * 0.28 : 0;
      const coreYOffset = width > 992 ? -height * 0.06 : 0;
      
      for (let i = 0; i < coreNodes.length; i++) {
        const cn = coreNodes[i];
        
        let p = {
          x: cn.x * currentCoreRadius,
          y: cn.y * currentCoreRadius,
          z: cn.z * currentCoreRadius
        };
        
        p = rotate3dX(p, coreAngleX);
        p = rotate3dY(p, coreAngleY);
        p = rotate3dZ(p, coreAngleZ);
        
        // Mouse tilt physics
        p = rotate3dY(p, mouseX * 0.55);
        p = rotate3dX(p, mouseY * 0.55);
        
        const spaceX = p.x + coreCenter.x + coreXOffset;
        const spaceY = p.y + coreCenter.y + coreYOffset;
        const spaceZ = p.z + coreCenter.z - scrollY * 0.15;
        
        const scale = fov / (fov + spaceZ);
        const projX = spaceX * scale + width / 2;
        const projY = spaceY * scale + height / 2;
        
        rotatedCoreNodes.push({ x: projX, y: projY, z: spaceZ, scale });
      }
      
      // Draw wireframe connecting links
      coreConnections.forEach(([idx1, idx2]) => {
        const n1 = rotatedCoreNodes[idx1];
        const n2 = rotatedCoreNodes[idx2];
        
        if (n1.x >= -100 && n1.x <= width + 100 && n1.y >= -100 && n1.y <= height + 100) {
          const zDepth = (n1.z + n2.z) / 2;
          let opacity = 0.45;
          if (zDepth > 200) opacity = (maxZ - zDepth) / (maxZ - 200);
          opacity = Math.max(0.01, Math.min(0.45, opacity)) * scaleFactor;
          
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          
          const lineGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          lineGrad.addColorStop(0, `hsla(${hueShift}, 90%, 55%, ${opacity * 0.9})`);
          lineGrad.addColorStop(1, `rgba(255, 77, 0, ${opacity * 0.25})`);
          
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 0.8 * n1.scale;
          ctx.stroke();
        }
      });
      
      // Draw core vertices (energy nodes)
      for (let i = 0; i < rotatedCoreNodes.length; i++) {
        const n = rotatedCoreNodes[i];
        if (n.x >= 0 && n.x <= width && n.y >= 0 && n.y <= height) {
          let opacity = 0.65;
          if (n.z > 200) opacity = (maxZ - n.z) / (maxZ - 200);
          opacity = Math.max(0, Math.min(0.65, opacity)) * scaleFactor;
          
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.0 * n.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6.0 * n.scale, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hueShift}, 100%, 55%, ${opacity * 0.25})`;
          ctx.fill();
        }
      }
      
      // --- 4. RENDER FOREGROUND CONSTELLATION ---
      const projectedParticles = [];
      const particleZRange = 800;
      const minPZ = -200;
      const maxPZ = 600;
      
      const activeParticles = Math.floor(particles.length * scaleFactor);
      for (let i = 0; i < activeParticles; i++) {
        const p = particles[i];
        if (!p) continue;
        
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        
        const boundX = 600;
        const boundY = 600;
        if (Math.abs(p.x) > boundX) p.vx *= -1;
        if (Math.abs(p.y) > boundY) p.vy *= -1;
        
        let rotated = rotate3dX(p, mouseX * 0.06);
        rotated = rotate3dY(rotated, mouseY * 0.06);
        
        let pz = rotated.z - zScrollShift * 0.5;
        pz = ((pz - minPZ) % particleZRange + particleZRange) % particleZRange + minPZ;
        
        const scale = fov / (fov + pz);
        const projX = rotated.x * scale + width / 2;
        const projY = (rotated.y - scrollY * 0.08) * scale + height / 2;
        
        // Mouse gravity suction
        if (mouseActive) {
          const mouseScreenX = (mouseX + 0.5) * width;
          const mouseScreenY = (mouseY + 0.5) * height;
          
          const dx = mouseScreenX - projX;
          const dy = mouseScreenY - projY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 230) {
            const pull = (230 - dist) * 0.0003;
            p.vx += dx * pull;
            p.vy += dy * pull;
          }
        }
        
        // Smooth friction deceleration
        p.vx += (p.vx > 0 ? -0.015 : 0.015) * 0.12;
        p.vy += (p.vy > 0 ? -0.015 : 0.015) * 0.12;
        
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.8;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
        
        let opacity = 1.0;
        if (pz < -100) opacity = (pz - minPZ) / 100;
        else if (pz > 400) opacity = (maxPZ - pz) / 200;
        opacity = Math.max(0, Math.min(0.68, opacity));
        
        projectedParticles.push({
          x: projX,
          y: projY,
          depth: pz,
          scale: scale,
          radius: p.radius * scale,
          opacity: opacity
        });
      }
      
      // Draw lines between nodes
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          
          if (p1.opacity < 0.08 || p2.opacity < 0.08) continue;
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 135;
          if (dist < maxDist) {
            const avgOpacity = (p1.opacity + p2.opacity) / 2;
            const distFactor = 1 - dist / maxDist;
            const alpha = distFactor * 0.22 * avgOpacity;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            lineGrad.addColorStop(0, `rgba(255, 77, 0, ${alpha})`);
            lineGrad.addColorStop(1, `hsla(${(hueShift + 120) % 360}, 95%, 55%, ${alpha * 0.7})`);
            
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.9 * p1.scale;
            ctx.stroke();
          }
        }
      }
      
      // Draw flares
      for (let i = 0; i < projectedParticles.length; i++) {
        const p = projectedParticles[i];
        if (p.opacity < 0.05) continue;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
        glow.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
        glow.addColorStop(0.35, `rgba(255, 77, 0, ${p.opacity * 0.95})`);
        glow.addColorStop(1, 'rgba(255, 77, 0, 0)');
        
        ctx.fillStyle = glow;
        ctx.fill();
      }
      
      requestAnimationFrame(render);
    };
    
    requestAnimationFrame(render);
  };
  init3DCanvas();

  // --- 3D TILT EFFECT FOR CARDS (Desktop Only) ---
  const init3dTilt = () => {
    if (isTouchDevice) return;
    
    const tiltElements = document.querySelectorAll(
      '.project-card, .approach-card, .upcoming-glimpse-card, .hero-bottom-contact, .founder-direct-mail, .contact-form-card'
    );
    
    tiltElements.forEach(el => {
      el.style.transformStyle = 'preserve-3d';
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        
        const x = (e.clientX - rect.left) / w - 0.5;
        const y = (e.clientY - rect.top) / h - 0.5;
        
        const rX = -y * 10; 
        const rY = x * 10;
        
        el.style.setProperty('--tilt-rx', `${rX}deg`);
        el.style.setProperty('--tilt-ry', `${rY}deg`);
        el.style.setProperty('--tilt-tz', `15px`);
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--tilt-rx', `0deg`);
        el.style.setProperty('--tilt-ry', `0deg`);
        el.style.setProperty('--tilt-tz', `0px`);
      });
    });
  };
  init3dTilt();

  // --- AUTOMATIC STAGGERED TEXT REVEALS ON SCROLL ---
  const initTextAnimations = () => {
    const textSelectors = '.section h1, .section h2, .section h3, .section h4, .section p, .section blockquote, .section li, .section .pill-btn, .section .stat-counter-card, .section .glimpse-glass-panel, .section .accordion-item';
    const textElements = document.querySelectorAll(textSelectors);
    
    textElements.forEach(el => {
      // Don't apply to preloader or elements that should not have dynamic text reveals
      if (el.closest('#preloader') || el.closest('.header-pill') || el.closest('.menu-overlay') || el.closest('.glimpse-glass-panel > *') || el.closest('.accordion-content-inner > *')) return;
      
      el.classList.add('reveal-text-fade-up');
      
      // Determine stagger index within the parent element
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(el);
        if (index >= 0) {
          el.style.transitionDelay = `${index * 0.08}s`;
        }
      }
    });
    
    const textObserverOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05
    };
    
    const textObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, textObserverOptions);
        document.querySelectorAll('.reveal-text-fade-up').forEach(el => {
      textObserver.observe(el);
    });
  };
  initTextAnimations();

  // --- HERO SCROLL ANIMATION ENGINE ---
  const initHeroScrollAnimations = () => {
    const heroTitle     = document.getElementById('hero-title');
    const heroWords     = heroTitle ? heroTitle.querySelectorAll('.hero-word') : [];
    const heroCursive   = document.getElementById('hero-cursive');
    const heroDesc      = document.getElementById('hero-desc');
    const heroContact   = document.getElementById('hero-contact');
    const heroScrollInd = document.getElementById('hero-scroll-indicator');
    const heroSection   = document.getElementById('hero');

    if (!heroTitle || !heroSection) return;

    // 1. Fire entrance animations after preloader clears (2.8s + small buffer)
    setTimeout(() => {
      if (heroTitle)   heroTitle.classList.add('hero-title-enter');
      if (heroCursive) heroCursive.classList.add('hero-cursive-enter');
      const heroBottom = document.getElementById('hero-bottom');
      if (heroBottom)  heroBottom.classList.add('hero-bottom-enter');
      if (heroScrollInd) heroScrollInd.classList.add('hero-scroll-indicator-enter');
    }, 3000);

    // 2. Scroll-driven parallax - runs on every scroll tick via rAF
    let rafId = null;
    let lastScrollY = -1;

    const updateHeroOnScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) { rafId = null; return; }
      lastScrollY = scrollY;

      const heroH = heroSection.offsetHeight;
      // progress: 0 at top, 1 when hero is fully scrolled past
      const progress = Math.min(1, scrollY / heroH);

      // Title words: split apart (LOPE left, TECH right) + scale + blur
      heroWords.forEach((word, i) => {
        const dir       = i === 0 ? -1 : 1;
        const speed     = parseFloat(word.dataset.scrollSpeed || '-0.4');
        const translateX = dir * scrollY * 0.22;
        const translateY = scrollY * Math.abs(speed);
        const scale      = Math.max(0.82, 1 - progress * 0.18);
        const blur       = progress * 4;
        const opacity    = Math.max(0, 1 - progress * 1.4);
        word.style.transform = `translate3d(${translateX}px, ${-translateY}px, 0) scale(${scale})`;
        word.style.opacity   = opacity;
        word.style.filter    = `blur(${blur.toFixed(1)}px)`;
      });

      // Cursive subtitle: floats upward faster, fades
      if (heroCursive) {
        const speed = parseFloat(heroCursive.dataset.scrollSpeed || '-0.2');
        const ty = scrollY * Math.abs(speed) * 1.3;
        const op = Math.max(0, 1 - progress * 2);
        heroCursive.style.transform = `translateX(-50%) rotate(-3.5deg) translateY(${-ty}px)`;
        heroCursive.style.opacity   = op;
      }

      // Description: drifts down + fades
      if (heroDesc) {
        const ty = scrollY * 0.12;
        const op = Math.max(0, 1 - progress * 2.2);
        heroDesc.style.transform = `translateY(${ty}px)`;
        heroDesc.style.opacity   = op;
      }

      // Contact card: drifts up + fades
      if (heroContact) {
        const ty = scrollY * 0.2;
        const op = Math.max(0, 1 - progress * 2.5);
        heroContact.style.transform = `translateY(${-ty}px)`;
        heroContact.style.opacity   = op;
      }

      // Scroll indicator: fades immediately
      if (heroScrollInd) {
        heroScrollInd.style.opacity = Math.max(0, 1 - progress * 5);
      }

      rafId = null;
    };

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(updateHeroOnScroll);
    }, { passive: true });

    // Run once in case page loaded mid-scroll
    updateHeroOnScroll();
  };
  initHeroScrollAnimations();

  // --- SCROLL-DRIVEN 3D SECTION PERSPECTIVE PARALLAX ---
  const initSectionScrollParallax = () => {
    const sections = document.querySelectorAll('.section:not(.hero-section)');
    let rafId = null;

    const updateParallax = () => {
      const winH = window.innerHeight;
      sections.forEach(section => {
        if (!section.classList.contains('is-visible')) return;

        const rect = section.getBoundingClientRect();
        if (rect.top < winH && rect.bottom > 0) {
          const sectionHeight = rect.height;
          const sectionCenter = rect.top + sectionHeight / 2;
          const screenCenter = winH / 2;
          
          // Compute normalized scroll progress (-1 to 1) relative to screen center
          const progress = (sectionCenter - screenCenter) / (winH / 2 + sectionHeight / 2);
          const clampedProgress = Math.max(-1, Math.min(1, progress));
          
          // Rotate X: tilts backwards entering, flat centered, tilts forwards exiting
          const rotX = clampedProgress * 7; 
          const transZ = -Math.abs(clampedProgress) * 35;
          const scale = 1 - Math.abs(clampedProgress) * 0.015;
          
          // Smooth transition buffer
          section.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          section.style.transform = `perspective(2000px) rotateX(${rotX.toFixed(2)}deg) translateZ(${transZ.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        }
      });
      rafId = null;
    };

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    }, { passive: true });

    // Execute immediately to calculate in current scroll position
    updateParallax();
  };
  initSectionScrollParallax();

});
