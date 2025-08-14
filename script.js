// Simple and minimal functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Video and volume control
    const video = document.getElementById('background-video');
    const volumeBtn = document.getElementById('volume-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    let isMuted = true; // Start muted as per autoplay requirements
    let isPlaying = true; // Start playing
    
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
                // Unmute with animation
                video.muted = false;
                video.volume = 0.3; // Set to 30% volume
                volumeBtn.classList.remove('muted');
                isMuted = false;
                
                // Add pulse animation class
                volumeBtn.classList.add('volume-on');
                setTimeout(() => {
                    volumeBtn.classList.remove('volume-on');
                }, 300);
            } else {
                // Mute with animation
                video.muted = true;
                volumeBtn.classList.add('muted');
                isMuted = true;
                
                // Add mute animation class
                volumeBtn.classList.add('volume-off');
                setTimeout(() => {
                    volumeBtn.classList.remove('volume-off');
                }, 300);
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
    }
});
