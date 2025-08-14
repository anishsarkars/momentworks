// Smooth scrolling and enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.background-light, .plant-overlay, .floating-circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Smooth hover effects for the Book a Call button
    const bookCallBtn = document.querySelector('.book-call-btn');
    
    bookCallBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    bookCallBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click functionality to Book a Call button
    bookCallBtn.addEventListener('click', function() {
        // You can replace this with your actual booking system
        alert('Booking system coming soon! This would typically open a calendar or contact form.');
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.main-title, .subtitle, .tagline');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const floatingElements = document.querySelectorAll('.floating-circle');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add subtle text shadow on hover for main title
    const mainTitle = document.querySelector('.main-title');
    mainTitle.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 30px rgba(76, 175, 80, 0.3)';
        this.style.transition = 'text-shadow 0.3s ease';
    });
    
    mainTitle.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
    
    // Smooth reveal animation for the "revealing soon" text
    const revealingSoon = document.querySelector('.revealing-soon');
    revealingSoon.style.opacity = '0';
    revealingSoon.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        revealingSoon.style.transition = 'all 1s ease';
        revealingSoon.style.opacity = '1';
        revealingSoon.style.transform = 'translateX(0)';
    }, 1000);
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const heroContainer = document.querySelector('.hero-container');
        heroContainer.style.opacity = '1';
        heroContainer.style.transform = 'scale(1)';
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement === bookCallBtn) {
            bookCallBtn.click();
        }
    });
    
    // Add focus styles for accessibility
    bookCallBtn.addEventListener('focus', function() {
        this.style.outline = '2px solid rgba(76, 175, 80, 0.5)';
        this.style.outlineOffset = '2px';
    });
    
    bookCallBtn.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.background-light, .plant-overlay');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Add subtle cursor trail effect
    let cursorTrail = [];
    const maxTrailLength = 5;
    
    document.addEventListener('mousemove', function(e) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        // Create or update trail elements
        cursorTrail.forEach((pos, index) => {
            let trailElement = document.getElementById(`trail-${index}`);
            if (!trailElement) {
                trailElement = document.createElement('div');
                trailElement.id = `trail-${index}`;
                trailElement.className = 'cursor-trail';
                trailElement.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: rgba(76, 175, 80, ${0.3 - index * 0.05});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(trailElement);
            }
            
            trailElement.style.left = pos.x + 'px';
            trailElement.style.top = pos.y + 'px';
            trailElement.style.opacity = 1 - (index * 0.2);
        });
    });
    
    // Clean up trail elements when mouse leaves
    document.addEventListener('mouseleave', function() {
        cursorTrail = [];
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
    });
});

// Add CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .cursor-trail,
        .floating-circle,
        .background-light,
        .plant-overlay {
            animation: none !important;
            transition: none !important;
        }
    }
`;
document.head.appendChild(style);
