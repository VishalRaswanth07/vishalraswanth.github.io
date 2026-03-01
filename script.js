/**
 * Interactivity for Vishal Raswanth Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled');
            // actually, let's just stick it since it looks better with the blur
            navbar.style.background = window.scrollY > 50 ? 'rgba(10, 14, 23, 0.95)' : 'rgba(10, 14, 23, 0.8)';
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // 3. Typing Effect in Hero Section
    const typeWriter = (element, words, wait = 3000) => {
        let isDeleting = false;
        let txt = '';
        let wordIndex = 0;
        let typeSpeed = 100;

        const type = () => {
            const current = wordIndex % words.length;
            const fullTxt = words[current];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
                typeSpeed = 50; // faster deletion
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
                typeSpeed = 100;
            }

            document.querySelector(element).innerHTML = txt;

            let finalSleep = typeSpeed;

            // Pause at the end of word
            if (!isDeleting && txt === fullTxt) {
                finalSleep = wait;
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                wordIndex++;
                finalSleep = 500;
            }

            setTimeout(type, finalSleep);
        };
        type();
    };

    const roles = [
        "Aspiring Data Scientist",
        "Machine Learning Enthusiast",
        "Data Storyteller",
        "Problem Solver"
    ];
    typeWriter('.typing-text', roles);

    // 4. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // If it's the skills section, trigger the progress bars
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
                            bar.style.width = targetWidth;
                        }, 300);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => {
        observer.observe(el);
    });

    // 5. Canvas Background Data Particle Effect
    const initCanvas = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                // Binary numbers
                this.char = Math.random() > 0.5 ? '1' : '0';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
                ctx.font = `${this.size * 5}px 'JetBrains Mono'`;
                ctx.fillText(this.char, this.x, this.y);
            }
        }

        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();
    };

    // Initialize canvas if it's not on mobile to save battery
    if (window.innerWidth > 768) {
        initCanvas();
    }
    
    // Terminal typing animation
    setTimeout(() => {
        const terminalOutput = document.querySelector('.typing-animation-slow');
        if (terminalOutput) {
            let i = 0;
            const text = "model.predict(user_future) # -> 'Success'";
            const typeTerm = () => {
                if (i < text.length) {
                    terminalOutput.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeTerm, Math.random() * 50 + 50);
                }
            };
            typeTerm();
        }
    }, 2000);
});
