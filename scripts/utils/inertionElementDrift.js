// Эффект инерции скролла - минимальная версия
(function() {
    const SETTINGS = {
        intensity: 15,
        maxDisplacement: 50,
        damping: 0.85,
        smoothReturn: true
    };
    
    class ScrollDrift {
        constructor(settings) {
            this.settings = settings;
            this.elements = [];
            this.velocity = 0;
            this.lastPosition = 0;
            this.lastTime = 0;
            this.init();
        }
        
        init() {
            this.elements = Array.from(document.querySelectorAll('.drift'));
            
            this.elements.forEach(el => {
                el._direction = Math.random() > 0.5 ? 1 : -1;
                el._intensity = parseFloat(el.dataset.intensity) || 1;
            });
            
            window.addEventListener('scroll', this.handleScroll.bind(this));
            this.animate();
        }
        
        handleScroll() {
            const now = Date.now();
            const pos = window.pageYOffset || document.documentElement.scrollTop;
            
            if (this.lastTime > 0) {
                const deltaTime = now - this.lastTime;
                const deltaScroll = pos - this.lastPosition;
                
                if (deltaTime > 0) {
                    this.velocity = deltaScroll / deltaTime * 16;
                    this.velocity = Math.max(Math.min(this.velocity, 5), -5);
                }
            }
            
            this.lastPosition = pos;
            this.lastTime = now;
        }
        
        animate() {
            if (Math.abs(this.velocity) > 0.01) {
                this.elements.forEach(el => {
                    const displacement = this.velocity * this.settings.intensity * 
                                        el._intensity * el._direction;
                    const limited = Math.max(Math.min(displacement, this.settings.maxDisplacement), 
                                            -this.settings.maxDisplacement);
                    el.style.transform = `translateY(${limited}px)`;
                });
                
                this.velocity *= this.settings.damping;
                
                if (Math.abs(this.velocity) < 0.05 && this.settings.smoothReturn) {
                    this.velocity = 0;
                    this.elements.forEach(el => {
                        el.style.transform = 'translateY(0)';
                    });
                }
            }
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // Автозапуск
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollDrift(SETTINGS);
    });
})();