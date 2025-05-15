// JavaScript for dynamic skill typing and modal with slider
(function () {
    // Dynamic typing effect for skill text
    const skills = [
        "Full Stack Web Dev",
        "UI/UX Designer",
        "Agile & Scrum Practitioner"
    ];
    const skillContainer = document.querySelector('.dynamic-skill');
    let skillIndex = 0;
    let charIndex = 0;
    let typingDelay = 100;
    let erasingDelay = 50;
    let pauseBetween = 1500;

    function type() {
        if (charIndex < skills[skillIndex].length) {
            skillContainer.textContent += skills[skillIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, pauseBetween);
        }
    }

    function erase() {
        if (charIndex > 0) {
            skillContainer.textContent = skills[skillIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            skillIndex++;
            if (skillIndex >= skills.length) skillIndex = 0;
            setTimeout(type, 500);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (skills.length) setTimeout(type, 1000);
    });

    // Project data
    const projects = [
        {
            title: "The Ledger of King Agus",
            images: [
                "assets/hutang/db_light.png",
                "assets/hutang/db_dark.png",
                "assets/hutang/index_light.png",
                "assets/hutang/index_dark.png"
            ],
            description:
                "This application was created to solve financial tracking issues commonly found in WhatsApp groups. Often, when hanging out or dining with friends, one person pays for everyone, and the rest owe their share. Traditionally, these debts are recorded manually, but since most guys and Gen Z rarely carry physical notebooks anymore, this system was built as a web-based solution for easier and more modern access. The app features two main tabs: Debt and Payment, both seamlessly integrated with a two- way netting system.This means that if the same person appears in both records, the system will automatically offset the debt in real - time. The platform includes separate interfaces for admin and public users, and supports both dark mode and light mode for a more comfortable user experience.",
            languages: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
            github: "https://github.com/jknymous/hutang-grup-system",
            thumbnail: "assets/hutang/db_light.png"
        },
        {
            title: "TravelMate App",
            images: [
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
            ],
            description:
                "A mobile-friendly travel planning web app with itinerary sharing and recommendations. Developed using Next.js, Tailwind CSS, and integrated with third-party APIs for live weather and maps.",
            languages: ["Next.js", "Tailwind CSS", "APIs"],
            github: "https://github.com/bimacodes/travelmate",
            thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Personal Finance Tracker",
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
            ],
            description:
                "A secure and privacy-first web app to track expenses, budgets, and savings goals. Implemented with Vue.js and Firebase for realtime synchronization and offline usage.",
            languages: ["Vue.js", "Firebase"],
            github: "",
            thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
        }
    ];

    // Render project list
    const projectList = document.querySelector('.project-list');
    projects.forEach((p, idx) => {
        const li = document.createElement('li');
        li.classList.add('project-item');
        li.setAttribute('tabindex', '0');
        li.setAttribute('role', 'button');
        li.setAttribute('aria-label', `Open details for project ${p.title}`);
        li.dataset.index = idx;

        li.innerHTML = `
<img src="${p.thumbnail}" alt="${p.title} thumbnail" class="project-image-small" />
<h3>${p.title}</h3>
<p class="project-langs">${p.languages.join(', ')}</p>
`;
        projectList.appendChild(li);
    });

    // Modal elements
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLangs = document.getElementById('modalLangs');
    const modalGithubBtn = document.getElementById('modalGithubBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalSlider = document.getElementById('modalSlider');

    let currentIndex = 0;
    let currentSlide = 0;

    function openModal(index) {
        currentIndex = index;
        currentSlide = 0;
        const project = projects[index];

        // Clear slider
        modalSlider.innerHTML = '';
        // Create slides
        project.images.forEach((imgSrc, i) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${project.title} image ${i + 1}`;
            img.classList.add('modal-slide');
            if (i === 0) {
                img.classList.add('active');
            }
            modalSlider.appendChild(img);
        });

        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
        modalLangs.textContent = 'Languages: ' + project.languages.join(', ');
        if (project.github) {
            modalGithubBtn.href = project.github;
            modalGithubBtn.style.display = 'inline-flex';
        } else {
            modalGithubBtn.style.display = 'none';
        }

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalCloseBtn.focus();
    }

    function closeModal() {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        const activeProject = document.querySelector('.project-list li[tabindex="0"]:focus');
        if (activeProject) activeProject.focus();
    }

    function showSlide(n) {
        const slides = modalSlider.querySelectorAll('.modal-slide');
        if (slides.length === 0) return;
        currentSlide = (n + slides.length) % slides.length;
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlide);
        });
    }

    // Event listeners
    projectList.addEventListener('click', e => {
        const li = e.target.closest('li[data-index]');
        if (!li) return;
        openModal(parseInt(li.dataset.index, 10));
    });
    projectList.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            const li = e.target.closest('li[data-index]');
            if (!li) return;
            e.preventDefault();
            openModal(parseInt(li.dataset.index, 10));
        }
    });
    modalCloseBtn.addEventListener('click', closeModal);

    document.getElementById('prevSlide').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    document.getElementById('nextSlide').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Close modal on backdrop click
    modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', e => {
        if (!modalBackdrop.classList.contains('active')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });
})();