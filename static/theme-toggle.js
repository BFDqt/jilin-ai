/**
 * Theme switching functionality
 * Supports light, auto, and dark themes, saves user preferences to localStorage
 */

class ThemeToggle {
    constructor() {
        this.STORAGE_KEY = 'preferred-theme';
        this.THEME_DARK = 'dark';
        this.THEME_LIGHT = 'light';
        this.THEME_AUTO = 'auto';
        
        this.themeRadios = null;
        this.lightRadio = null;
        this.autoRadio = null;
        this.darkRadio = null;
        
        this.init();
    }
    
    /**
     * Initialize theme switching functionality
     */
    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    /**
     * Set up theme switching functionality
     */
    setup() {
        // Get radio button elements
        this.lightRadio = document.getElementById('theme-light');
        this.autoRadio = document.getElementById('theme-auto');
        this.darkRadio = document.getElementById('theme-dark');
        this.themeRadios = document.querySelectorAll('input[name="color-scheme"]');
        
        if (!this.lightRadio || !this.autoRadio || !this.darkRadio) {
            console.warn('Theme toggler not found');
            return;
        }
        
        // Set initial theme
        this.setInitialTheme();
        
        // Bind event listeners
        this.themeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.handleThemeChange(e.target.value);
                }
            });
        });
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }
    
    /**
     * Set initial theme
     */
    setInitialTheme() {
        const savedScheme = this.getSavedTheme();
        const initialScheme = savedScheme || this.THEME_AUTO;
        
        this.setColorScheme(initialScheme);
        this.updateRadioButtons(initialScheme);
    }
    
    /**
     * Get saved theme preference
     */
    getSavedTheme() {
        try {
            return localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('Unable to read theme settings from localStorage');
            return null;
        }
    }
    
    /**
     * Get system theme preference
     */
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return this.THEME_DARK;
        }
        return this.THEME_LIGHT;
    }
    
    /**
     * Save theme preference
     */
    saveTheme(scheme) {
        try {
            localStorage.setItem(this.STORAGE_KEY, scheme);
        } catch (e) {
            console.warn('Unable to save theme settings to localStorage');
        }
    }

    /**
     * Handle theme change
     */
    handleThemeChange(scheme) {
        this.setColorScheme(scheme);
        this.saveTheme(scheme);
        this.dispatchThemeChangeEvent(scheme);
    }

    /**
     * Set color scheme
     */
    setColorScheme(scheme) {
        let actualTheme;
        
        if (scheme === this.THEME_AUTO) {
            actualTheme = this.getSystemTheme();
        } else {
            actualTheme = scheme;
        }
        
        this.applyTheme(actualTheme);
    }

    /**
     * Apply theme
     */
    applyTheme(theme) {
        // Set data-theme attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add transition animation class
        document.body.classList.add('theme-transitioning');
        
        // Remove transition class (to avoid affecting other animations)
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    /**
     * Update radio button states
     */
    updateRadioButtons(scheme) {
        switch (scheme) {
            case this.THEME_LIGHT:
                this.lightRadio.checked = true;
                break;
            case this.THEME_AUTO:
                this.autoRadio.checked = true;
                break;
            case this.THEME_DARK:
                this.darkRadio.checked = true;
                break;
        }
    }

    /**
     * Listen for system theme changes
     */
    watchSystemTheme() {
        if (!window.matchMedia) return;
        
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        darkModeQuery.addEventListener('change', (e) => {
            // Only follow system theme when in auto mode
            const savedScheme = this.getSavedTheme();
            if (!savedScheme || savedScheme === this.THEME_AUTO) {
                const systemTheme = e.matches ? this.THEME_DARK : this.THEME_LIGHT;
                this.applyTheme(systemTheme);
            }
        });
    }
    
    /**
     * Dispatch theme change event
     */
    dispatchThemeChangeEvent(scheme) {
        const actualTheme = document.documentElement.getAttribute('data-theme');
        const event = new CustomEvent('themeChanged', {
            detail: { scheme, theme: actualTheme }
        });
        document.dispatchEvent(event);
    }

    /**
     * Get current theme scheme
     */
    getCurrentScheme() {
        return this.getSavedTheme() || this.THEME_AUTO;
    }

    /**
     * Get current actual theme
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.THEME_LIGHT;
    }
}

// Add smooth transition styles
const style = document.createElement('style');
style.textContent = `
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *:before,
    .theme-transitioning *:after {
        transition: background-color 0.3s ease, 
                   color 0.3s ease, 
                   border-color 0.3s ease,
                   box-shadow 0.3s ease !important;
        transition-delay: 0s !important;
    }
`;
document.head.appendChild(style);

// Initialize theme switching functionality
const themeToggle = new ThemeToggle();

// Export to global scope (if needed)
window.ThemeToggle = ThemeToggle;
window.themeToggle = themeToggle;