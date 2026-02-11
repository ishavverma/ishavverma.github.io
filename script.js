/* ═══════════════════════════════════════════════════════════════
   THE PRINCIPAL ARCHITECT — Interactions
   Midnight Executive Theme
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {


    // ══════════════════════════════════════════════════════════════
    // CONSTELLATION PARTICLE BACKGROUND
    // ══════════════════════════════════════════════════════════════
    const particleCanvas = document.getElementById('particles-canvas');
    if (particleCanvas) {
        const pCtx = particleCanvas.getContext('2d');
        let particles = [];
        let animFrameId;
        const PARTICLE_COUNT = 60;
        const CONNECTION_DIST = 150;
        const PARTICLE_OPACITY = 0.08; // very subtle
        const LINE_OPACITY = 0.05;

        function resizeParticleCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * particleCanvas.width,
                    y: Math.random() * particleCanvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    r: Math.random() * 1.5 + 0.5
                });
            }
        }

        function drawParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const opacity = LINE_OPACITY * (1 - dist / CONNECTION_DIST);
                        pCtx.beginPath();
                        pCtx.strokeStyle = `rgba(74, 158, 255, ${opacity})`;
                        pCtx.lineWidth = 0.5;
                        pCtx.moveTo(particles[i].x, particles[i].y);
                        pCtx.lineTo(particles[j].x, particles[j].y);
                        pCtx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                pCtx.fillStyle = `rgba(74, 158, 255, ${PARTICLE_OPACITY})`;
                pCtx.fill();

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = particleCanvas.width;
                if (p.x > particleCanvas.width) p.x = 0;
                if (p.y < 0) p.y = particleCanvas.height;
                if (p.y > particleCanvas.height) p.y = 0;
            }

            animFrameId = requestAnimationFrame(drawParticles);
        }

        resizeParticleCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeParticleCanvas();
            createParticles();
        });
    }


    // ══════════════════════════════════════════════════════════════
    // HEADER SCROLL
    // ══════════════════════════════════════════════════════════════
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });


    // ══════════════════════════════════════════════════════════════
    // MOBILE NAV
    // ══════════════════════════════════════════════════════════════
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });


    // ══════════════════════════════════════════════════════════════
    // SMOOTH SCROLL
    // ══════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });


    // ══════════════════════════════════════════════════════════════
    // SCROLL REVEAL (gentle fade, no bounce)
    // ══════════════════════════════════════════════════════════════
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ══════════════════════════════════════════════════════════════
    // DIGITAL SIGNATURE ANIMATION
    // ══════════════════════════════════════════════════════════════
    const canvas = document.getElementById('signature-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const signatureText = 'Ishav Verma';
        let drawn = false;

        function drawSignature() {
            if (drawn) return;
            drawn = true;

            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.font = 'italic 40px "Playfair Display", Georgia, serif';
            ctx.fillStyle = '#E8E6E3';
            ctx.globalAlpha = 0;

            const textWidth = ctx.measureText(signatureText).width;
            const startX = 0; // left-aligned for dark theme
            const startY = 65;

            let charIndex = 0;
            const chars = signatureText.split('');

            function drawNextChar() {
                if (charIndex >= chars.length) {
                    setTimeout(drawUnderline, 250);
                    return;
                }

                const preceding = signatureText.substring(0, charIndex);
                const x = startX + ctx.measureText(preceding).width;

                ctx.globalAlpha = 1;
                ctx.fillText(chars[charIndex], x, startY);

                charIndex++;
                setTimeout(drawNextChar, 70 + Math.random() * 50);
            }

            function drawUnderline() {
                const lineY = startY + 14;
                const lineStartX = startX;
                const lineEndX = startX + textWidth;
                let currentX = lineStartX;

                ctx.strokeStyle = 'rgba(74, 158, 255, 0.4)';
                ctx.lineWidth = 1;
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.moveTo(lineStartX, lineY);

                function animateLine() {
                    if (currentX >= lineEndX) return;
                    currentX += 3;
                    ctx.lineTo(currentX, lineY + (Math.random() - 0.5) * 1);
                    ctx.stroke();
                    requestAnimationFrame(animateLine);
                }
                animateLine();
            }

            drawNextChar();
        }

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(drawSignature, 600);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        heroObserver.observe(document.getElementById('hero'));
    }

});
