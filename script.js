document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Mobile Hamburger Menu
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // 2. Navbar Background Change on Scroll
            const nav = document.querySelector('nav');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 80) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            // 3. Menu Tabs Switching
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));

                    btn.classList.add('active');
                    const targetId = btn.getAttribute('data-target');
                    document.getElementById(targetId).classList.add('active');
                });
            });

            // 4. Gallery Lightbox with Navigation
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const closeBtn = document.querySelector('.lightbox-close');
            const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
            
            const prevBtn = document.querySelector('.lightbox-prev');
            const nextBtn = document.querySelector('.lightbox-next');
            let currentImageIndex = 0;

            const openLightbox = (index) => {
                currentImageIndex = index;
                lightboxImg.src = galleryImages[currentImageIndex].src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const closeLightbox = () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            };
            
            const showNextImage = (e) => {
                if (e) e.stopPropagation();
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                lightboxImg.src = galleryImages[currentImageIndex].src;
            };

            const showPrevImage = (e) => {
                if (e) e.stopPropagation();
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                lightboxImg.src = galleryImages[currentImageIndex].src;
            };

            galleryImages.forEach((img, index) => {
                img.addEventListener('click', () => {
                    openLightbox(index);
                });
            });

            closeBtn.addEventListener('click', closeLightbox);
            nextBtn.addEventListener('click', showNextImage);
            prevBtn.addEventListener('click', showPrevImage);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            // 5. Event Modal Logic
            const eventModal = document.getElementById('event-modal');
            const eventModalClose = document.querySelector('.event-modal-close');
            const eventCards = document.querySelectorAll('.event-card');
            
            // Assign open function to global window so HTML onclick can reach it
            window.openEventModal = function(title, date, desc, img) {
                document.getElementById('event-modal-title').textContent = title;
                document.getElementById('event-modal-date').textContent = date;
                document.getElementById('event-modal-desc').textContent = desc;
                document.getElementById('event-modal-img').src = img;
                
                eventModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            
            window.closeEventModal = function() {
                eventModal.classList.remove('active');
                document.body.style.overflow = '';
            };
            
            eventCards.forEach(card => {
                card.addEventListener('click', () => {
                    const title = card.getAttribute('data-title');
                    const date = card.getAttribute('data-date');
                    const desc = card.getAttribute('data-desc');
                    const img = card.getAttribute('data-img');
                    openEventModal(title, date, desc, img);
                });
            });
            
            eventModalClose.addEventListener('click', closeEventModal);
            eventModal.addEventListener('click', (e) => {
                if (e.target === eventModal) closeEventModal();
            });

            // Keyboard navigation for Lightbox and Modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (lightbox.classList.contains('active')) closeLightbox();
                    if (eventModal.classList.contains('active')) closeEventModal();
                }
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'ArrowRight') showNextImage();
                    if (e.key === 'ArrowLeft') showPrevImage();
                }
            });

            // 6. Booking Form Submission
            const bookingForm = document.getElementById('booking-form');
            const formMessage = document.getElementById('form-message');

            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                formMessage.style.display = 'block';
                bookingForm.reset();
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });

            // 7. Scroll Fade-In Animation
            const fadeElements = document.querySelectorAll('.fade-in-section');
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            fadeElements.forEach(element => { observer.observe(element); });

            // 8. Hero Image Fallback handling
            const homeSection = document.getElementById('home');
            const tryLoadImage = (src, successCallback, errorCallback) => {
                const img = new Image();
                img.onload = () => successCallback(src);
                img.onerror = errorCallback;
                img.src = src;
            };

            tryLoadImage('hero.jpg', 
                (src) => homeSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${src}')`,
                () => {
                    tryLoadImage('hero.png',
                        (src) => homeSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${src}')`,
                        () => {} // Leave CSS fallback
                    );
                }
            );

        });