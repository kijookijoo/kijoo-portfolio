// iPhone Portfolio JavaScript

class iPhonePortfolio {
    constructor() {
        this.currentScreen = 'home';
        this.screens = ['home', 'about', 'education', 'projects', 'skills', 'contact', 'certificates', 'gallery', 'cat-gallery'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupStatusBar();
        this.setupDynamicIsland();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // App icon clicks
        const appIcons = document.querySelectorAll('.app-icon, .dock-app');
        console.log('Found', appIcons.length, 'app icons');
        
        appIcons.forEach((icon, index) => {
            console.log(`Icon ${index}:`, icon, 'data-app:', icon.getAttribute('data-app'));
            icon.addEventListener('click', (e) => {
                console.log('Icon clicked!', e.currentTarget);
                const appName = e.currentTarget.getAttribute('data-app');
                console.log('App name:', appName);
                if (appName) {
                    this.openApp(appName);
                }
            });
        });

        // Back button functionality
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.goHome();
            });
        });

        // Handle data-action attributes
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action]')) {
                const action = e.target.closest('[data-action]').getAttribute('data-action');
                if (action === 'goHome') {
                    e.preventDefault();
                    this.goHome();
                }
            }
        });

        // Contact links
        document.querySelectorAll('.contact-item').forEach(link => {
            link.addEventListener('click', (e) => {
                if (e.currentTarget.href.includes('mailto:')) {
                    e.preventDefault();
                    this.showEmailCopied();
                }
            });
        });

        // Download button
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadResume();
            });
        }

        // Add haptic feedback simulation
        document.querySelectorAll('.app-icon, .dock-app, .back-btn, .contact-item, .download-btn').forEach(element => {
            element.addEventListener('click', () => {
                this.hapticFeedback();
            });
        });
    }

    setupAnimations() {
        // Add entrance animation for app icons
        const appIcons = document.querySelectorAll('.app-icon');
        appIcons.forEach((icon, index) => {
            icon.style.opacity = '0';
            icon.style.transform = 'scale(0)';
            setTimeout(() => {
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.opacity = '1';
                icon.style.transform = 'scale(1)';
            }, index * 100);
        });

        // Add entrance animation for dock
        const dock = document.querySelector('.dock');
        if (dock) {
            dock.style.opacity = '0';
            dock.style.transform = 'translateY(50px)';
            setTimeout(() => {
                dock.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                dock.style.opacity = '1';
                dock.style.transform = 'translateY(0)';
            }, 800);
        }
    }

    setupStatusBar() {
        // Update time
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);

        // Battery animation
        this.animateBattery();
    }

    setupDynamicIsland() {
        // Add subtle animation to dynamic island
        const island = document.querySelector('.dynamic-island');
        if (island) {
            setInterval(() => {
                island.style.transform = 'translateX(-50%) scale(1.02)';
                setTimeout(() => {
                    island.style.transform = 'translateX(-50%) scale(1)';
                }, 200);
            }, 5000);
        }
    }

    updateTime() {
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: false 
            });
            timeElement.textContent = time;
        }
    }

    animateBattery() {
        const batteryIcon = document.querySelector('.fa-battery-three-quarters');
        if (batteryIcon) {
            setInterval(() => {
                batteryIcon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    batteryIcon.style.transform = 'scale(1)';
                }, 300);
            }, 10000);
        }
    }

    openApp(appName) {
        console.log('openApp called with:', appName);
        console.log('Current screen:', this.currentScreen);
        
        if (appName === this.currentScreen) {
            console.log('Already on this screen, returning');
            return;
        }

        const currentScreenElement = document.getElementById(this.currentScreen);
        const newScreenElement = document.getElementById(appName);
        
        console.log('Current screen element:', currentScreenElement);
        console.log('New screen element:', newScreenElement);

        if (currentScreenElement && newScreenElement) {
            // Add exit animation to current screen
            currentScreenElement.classList.add('prev');
            currentScreenElement.classList.remove('active');

            // Add enter animation to new screen
            setTimeout(() => {
                newScreenElement.classList.add('active');
                newScreenElement.classList.remove('prev');
                this.currentScreen = appName;

                // Animate content in
                this.animateAppContent(newScreenElement);
            }, 150);
        }
    }

    animateAppContent(screenElement) {
        const animatedElements = screenElement.querySelectorAll('.profile-section, .education-item, .project-card, .skill-category, .contact-item, .certificate-card, .gallery-item, .gallery-folder');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    goHome() {
        this.openApp('home');
    }

    hapticFeedback() {
        // Simulate haptic feedback with visual feedback
        const phone = document.querySelector('.iphone-mockup');
        phone.style.transform = 'scale(0.98)';
        setTimeout(() => {
            phone.style.transform = 'scale(1)';
        }, 100);
    }

    showEmailCopied() {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>Email copied to clipboard!</span>
            </div>
        `;
        
        // Add toast styles
        const toastStyles = document.createElement('style');
        toastStyles.textContent = `
            .toast {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 1000;
                animation: toastIn 0.3s ease-out;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                font-weight: 500;
            }
            
            .toast-content i {
                color: #4CAF50;
            }
            
            @keyframes toastIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        
        document.head.appendChild(toastStyles);
        document.body.appendChild(toast);
        
        // Copy email to clipboard
        navigator.clipboard.writeText('kjyoon0125@gmail.com').then(() => {
            setTimeout(() => {
                toast.remove();
                toastStyles.remove();
            }, 2000);
        });
    }

    downloadResume() {
        // Simulate download
        const downloadBtn = document.querySelector('.download-btn');
        const originalText = downloadBtn.innerHTML;
        
        downloadBtn.innerHTML = '<div class="loading"></div> Downloading...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            downloadBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
                downloadBtn.style.background = '';
            }, 2000);
        }, 2000);
    }

    // Add parallax effect to wallpaper
    addParallaxEffect() {
        const wallpaper = document.querySelector('.wallpaper');
        if (wallpaper) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                wallpaper.style.backgroundPosition = `${x}% ${y}%`;
            });
        }
    }

    // Add app icon hover effects (removed bounce animation)
    addAppIconHover() {
        document.querySelectorAll('.app-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                // Just add subtle hover effect without bounce
                icon.style.transition = 'transform 0.2s ease';
            });
        });
    }

    // Add typing effect to profile name
    addTypingEffect() {
        const nameElement = document.querySelector('.profile-section h2');
        if (nameElement) {
            const text = nameElement.textContent;
            nameElement.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    nameElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect when about app opens
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (nameElement.closest('.screen').classList.contains('active')) {
                            setTimeout(typeWriter, 500);
                            observer.disconnect();
                        }
                    }
                });
            });
            
            observer.observe(nameElement.closest('.screen'), { attributes: true });
        }
    }
}

