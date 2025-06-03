        // Add interactive glitch effects
        document.addEventListener('DOMContentLoaded', function() {
            const actionBtns = document.querySelectorAll('.action-btn');
            
            actionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    this.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 100);
                    }, 100);
                });
            });

            // Random glitch effects
            setInterval(() => {
                const glitchElements = document.querySelectorAll('.glitch-effect');
                glitchElements.forEach(el => {
                    if (Math.random() > 0.7) {
                        el.style.transform = `translateX(${Math.random() * 4 - 2}px) skew(${Math.random() * 2 - 1}deg)`;
                        setTimeout(() => {
                            el.style.transform = 'translateX(0) skew(0deg)';
                        }, 100);
                    }
                });
            }, 2000);
        });

        