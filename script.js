// Simple and minimal functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Video and volume control
    const video = document.getElementById('background-video');
    const volumeBtn = document.getElementById('volume-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    let isMuted = true; // Start muted as per autoplay requirements
    let isPlaying = true; // Start playing
    
    // Popup video elements
    const popupVideo = document.getElementById('popup-video');
    const popupTrigger = document.getElementById('popup-trigger');
    const closePopup = document.getElementById('close-popup');
    const popupVideoElement = document.getElementById('popup-video-element');
    const popupPlayPause = document.getElementById('popup-play-pause');
    const popupVolume = document.getElementById('popup-volume');
    let popupIsPlaying = false;
    let popupIsMuted = true;
    
    if (video && volumeBtn && playPauseBtn) {
        // Play/Pause button click handler
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                // Pause video
                video.pause();
                playPauseBtn.classList.add('paused');
                isPlaying = false;
                
                // Update icon to play button
                playPauseBtn.innerHTML = `
                    <svg class="play-pause-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                `;
            } else {
                // Play video
                video.play();
                playPauseBtn.classList.remove('paused');
                isPlaying = true;
                
                // Update icon to pause button
                playPauseBtn.innerHTML = `
                    <svg class="play-pause-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
            }
        });
        
        // Volume button click handler
        volumeBtn.addEventListener('click', function() {
            if (isMuted) {
                // Unmute with subtle animation
                video.muted = false;
                video.volume = 0.3; // Set to 30% volume
                volumeBtn.classList.remove('muted');
                isMuted = false;
            } else {
                // Mute with subtle animation
                video.muted = true;
                volumeBtn.classList.add('muted');
                isMuted = true;
            }
        });
        
        // Handle video loading
        video.addEventListener('loadeddata', function() {
            // Video loaded successfully
        });
        
        // Handle video errors
        video.addEventListener('error', function() {
            console.log('Video failed to load');
        });
        
        // Handle video play/pause events to sync button state
        video.addEventListener('play', function() {
            playPauseBtn.classList.remove('paused');
            isPlaying = true;
        });
        
        video.addEventListener('pause', function() {
            playPauseBtn.classList.add('paused');
            isPlaying = false;
        });
    }
    
    // Popup video functionality
    if (popupVideo && popupTrigger && closePopup && popupVideoElement && popupPlayPause && popupVolume) {
        // Open popup
        popupTrigger.addEventListener('click', function() {
            popupVideo.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close popup
        closePopup.addEventListener('click', function() {
            popupVideo.classList.remove('active');
            document.body.style.overflow = 'hidden';
            // Pause popup video when closing
            popupVideoElement.pause();
            popupIsPlaying = false;
            updatePopupPlayButton();
        });
        
        // Close popup on outside click
        popupVideo.addEventListener('click', function(e) {
            if (e.target === popupVideo) {
                popupVideo.classList.remove('active');
                document.body.style.overflow = 'hidden';
                popupVideoElement.pause();
                popupIsPlaying = false;
                updatePopupPlayButton();
            }
        });
        
        // Popup play/pause
        popupPlayPause.addEventListener('click', function() {
            if (popupIsPlaying) {
                popupVideoElement.pause();
                popupIsPlaying = false;
            } else {
                popupVideoElement.play();
                popupIsPlaying = true;
            }
            updatePopupPlayButton();
        });
        
        // Popup volume
        popupVolume.addEventListener('click', function() {
            if (popupIsMuted) {
                popupVideoElement.muted = false;
                popupVideoElement.volume = 0.5;
                popupIsMuted = false;
                popupVolume.classList.remove('muted');
            } else {
                popupVideoElement.muted = true;
                popupIsMuted = true;
                popupVolume.classList.add('muted');
            }
        });
        
        // Update popup play button state
        function updatePopupPlayButton() {
            if (popupIsPlaying) {
                popupPlayPause.classList.add('playing');
            } else {
                popupPlayPause.classList.remove('playing');
            }
        }
        
        // Handle popup video events
        popupVideoElement.addEventListener('play', function() {
            popupIsPlaying = true;
            updatePopupPlayButton();
        });
        
        popupVideoElement.addEventListener('pause', function() {
            popupIsPlaying = false;
            updatePopupPlayButton();
        });
        
        // Handle popup video errors
        popupVideoElement.addEventListener('error', function() {
            console.log('Popup video failed to load');
        });
    }
    
    // Simple button functionality
    const bookCallBtn = document.querySelector('.book-call-btn');
    
    // Add focus styles for accessibility
    bookCallBtn.addEventListener('focus', function() {
        this.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
        this.style.outlineOffset = '2px';
    });
    
    bookCallBtn.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close popup
        if (e.key === 'Escape' && popupVideo && popupVideo.classList.contains('active')) {
            popupVideo.classList.remove('active');
            document.body.style.overflow = 'hidden';
            if (popupVideoElement) {
                popupVideoElement.pause();
                popupIsPlaying = false;
            }
        }
        
        // Space bar to toggle play/pause
        if (e.key === ' ' && document.activeElement === playPauseBtn) {
            e.preventDefault();
            playPauseBtn.click();
        }
        
        // Space bar to toggle volume
        if (e.key === ' ' && document.activeElement === volumeBtn) {
            e.preventDefault();
            volumeBtn.click();
        }
    });
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        // Add touch feedback for mobile devices
        volumeBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95) translateY(0)';
        });
        
        volumeBtn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
        
        playPauseBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95) translateY(0)';
        });
        
        playPauseBtn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
        
        bookCallBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98) translateY(0)';
        });
        
        bookCallBtn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
        
        if (popupTrigger) {
            popupTrigger.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98) translateY(0)';
            });
            
            popupTrigger.addEventListener('touchend', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        }
    }
    
    // Add cinematic loading experience
    window.addEventListener('load', function() {
        // Ensure smooth animations after page load
        document.body.style.overflow = 'hidden';
        
        // Add subtle entrance effect for interactive elements
        setTimeout(() => {
            const interactiveElements = document.querySelectorAll('.book-call-btn, .play-pause-btn, .volume-btn, .popup-trigger');
            interactiveElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
                el.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 2000);
    });
});
