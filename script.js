// Smooth scrolling and enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Video background handling
    const videoBackground = document.querySelector('.video-background');
    const video = document.querySelector('.video-background video');
    
    if (video) {
        // Add loading state
        videoBackground.classList.add('loading');
        
        // Handle video loading
        video.addEventListener('loadeddata', function() {
            videoBackground.classList.remove('loading');
            videoBackground.classList.add('loaded');
        });
        
        // Handle video errors
        video.addEventListener('error', function() {
            videoBackground.classList.remove('loading');
            videoBackground.style.background = 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)';
        });
        
        // Pause video when not visible (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Video autoplay prevented'));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(videoBackground);
    }
    
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
        
        // Subtle video parallax effect
        if (videoBackground) {
            const videoParallaxX = (mouseX - 0.5) * 10;
            const videoParallaxY = (mouseY - 0.5) * 10;
            videoBackground.style.transform = `translate(${videoParallaxX}px, ${videoParallaxY}px)`;
        }
    });
    
    // Add subtle text shadow on hover for main title
    const mainTitle = document.querySelector('.main-title');
    mainTitle.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 40px rgba(255, 255, 255, 0.4)';
        this.style.transition = 'text-shadow 0.3s ease';
    });
    
    mainTitle.addEventListener('mouseleave', function() {
        this.style.textShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
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
                    background: rgba(255, 255, 255, ${0.4 - index * 0.08});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    transition: all 0.1s ease;
                    backdrop-filter: blur(2px);
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
    
    // Add premium video interaction effects
    if (videoBackground) {
        videoBackground.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        videoBackground.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add smooth transitions for all interactive elements
    const interactiveElements = document.querySelectorAll('.book-call-btn, .main-title, .subtitle, .tagline');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
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
        .plant-overlay,
        .video-background {
            animation: none !important;
            transition: none !important;
        }
    }
    
    /* Premium video effects */
    .video-background {
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .video-background video {
        transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);
