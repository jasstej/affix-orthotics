// Smooth Page Loading Animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500); // Matches the CSS transition time
});

// Scroll Reveal Animation
const elementsToReveal = document.querySelectorAll('.category, .hero-banner, .testimonial, .faq');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

elementsToReveal.forEach(el => observer.observe(el));

// Add class for animation
elementsToReveal.forEach(el => el.classList.add('hidden'));

/* CSS to make hidden items initially invisible */
const style = document.createElement('style');
style.textContent = `
.hidden { opacity: 0; transform: translateY(20px); transition: all 0.5s ease; }
.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
