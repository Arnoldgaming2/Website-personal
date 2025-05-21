document.addEventListener('DOMContentLoaded', function () {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const contactForm = document.querySelector('.contact-form');


    function switchSection(sectionId) {

        sections.forEach(section => {
            section.classList.remove('active');
        });


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });


        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');


            const animatedElements = targetSection.querySelectorAll('.animate__animated');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                void el.offsetHeight;
                el.style.animation = null;
            });
        }


        navLinksContainer.classList.remove('active');
    }


    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
            history.pushState({
                section: sectionId
            }, '', `#${sectionId}`);
        });
    });

    menuBtn.addEventListener('click', function () {
        navLinksContainer.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-btn')) {
            navLinksContainer.classList.remove('active');
        }
    });

    window.addEventListener('popstate', function (e) {
        const sectionId = window.location.hash.substring(1) || 'home';
        switchSection(sectionId);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Message sent successfully!');
            this.reset();
        });
    }


    const initialSection = window.location.hash.substring(1) || 'home';
    switchSection(initialSection);
    history.replaceState({
        section: initialSection
    }, '', `#${initialSection}`);
});