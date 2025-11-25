// 1. Smooth Scrolling for Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Mobile: Close menu after clicking
            const navLinks = document.querySelector('.nav-links');
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
            }
        }
    });
});

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 3. Text Animation for Hero Section
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
    const words = ["Voice Artist", "Anime Dubbing", "Cartoon Voices", "Professional VO"];
    let index = 0;

    function changeText() {
        animatedText.style.opacity = 0;
        setTimeout(() => {
            animatedText.textContent = words[index];
            animatedText.style.opacity = 1;
            index = (index + 1) % words.length;
        }, 500);
    }
    setInterval(changeText, 3000); // Change every 3 seconds
}

// 4. Contact Form (Send Email feature)
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get values
        const name = document.getElementById('cf-name').value;
        const subject = document.getElementById('cf-subject').value;
        const message = document.getElementById('cf-message').value;

        // Create Mailto Link
        const mailtoLink = `mailto:mokshjain632@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\n\n" + message)}`;

        // Open Email Client
        window.location.href = mailtoLink;
        
        // Optional: Show alert
        alert("Opening your email client to send the message...");
    });
}

// 5. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Footer Year Update
document.getElementById('year').textContent = new Date().getFullYear();
