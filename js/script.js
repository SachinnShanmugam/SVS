document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');

            // Hamburger animation
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('open'));
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-text, .service-card').forEach(el => {
        observer.observe(el);
    });    // Gallery Configuration (Manage your images here)
    const galleryData = {
        'structures': [
            { src: 'structure1.png', title: 'Structure1' }
        ],
        'temple-works': [
            { src: 'work1.png', title: 'Work1' }
        ],
        'ornaments': [
            { src: 'ornament1.png', title: 'Ornament1' }
        ],
        'idols': [
            { src: 'idol1.png', title: 'Idol1' },
            { src: 'idol2.png', title: 'Idol2' }
        ],
    };

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    // 1. Render Gallery
    function renderGallery() {
        galleryGrid.innerHTML = ''; // Clear existing

        for (const [category, items] of Object.entries(galleryData)) {
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.setAttribute('data-category', category);

                div.innerHTML = `
                    <img src="assets/products/${category}/${item.src}" alt="${item.title}">
                    <div class="overlay"><h4>${item.title}</h4></div>
                `;

                galleryGrid.appendChild(div);
            });
        }

        // Re-initialize events for new items
        initializeGalleryEvents();
    }

    let currentVisibleItems = [];
    let currentIndex = 0;

    function initializeGalleryEvents() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        currentVisibleItems = Array.from(galleryItems); // Default all

        // Attach Click to Open Lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = currentVisibleItems.indexOf(item);
                if (index !== -1) {
                    openLightbox(index);
                }
            });
        });
    }

    // 2. Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.gallery-item');

            // Filter Display & Update Visible List
            currentVisibleItems = [];

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.animate([{ opacity: 0, transform: 'scale(0.9)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 300 });
                    currentVisibleItems.push(item);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. Lightbox Logic
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        if (currentVisibleItems.length === 0) return;

        const item = currentVisibleItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('.overlay h4') ? item.querySelector('.overlay h4').textContent : '';

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentVisibleItems.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
        updateLightboxImage();
    }

    // Controls
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Initialize
    renderGallery();
});

