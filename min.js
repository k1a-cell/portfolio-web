document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animated counters
function animateCounter(id, end, duration) {
    const el = document.getElementById(id);
    let start = 0;
    const step = Math.ceil(end / (duration / 20));
    const timer = setInterval(() => {
        start += step;
        if (start >= end) {
            el.textContent = end;
            clearInterval(timer);
        } else {
            el.textContent = start;
        }
    }, 20);
}

window.addEventListener('DOMContentLoaded', () => {
    animateCounter('websitesCount', 32, 1200);
    animateCounter('yearsCount', 4, 1200);
    animateCounter('clientsCount', 18, 1200);

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-list .project');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const type = this.getAttribute('data-filter');
            projects.forEach(proj => {
                if (type === 'all' || proj.getAttribute('data-type') === type) {
                    proj.style.display = '';
                } else {
                    proj.style.display = 'none';
                }
            });
        });
    });

    // Contact form interactivity
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('formMsg').textContent = 'Thank you for your message! (Demo only)';
            form.reset();
        });
    }

    // Testimonial slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let testimonialTimer;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        currentSlide = idx;
    }
    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTestimonialTimer();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTestimonialTimer();
        });
    }
    function resetTestimonialTimer() {
        clearInterval(testimonialTimer);
        testimonialTimer = setInterval(nextSlide, 6000);
    }
    if (slides.length > 1) {
        testimonialTimer = setInterval(nextSlide, 6000);
    }
    showSlide(0);

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }

    // Typing effect
    const typedText = document.getElementById('typedText');
    if (typedText) {
        const fullText = "Hello! I'm Kyle Ezeji, a passionate web developer with a love for creating beautiful and functional websites. I enjoy working with modern web technologies and am always eager to learn and take on new challenges.";
        let i = 0;
        typedText.textContent = '';
        function type() {
            if (i < fullText.length) {
                typedText.textContent += fullText.charAt(i);
                i++;
                setTimeout(type, 22);
            }
        }
        type();
    }

    // Scroll to top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn && (scrollBtn.style.display = 'block');
        } else {
            scrollBtn && (scrollBtn.style.display = 'none');
        }
    });
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Reveal on scroll
    function reveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', reveal);
    reveal();

    // Project modal popup
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    document.querySelectorAll('.project-list .project').forEach(proj => {
        proj.classList.add('reveal');
        proj.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const desc = this.querySelector('p').textContent;
            modalBody.innerHTML = `<h3>${title}</h3><p>${desc}</p><p><em>More details coming soon!</em></p>`;
            modal.style.display = 'flex';
        });
    });
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});