// Removed bounce animation keyframes - no longer needed

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    const portfolio = new iPhonePortfolio();
    window.portfolio = portfolio; // Make it globally available
    console.log('Portfolio created and available globally');
    
    // Add additional features
    portfolio.addParallaxEffect();
    portfolio.addAppIconHover();
    portfolio.addTypingEffect();
    
    // Add global click handler for app icons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.app-icon') || e.target.closest('.dock-app')) {
            const appName = e.target.closest('.app-icon, .dock-app').getAttribute('data-app');
            if (appName) {
                // Special handling for resume - open PDF in new tab
                if (appName === 'resume') {
                    window.open('images/Resume (3).pdf', '_blank');
                } else {
                    portfolio.openApp(appName);
                }
            }
        }
        
        // Handle gallery folder clicks
        if (e.target.closest('.gallery-folder')) {
            const appName = e.target.closest('.gallery-folder').getAttribute('data-app');
            if (appName) {
                portfolio.openApp(appName);
            }
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            portfolio.goHome();
        }
    });
    
    
    // Add touch gestures for mobile
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = startX - endX;
        
        // Swipe up to go home
        if (diffY > 50 && Math.abs(diffX) < 50) {
            portfolio.goHome();
        }
    });
    
    console.log('iPhone Portfolio loaded successfully! 📱✨');
    
    // Test if clicking works at all
    document.addEventListener('click', (e) => {
        console.log('Click detected on:', e.target);
    });
});

// Global function for back button
function goHome() {
    if (window.portfolio) {
        window.portfolio.goHome();
    } else {
        // Fallback if portfolio instance isn't available
        const portfolio = new iPhonePortfolio();
        portfolio.goHome();
    }
}
