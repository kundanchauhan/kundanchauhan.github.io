// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Typing Animation
if (document.querySelector('.typing-text')) {
    new Typed('.typing-text', {
        strings: ['Python Developer', 'Backend Engineer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });
}

// Close mobile nav when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            mobileToggle.querySelector('i').classList.replace('bx-x', 'bx-menu');
        }
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a.active')?.classList.remove('active');
                navLink.classList.add('active');
            }
        }
    });
});

// Theme Toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved user preference, if any, on load
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('portfolio-theme', targetTheme);
    updateThemeIcon(targetTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    } else {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
}

// Portfolio Filtering
const filterBtns = document.querySelectorAll('#portfolio-filters li');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('filter-active'));
        // Add active class to clicked button
        this.classList.add('filter-active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                item.style.display = 'block';
                // Trigger reflow to restart animation
                void item.offsetWidth; 
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // Wait for transition to finish
            }
        });
    });
});


