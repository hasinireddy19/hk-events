document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));

    // Active Navigation Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Form Handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '✓ Sent Successfully!';
            btn.style.background = '#2e7d32';
            btn.style.borderColor = '#2e7d32';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.borderColor = '';
                form.reset();
            }, 3000);
        });
    });

    // Custom Royal Cursor
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorDot.style.opacity = '1';
            cursorTrail.style.opacity = '1';
        });

        heroSection.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
            requestAnimationFrame(animateTrail);
        }
        animateTrail();

        const hoverElements = heroSection.querySelectorAll('a, button');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorTrail.classList.add('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorTrail.classList.remove('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* ---- Global Modal System ---- */
    function initGlobalModal() {
        if (document.getElementById('globalModal')) return;
        
        const modalHTML = `
            <div class="global-modal" id="globalModal">
                <div class="modal-content">
                    <button class="modal-close" id="modalClose">✕</button>
                    <div class="modal-left">
                        <img src="" alt="Modal Image" id="modalImg">
                    </div>
                    <div class="modal-right">
                        <h3 id="modalTitle">Title</h3>
                        <p id="modalDesc">Description goes here...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('globalModal');
        const closeBtn = document.getElementById('modalClose');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Initialize modal on load
    initGlobalModal();

    window.openModal = function(imgSrc, title, desc) {
        const modal = document.getElementById('globalModal');
        document.getElementById('modalImg').src = imgSrc;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Attach modal to Service Cards and Gallery Items globally
    const openableCards = document.querySelectorAll('.service-card, .gallery-item');
    openableCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const titleEl = card.querySelector('h3');
            const pEl = card.querySelector('p');
            
            if (img && titleEl && pEl) {
                openModal(img.src, titleEl.textContent, pEl.textContent);
            }
        });
    });

    /* ---- Dynamic Roadmap Graph Logic ---- */
    const roadmapData = {
        '3': [
            { day: 'Day 1', title: 'Arrival & Welcome', desc: 'Guests arrive and are welcomed with traditional music and refreshments. An evening of light entertainment and dinner follows.', img: 'wedding-entrance.jpeg' },
            { day: 'Day 2', title: 'Haldi & Sangeet', desc: 'A vibrant morning Haldi ceremony followed by an energetic evening Sangeet with dance performances and music.', img: 'haldi-decor.jpeg' },
            { day: 'Day 3', title: 'The Grand Wedding', desc: 'The main wedding ceremony honoring your traditions, followed by a grand reception dinner.', img: 'wedding-floral-stage.jpeg' }
        ],
        '5': [
            { day: 'Day 1', title: 'Welcome Dinner', desc: 'An intimate welcome dinner for close family and friends to kickstart the celebrations.', img: 'wedding-entrance.jpeg' },
            { day: 'Day 2', title: 'Mehendi Ceremony', desc: 'An afternoon dedicated to intricate henna designs, folk songs, and vibrant colors.', img: 'ring-ceremony.jpeg' },
            { day: 'Day 3', title: 'Haldi & Pool Party', desc: 'A playful Haldi ceremony turning into a relaxed daytime pool party for guests.', img: 'haldi-decor.jpeg' },
            { day: 'Day 4', title: 'Grand Sangeet', desc: 'A glamorous evening filled with choreographed dances, music, and exquisite dining.', img: 'anniversary-stage.jpeg' },
            { day: 'Day 5', title: 'Wedding & Reception', desc: 'The sacred wedding rituals followed by a magnificent reception gala.', img: 'wedding-floral-stage.jpeg' }
        ],
        '7': [
            { day: 'Day 1', title: 'Arrival & Check-in', desc: 'Guests arrive at the destination, welcomed with a traditional Aarti and settling in.', img: 'wedding-entrance.jpeg' },
            { day: 'Day 2', title: 'Roka / Engagement', desc: 'Formalizing the union with an elegant ring ceremony and family blessings.', img: 'ring-ceremony.jpeg' },
            { day: 'Day 3', title: 'Mehendi Carnival', desc: 'A carnival-themed Mehendi afternoon with games, food stalls, and music.', img: 'birthday-butterfly.jpeg' },
            { day: 'Day 4', title: 'Haldi Rituals', desc: 'The traditional Haldi ceremony filled with joy, laughter, and yellow hues.', img: 'haldi-decor.jpeg' },
            { day: 'Day 5', title: 'Sangeet Night', desc: 'The biggest party night with family performances, a DJ, and a massive dance floor.', img: 'anniversary-stage.jpeg' },
            { day: 'Day 6', title: 'The Royal Wedding', desc: 'The main event - a royal wedding ceremony with traditional grandeur.', img: 'wedding-floral-stage.jpeg' },
            { day: 'Day 7', title: 'Farewell Brunch', desc: 'A relaxed morning brunch to thank guests before their departure.', img: 'corporate-event.jpeg' }
        ]
    };

    const durationBtns = document.querySelectorAll('.duration-btn');
    const roadmapGraph = document.getElementById('roadmapGraph');

    if (durationBtns.length > 0 && roadmapGraph) {
        function renderRoadmap(duration) {
            const plan = roadmapData[duration];
            roadmapGraph.innerHTML = '';
            
            plan.forEach((item, index) => {
                // Add connecting line BEFORE each node (except the first)
                if (index > 0) {
                    const line = document.createElement('div');
                    line.className = 'graph-line';
                    roadmapGraph.appendChild(line);
                }

                // Node wrapper (contains circle + label)
                const wrapper = document.createElement('div');
                wrapper.className = 'graph-node-wrapper';

                // Create the image node
                const node = document.createElement('div');
                node.className = 'graph-node';
                
                const img = document.createElement('img');
                img.src = item.img;
                img.alt = item.title;
                node.appendChild(img);
                
                node.onclick = () => {
                    openModal(item.img, `${item.day}: ${item.title}`, item.desc);
                };

                // Label below the node
                const label = document.createElement('span');
                label.className = 'graph-node-label';
                label.textContent = item.day;

                wrapper.appendChild(node);
                wrapper.appendChild(label);
                roadmapGraph.appendChild(wrapper);
            });
        }

        durationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                durationBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderRoadmap(btn.dataset.duration);
            });
        });

        // Initialize with default (3 Days)
        renderRoadmap('3');
    }
});
