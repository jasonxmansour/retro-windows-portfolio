// Set up the current time
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    document.getElementById('current-time').textContent = `${hours}:${minutes} ${ampm}`;
}

setInterval(updateTime, 1000);
updateTime();

// Desktop icons click handler
const desktopIcons = document.querySelectorAll('.desktop-icon');
const windows = document.querySelectorAll('.window');

desktopIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const windowId = this.getAttribute('data-window');
        const windowElement = document.getElementById(`${windowId}-window`);
        
        // Hide all windows first
        windows.forEach(win => {
            win.style.zIndex = 50;
        });
        
        // Show the selected window
        windowElement.style.display = 'block';
        windowElement.style.zIndex = 100;
        
        // Set all icons to inactive
        desktopIcons.forEach(i => i.classList.remove('active'));
        
        // Set clicked icon to active
        this.classList.add('active');
    });
    
    // Double click handler
    icon.addEventListener('dblclick', function() {
        const windowId = this.getAttribute('data-window');
        const windowElement = document.getElementById(`${windowId}-window`);
        
        // Hide all windows first
        windows.forEach(win => {
            win.style.zIndex = 50;
        });
        
        // Show the selected window
        windowElement.style.display = 'block';
        windowElement.style.zIndex = 100;
        
        // Set all icons to inactive
        desktopIcons.forEach(i => i.classList.remove('active'));
        
        // Set clicked icon to active
        this.classList.add('active');
    });
});

// Window control buttons
const closeButtons = document.querySelectorAll('.window-button.close');
const minimizeButtons = document.querySelectorAll('.window-button.minimize');
const maximizeButtons = document.querySelectorAll('.window-button.maximize');

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const windowElement = this.closest('.window');
        windowElement.style.display = 'none';
        
        // Find and deactivate the corresponding icon
        const windowId = windowElement.id.replace('-window', '');
        document.querySelector(`.desktop-icon[data-window="${windowId}"]`).classList.remove('active');
    });
});

minimizeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const windowElement = this.closest('.window');
        windowElement.style.display = 'none';
        
        // Find and deactivate the corresponding icon
        const windowId = windowElement.id.replace('-window', '');
        document.querySelector(`.desktop-icon[data-window="${windowId}"]`).classList.remove('active');
    });
});

maximizeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const windowElement = this.closest('.window');
        
        if (windowElement.style.width === '100%' && windowElement.style.height === 'calc(100% - 30px)') {
            // Restore
            windowElement.style.width = windowElement.getAttribute('data-prev-width');
            windowElement.style.height = windowElement.getAttribute('data-prev-height');
            windowElement.style.top = windowElement.getAttribute('data-prev-top');
            windowElement.style.left = windowElement.getAttribute('data-prev-left');
        } else {
            // Maximize
            windowElement.setAttribute('data-prev-width', windowElement.style.width);
            windowElement.setAttribute('data-prev-height', windowElement.style.height);
            windowElement.setAttribute('data-prev-top', windowElement.style.top);
            windowElement.setAttribute('data-prev-left', windowElement.style.left);
            
            windowElement.style.width = '100%';
            windowElement.style.height = 'calc(100% - 30px)';
            windowElement.style.top = '0';
            windowElement.style.left = '0';
        }
    });
});

// Make windows draggable
const windowHeaders = document.querySelectorAll('.window-header');

windowHeaders.forEach(header => {
    header.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('window-button')) return;
        
        const windowElement = this.parentElement;
        
        // Bring to front
        windows.forEach(win => {
            win.style.zIndex = 50;
        });
        windowElement.style.zIndex = 100;
        
        let isDragging = true;
        
        let offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        let offsetY = e.clientY - windowElement.getBoundingClientRect().top;
        
        function moveWindow(e) {
            if (!isDragging) return;
            
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            
            windowElement.style.left = `${newX}px`;
            windowElement.style.top = `${newY}px`;
        }
        
        document.addEventListener('mousemove', moveWindow);
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.removeEventListener('mousemove', moveWindow);
        });
    });
});

// Window click to bring to front
windows.forEach(windowElement => {
    windowElement.addEventListener('mousedown', function() {
        windows.forEach(win => {
            win.style.zIndex = 50;
        });
        this.style.zIndex = 100;
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Changed from alert to console log
    console.log('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Start button functionality 
document.querySelector('.start-button').addEventListener('click', function() {
    // Empty function - no alerts or popups
});

// Welcome overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('start-portfolio')) {
        const startButton = document.getElementById('start-portfolio');
        const welcomeOverlay = document.getElementById('welcome-overlay');
        const startupSound = document.getElementById('startup-sound');
        
        // Play sound and hide overlay when Start Up button is clicked
        startButton.addEventListener('click', function() {
            // Play the startup sound
            startupSound.play()
                .then(() => {
                    // Hide the welcome overlay with a slight delay
                    setTimeout(function() {
                        welcomeOverlay.style.display = 'none';
                    }, 500);
                })
                .catch(e => {
                    console.error("Audio play failed:", e);
                    // If audio fails, still hide overlay
                    welcomeOverlay.style.display = 'none';
                });
        });
    }
});