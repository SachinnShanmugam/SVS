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
            { src: 'structure1.jpg', title: 'Structure1' },
            { src: 'structure2.jpg', title: 'Structure2' },
            { src: 'structure3.jpg', title: 'Structure3' },
            { src: 'structure4.jpg', title: 'Structure4' },
            { src: 'structure5.jpg', title: 'Structure5' },
            { src: 'structure6.jpg', title: 'Structure6' },
            { src: 'structure7.jpg', title: 'Structure7' }
        ],
        'temple-works': [
            { src: '10.jpeg', title: '10' },
            { src: '11.jpeg', title: '11' },
            { src: '12.jpeg', title: '12' },
            { src: '7.jpeg', title: '7' },
            { src: '8.jpeg', title: '8' },
            { src: '9.jpeg', title: '9' },
            { src: 'work1.jpg', title: 'Work1' },
            { src: 'work2.jpg', title: 'Work2' },
            { src: 'work3.jpg', title: 'Work3' },
            { src: 'work4.jpg', title: 'Work4' }
        ],
        'ornaments': [
            { src: 'ornament1.jpg', title: 'Ornament1' },
            { src: 'ornament10.jpg', title: 'Ornament10' },
            { src: 'ornament11.jpg', title: 'Ornament11' },
            { src: 'ornament12.jpg', title: 'Ornament12' },
            { src: 'ornament13.jpg', title: 'Ornament13' },
            { src: 'ornament14.jpg', title: 'Ornament14' },
            { src: 'ornament15.jpg', title: 'Ornament15' },
            { src: 'ornament16.jpg', title: 'Ornament16' },
            { src: 'ornament17.jpg', title: 'Ornament17' },
            { src: 'ornament18.jpg', title: 'Ornament18' },
            { src: 'ornament19.jpg', title: 'Ornament19' },
            { src: 'ornament2.jpg', title: 'Ornament2' },
            { src: 'ornament20.jpg', title: 'Ornament20' },
            { src: 'ornament21.jpg', title: 'Ornament21' },
            { src: 'ornament22.jpg', title: 'Ornament22' },
            { src: 'ornament23.jpg', title: 'Ornament23' },
            { src: 'ornament24.jpg', title: 'Ornament24' },
            { src: 'ornament25.jpg', title: 'Ornament25' },
            { src: 'ornament26.jpg', title: 'Ornament26' },
            { src: 'ornament27.jpg', title: 'Ornament27' },
            { src: 'ornament28.jpg', title: 'Ornament28' },
            { src: 'ornament3.jpg', title: 'Ornament3' },
            { src: 'ornament4.jpg', title: 'Ornament4' },
            { src: 'ornament5.jpg', title: 'Ornament5' },
            { src: 'ornament6.jpg', title: 'Ornament6' },
            { src: 'ornament7.jpg', title: 'Ornament7' },
            { src: 'ornament8.jpg', title: 'Ornament8' },
            { src: 'ornament9.jpg', title: 'Ornament9' }
        ],
        'idols': [
            { src: '1.jpeg', title: '1' },
            { src: '13.jpeg', title: '13' },
            { src: '14.jpeg', title: '14' },
            { src: '2.jpeg', title: '2' },
            { src: '3.jpeg', title: '3' },
            { src: '4.jpeg', title: '4' },
            { src: '5.jpeg', title: '5' },
            { src: '6.jpeg', title: '6' },
            { src: 'idol1.jpg', title: 'Idol1' },
            { src: 'idol10.jpg', title: 'Idol10' },
            { src: 'idol11.jpg', title: 'Idol11' },
            { src: 'idol12.jpg', title: 'Idol12' },
            { src: 'idol13.jpg', title: 'Idol13' },
            { src: 'idol14.jpg', title: 'Idol14' },
            { src: 'idol15.jpg', title: 'Idol15' },
            { src: 'idol16.jpg', title: 'Idol16' },
            { src: 'idol17.jpg', title: 'Idol17' },
            { src: 'idol2.jpg', title: 'Idol2' },
            { src: 'idol3.jpg', title: 'Idol3' },
            { src: 'idol4.jpg', title: 'Idol4' },
            { src: 'idol5.jpg', title: 'Idol5' },
            { src: 'idol6.jpg', title: 'Idol6' },
            { src: 'idol7.jpg', title: 'Idol7' },
            { src: 'idol8.jpg', title: 'Idol8' },
            { src: 'idol9.jpg', title: 'Idol9' }
        ],
    };

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtnContainer = document.querySelector('.gallery-more');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentCategory = 'all';
    let visibleLimit = 9; // 3 rows * 3 items
    const ITEMS_PER_LOAD = 9;

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

        initializeGalleryEvents();
        updateGalleryVisibility(); // Initial filter apply
    }

    let currentVisibleItems = [];
    let currentIndex = 0;

    function initializeGalleryEvents() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        // Attach Click to Open Lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Must recalculate index based on currently visible set because hidden items shouldn't be navigable
                // However, we want to allow opening ANY item, but navigation should strictly follow the visible list.
                // Simplified: Navigation uses 'currentVisibleItems' array.
                const index = currentVisibleItems.indexOf(item);
                if (index !== -1) {
                    openLightbox(index);
                }
            });
        });
    }

    // Core Visibility Logic
    function updateGalleryVisibility() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const matchedItems = [];

        // 1. Identify all matching items for current category
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (currentCategory === 'all' || itemCategory === currentCategory) {
                matchedItems.push(item);
            } else {
                item.style.display = 'none';
            }
        });

        // 2. Show only up to the limit (Visual Grid only)
        matchedItems.forEach((item, index) => {
            if (index < visibleLimit) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // 3. Update Global visible list for Lightbox
        // KEY CHANGE: Lightbox gets ALL matched items, allowing navigation through hidden ones
        currentVisibleItems = matchedItems;

        // 4. Handle "View More" Button
        if (matchedItems.length > visibleLimit) {
            loadMoreBtnContainer.style.display = 'block';
        } else {
            loadMoreBtnContainer.style.display = 'none';
        }
    }

    // 2. Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.getAttribute('data-filter');
            visibleLimit = ITEMS_PER_LOAD; // Reset limit on filter change

            updateGalleryVisibility();
        });
    });

    // 3. Load More Logic
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleLimit = 1000; // Show all (expand fully)
            updateGalleryVisibility();
        });
    }

    // 4. Lightbox Logic
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

