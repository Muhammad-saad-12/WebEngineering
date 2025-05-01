// Declare featuresContainer at the top to make it accessible
let featuresContainer;

// Event Listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Create feature boxes container
    featuresContainer = document.createElement('div');
    featuresContainer.className = 'features';

    // Add horizontal rule
    const hr = document.createElement('hr');
    featuresContainer.appendChild(hr);

    // Add feature boxes
    features.forEach(feature => {
        const featureBox = document.createElement('div');
        featureBox.className = 'feature-box';

        const icon = document.createElement('div');
        icon.className = 'feature-icon';
        icon.textContent = feature.icon; // Use emoji icons

        const title = document.createElement('h3');
        title.textContent = feature.title;

        const desc = document.createElement('p');
        desc.textContent = feature.description;

        featureBox.appendChild(icon);
        featureBox.appendChild(title);
        featureBox.appendChild(desc);

        featuresContainer.appendChild(featureBox);
    });

    // Insert features section after hero section
    const hero = document.querySelector('.hero');
    hero.parentNode.insertBefore(featuresContainer, hero.nextSibling);

    // Flag selector functionality
    const flagSelector = document.querySelector('.flags select');
    if (flagSelector) {
        flagSelector.addEventListener('change', function() {
            console.log('Selected country:', this.value);
        });
    }

    // Optional animation on scroll
    const featureBoxes = document.querySelectorAll('.feature-box');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    featureBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'all 0.6s ease';
        observer.observe(box);
    });
});

// Testimonial carousel logic stays unchanged
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        navDots[index].classList.add('active');
        currentIndex = index;

        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    showTestimonial(0);
    startAutoSlide();

    const testimonialContainer = document.querySelector('.testimonial-container');
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    testimonialContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
document.querySelector('.more').addEventListener('click', () => {
    alert('Redirecting to more testimonials...');
});
