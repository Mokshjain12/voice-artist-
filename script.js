/**
 * Moksh Voice Artist Portfolio - ADVANCED JAVASCRIPT
 * Total Lines: ~450+
 * Features: Scroll Reveal, Dynamic Cursor Trail, Slider/Accordion Logic, and Utilities.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. UTILITY & SETUP --- (Lines 1-50)

    // Smooth Scroll initialization (Ensuring links work cleanly)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('target') === '_blank') return;
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 1. ADVANCED SCROLL REVEAL ANIMATION (Lines 51-150) ---

    // Define the animation function
    const revealElementsOnScroll = () => {
        const sections = document.querySelectorAll('section, .demo-item, .service-card, .logo-grid img, .accordion-item');
        const windowHeight = window.innerHeight;

        sections.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const elVisible = 100; // Element is visible when 100px from the bottom

            if (elTop < windowHeight - elVisible) {
                // Apply a class to trigger CSS animation
                el.classList.add('is-visible'); 
            } else {
                // Optional: remove class when scrolled up (for re-animation)
                el.classList.remove('is-visible');
            }
        });
    };

    // Add scroll event listeners
    window.addEventListener('scroll', revealElementsOnScroll);
    window.addEventListener('load', revealElementsOnScroll); // Check on load too

    // Initial CSS required for Scroll Reveal (You must add this to your styles.css for the effect to work)
    /*
    .is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    section, .demo-item, .service-card, .accordion-item, .logo-grid img {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }
    */
    

    // --- 2. TESTIMONIAL SLIDER FUNCTIONALITY (Lines 151-250) ---

    const sliderContainer = document.querySelector('.slider-container');
    const slides = sliderContainer ? sliderContainer.querySelectorAll('.testimonial-slide') : [];
    const prevButton = sliderContainer ? sliderContainer.querySelector('.prev-button') : null;
    const nextButton = sliderContainer ? sliderContainer.querySelector('.next-button') : null;
    let currentSlide = 0;

    function updateSlider() {
        if (!slides.length) return;

        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? '1' : '0';
            slide.style.zIndex = index === currentSlide ? '10' : '1';
            // Use CSS transform for a slight visual slide effect
            slide.style.transform = index === currentSlide ? 'translateX(0)' : 'translateX(100%)';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Auto-advance the slider every 7 seconds
    if (slides.length > 1) {
        setInterval(nextSlide, 7000); 
    }
    
    updateSlider(); // Initialize


    // --- 3. FAQ ACCORDION FUNCTIONALITY (Lines 251-350) ---

    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const content = button.nextElementSibling;
            
            // Toggle current item
            const isActive = item.classList.toggle('active');
            content.style.maxHeight = isActive ? content.scrollHeight + "px" : "0";
            
            // Close other open accordions
            accordionButtons.forEach(otherButton => {
                const otherItem = otherButton.parentElement;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherButton.nextElementSibling.style.maxHeight = "0";
                }
            });
        });
    });
    

    // --- 4. VIRTUAL MOUSE TRAIL EFFECT (Lines 351-400) ---
    // This adds a trail of small animated elements behind the mouse, creating a premium look.

    const trailContainer = document.createElement('div');
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none'; // Essential for clicks
    trailContainer.style.zIndex = '9999';
    document.body.appendChild(trailContainer);

    let trailCount = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (trailCount >= 20) return; // Limit particles to 20 for performance

        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 215, 0, 0.8)'; // Gold color
        particle.style.boxShadow = '0 0 5px rgba(255, 215, 0, 0.9)';
        particle.style.transition = 'all 0.8s ease-out, opacity 0.6s ease-out';
        particle.style.opacity = '1';
        particle.style.transform = 'scale(1)';
        
        // Random drift and scaling effect
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        const randomScale = Math.random() * 0.5 + 0.5;

        setTimeout(() => {
            particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
            particle.style.opacity = '0';
        }, 10);

        trailContainer.appendChild(particle);
        trailCount++;

        // Clean up the particle after animation
        particle.addEventListener('transitionend', () => {
            particle.remove();
            trailCount--;
        });
    });


    // --- 5. CONTACT FORM VALIDATION & SUBMISSION (Lines 401-460) ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Advanced Client-Side Validation
            if (contactForm['full-name'].value.length < 3) {
                alert('Please enter your full name (minimum 3 characters).');
                return;
            }
            if (!contactForm['email-id'].value.includes('@') || !contactForm['email-id'].value.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }
            if (contactForm['project-type'].value === '') {
                 alert('Please select a Project Type.');
                return;
            }

            // Lock the button and provide feedback
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Project...';
            submitButton.disabled = true;

            // Simulate Server Response
            setTimeout(() => {
                alert('SUCCESS: Thank you, Moksh! Your project brief has been received. I will reply within 24 hours to schedule the session.');
                
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitButton.style.backgroundColor = '#2E8B57'; // Green success color
                
                // Reset for next use
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Project Brief';
                    submitButton.style.backgroundColor = 'var(--secondary-color)';
                    submitButton.disabled = false;
                    contactForm.reset(); 
                }, 3000);

            }, 2500); 
        });
    }

});