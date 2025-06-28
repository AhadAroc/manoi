document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    
    // Mobile Menu Toggle - FIXED VERSION
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            
            // Toggle the active class on the main navigation
            if (mainNav) {
                mainNav.classList.toggle('active');
                body.classList.toggle('menu-open');
                
                // Create overlay if it doesn't exist
                if (body.classList.contains('menu-open') && !document.querySelector('.overlay')) {
                    createOverlay();
                } else {
                    // Remove overlay if menu is closed
                    const overlay = document.querySelector('.overlay');
                    if (overlay) {
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            overlay.remove();
                        }, 300);
                    }
                }
            }
        });
    }
    
    // Create mobile navigation
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        
        // Style the overlay
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '998'; // Below the menu
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        body.appendChild(overlay);
        
        // Add click event to close menu when overlay is clicked
        overlay.addEventListener('click', closeMenu);
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    }
    
    
    // Close mobile menu
  function closeMenu() {
        const mainNav = document.querySelector('.main-nav');
        const overlay = document.querySelector('.overlay');
        
        if (mainNav) {
            mainNav.classList.remove('active');
        }
        
        if (overlay) {
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
        
        body.classList.remove('menu-open');
    }
     // Close mobile menu when clicking outside
   document.addEventListener('click', function(e) {
        const mainNav = document.querySelector('.main-nav');
        
        if (mainNav && mainNav.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            closeMenu();
        }
    });

   
    // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignore if href is just "#"
        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            closeMenu();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href')) {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            
            if (currentLocation === linkPath || 
                (currentLocation === '/' && linkPath.includes('index'))) {
                link.classList.add('active');
                
                // If it's in a dropdown, also add active to parent
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const categoryTitle = parentDropdown.querySelector('.category-title');
                    if (categoryTitle) {
                        categoryTitle.classList.add('active');
                    }
                }
            }
        }
    });
    
    // Add resize event listener to reset mobile menu state on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // Reset mobile menu state when resizing to desktop
            const mainNav = document.querySelector('.main-nav');
            const overlay = document.querySelector('.overlay');
            
            if (mainNav) {
                mainNav.classList.remove('active');
            }
            
            if (overlay) {
                overlay.remove();
            }
            
            body.classList.remove('menu-open');
            
            // Reset dropdown active states
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    // Handle dropdown menus on mobile
   const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const categoryTitle = dropdown.querySelector('.category-title');
        
        if (categoryTitle) {
            categoryTitle.addEventListener('click', function(e) {
                // Only handle dropdown toggle on mobile
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    
    
    // Search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchInput = searchBox.querySelector('input');
        const searchButton = searchBox.querySelector('button');
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value);
            }
        });
    }
    
    function performSearch(query) {
        if (query.trim() === '') {
            showNotification('الرجاء إدخال كلمة للبحث', 'warning');
            return;
        }
        
        // Here you would typically send an AJAX request to your backend
        // For demo purposes, we'll just show a notification
        showNotification(`جاري البحث عن: ${query}`, 'info');
        
        // Simulate search results
        setTimeout(() => {
            // Replace this with actual search functionality
            console.log(`Search query: ${query}`);
            
            // Example: Redirect to search results page
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            
            // For demo, just show a notification
            showNotification('تم العثور على نتائج البحث', 'success');
        }, 1000);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification container if it doesn't exist
        let notificationContainer = document.querySelector('.notification-container');
        
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
            
            // Add styles
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.top = '20px';
            notificationContainer.style.left = '50%';
            notificationContainer.style.transform = 'translateX(-50%)';
            notificationContainer.style.zIndex = '9999';
            notificationContainer.style.width = '100%';
            notificationContainer.style.maxWidth = '400px';
            notificationContainer.style.display = 'flex';
            notificationContainer.style.flexDirection = 'column';
            notificationContainer.style.alignItems = 'center';
            notificationContainer.style.gap = '10px';
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '4px';
        notification.style.marginBottom = '10px';
        notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
        notification.style.width = '100%';
        notification.style.textAlign = 'center';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Set color based on type
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#4CAF50';
                notification.style.color = 'white';
                break;
            case 'warning':
                notification.style.backgroundColor = '#FF9800';
                notification.style.color = 'white';
                break;
            case 'error':
                notification.style.backgroundColor = '#F44336';
                notification.style.color = 'white';
                break;
            default:
                notification.style.backgroundColor = '#2196F3';
                notification.style.color = 'white';
        }
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
    
    
    // Add active class to current page in navigation
    
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        if (currentLocation === linkPath || 
            (currentLocation === '/' && linkPath.includes('index'))) {
            link.classList.add('active');
        }
    });
    
    // Grade card hover effects
    const gradeCards = document.querySelectorAll('.grade-card');
    
    gradeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Back to top button
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        
        // Style the button
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.left = '20px';
        button.style.zIndex = '99';
        button.style.width = '40px';
        button.style.height = '40px';
        button.style.borderRadius = '50%';
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        button.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(button);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    initTeachersSlider();
    createBackToTopButton();
    
    // Initialize any sliders or carousels if needed
    // This is a placeholder for potential future functionality
    function initSliders() {
        // If you add a slider library like Swiper.js, initialize it here
        console.log('Sliders initialized');
    }
    function initTeachersSlider() {
    const sliderDots = document.querySelectorAll('.slider-dot');
    const teacherRows = document.querySelectorAll('.teachers-row');
    
    if (!sliderDots.length || !teacherRows.length) return;
    
    sliderDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots and slides
            sliderDots.forEach(d => d.classList.remove('active'));
            teacherRows.forEach(row => row.classList.remove('active-slide'));
            
            // Add active class to clicked dot and corresponding slide
            this.classList.add('active');
            const slideIndex = this.getAttribute('data-slide');
            teacherRows[slideIndex].classList.add('active-slide');
        });
    });
    
    // Auto-rotate slides every 5 seconds
    let currentSlide = 0;
    const totalSlides = sliderDots.length;
    
    function rotateSlides() {
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Remove active class from all dots and slides
        sliderDots.forEach(d => d.classList.remove('active'));
        teacherRows.forEach(row => row.classList.remove('active-slide'));
        
        // Add active class to current dot and slide
        sliderDots[currentSlide].classList.add('active');
        teacherRows[currentSlide].classList.add('active-slide');
    }
    
    // Start auto-rotation
    let slideInterval = setInterval(rotateSlides, 5000);
    
    // Pause rotation when hovering over the slider
    const sliderContainer = document.querySelector('.teachers-compact-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            clearInterval(slideInterval);
            slideInterval = setInterval(rotateSlides, 5000);
        });
    }
}
    // Add accessibility features
    function enhanceAccessibility() {
        // Add appropriate ARIA attributes to interactive elements
        const buttons = document.querySelectorAll('button, .btn, .resource-btn');
        buttons.forEach(button => {
            if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
                const nearestText = button.querySelector('i')?.className || 'button';
                button.setAttribute('aria-label', nearestText);
            }
        });
        
        // Ensure all images have alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.alt = img.src.split('/').pop().split('.')[0] || 'Image';
        });
    }
    
    enhanceAccessibility();
});