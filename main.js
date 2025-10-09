// --- 1. Typing Animation for Hero Section (Full Sentence Looping) ---
document.addEventListener('DOMContentLoaded', function() {
    const typingTextElement = document.getElementById('typing-text');
    
    // The single, long sentence to be typed and looped
    const textToType = "I’m Ragul — Engineer by Passion, Innovator by Purpose"; 
    let charIndex = 0;
    const typingSpeed = 70; // Slow speed for typing
    const deletingSpeed = 30; // Faster speed for deleting
    const delayBeforeLoop = 2000; // 2-second pause before erasing

    function type() {
        if (charIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Pause, then start erasing
            setTimeout(erase, delayBeforeLoop);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingTextElement.textContent = textToType.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, deletingSpeed);
        } else {
            // Restart the typing process
            setTimeout(type, 500); // Small delay before retyping starts
        }
    }
    
    // Start the animation
    typingTextElement.textContent = ""; 
    setTimeout(type, 800);
});

// --- 2. Mobile Menu Toggle ---
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- 3. Dark/Light Mode Toggle ---
const body = document.getElementById('body');
const toggleButton = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const toggleButtonMobile = document.getElementById('theme-toggle-mobile');
const toggleIconMobile = document.getElementById('toggle-icon-mobile');

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    toggleIcon.classList.replace('fa-sun', 'fa-moon');
    toggleIconMobile.classList.replace('fa-sun', 'fa-moon');
} else {
    // Default to dark theme (already set by default CSS)
    localStorage.setItem('theme', 'dark');
}

function toggleTheme() {
    body.classList.toggle('light-mode');
    
    // Update icons and storage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        toggleIcon.classList.replace('fa-sun', 'fa-moon');
        toggleIconMobile.classList.replace('fa-sun', 'fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        toggleIcon.classList.replace('fa-moon', 'fa-sun');
        toggleIconMobile.classList.replace('fa-moon', 'fa-sun');
    }
}

toggleButton.addEventListener('click', toggleTheme);
toggleButtonMobile.addEventListener('click', toggleTheme);

// --- 4. Smooth Scrolling & ScrollSpy for Navigation Links ---
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');

function activateScrollSpy() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for header height
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400'); // Remove active accent color
        link.classList.add('text-gray-50');    // Restore default text color
        
        if (link.getAttribute('href').includes(current)) {
            link.classList.remove('text-gray-50');
            link.classList.add('text-cyan-400'); // Apply active accent color
        }
    });
}

// Attach smooth scroll handler and ScrollSpy activation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to the element's position
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for sticky header
                behavior: 'smooth'
            });
            // Hide mobile menu immediately on click
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

window.addEventListener('scroll', activateScrollSpy);
// Initial check to highlight the correct section on load
activateScrollSpy();


// --- 5. Floating Back-to-Top Button Visibility ---
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});