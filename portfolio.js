const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');

if (contactBtn && contactModal && closeModal) {
    contactBtn.addEventListener('click', () => {
        contactModal.classList.add('open');
    });

    closeModal.addEventListener('click', () => {
        contactModal.classList.remove('open');
    });

    contactModal.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.classList.remove('open');
        }
    });
}

const previewModal = document.getElementById('imagePreviewModal');
const closePreview = document.getElementById('closePreview');
const previewTitle = document.getElementById('previewTitle');
const previewImg = document.getElementById('previewImg');

function openPreview(title, imageSrc) {
    if (previewModal && previewTitle && previewImg) {
        previewTitle.textContent = title;
        previewImg.src = imageSrc;
        previewModal.classList.add('open');
    }
}

if (closePreview && previewModal) {
    closePreview.addEventListener('click', () => {
        previewModal.classList.remove('open');
    });

    previewModal.addEventListener('click', (event) => {
        if (event.target === previewModal) {
            previewModal.classList.remove('open');
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (contactModal && contactModal.classList.contains('open')) {
            contactModal.classList.remove('open');
        }
        if (previewModal && previewModal.classList.contains('open')) {
            previewModal.classList.remove('open');
        }
    }
});

const projectsData = [
    {
        title: 'Cafe Orion',
        image: 'Cafe Project.png',
        description: 'A coffee shop website with menu browsing, and table reservation options.'
    },
    {
        title: 'Sakay',
        image: 'Research Project.png',
        description: 'A commuting guide and simple research about transportation in the Philippines.'
    },
    {
        title: 'Guess The Number',
        image: 'Guess The Number.png',
        description: 'A number-guessing game with different difficulty levels.'
    }
];

let currentProjectIndex = 0;

const swipeStage = document.getElementById('swipeStage');
const swipeCards = document.querySelectorAll('.swipe-card');
const swipeDots = document.querySelectorAll('.swipe-dot');
const prevProjectBtn = document.getElementById('prevProjectBtn');
const nextProjectBtn = document.getElementById('nextProjectBtn');
const activeProjectTitle = document.getElementById('activeProjectTitle');
const activeProjectDesc = document.getElementById('activeProjectDesc');
const activeViewProjectBtn = document.getElementById('activeViewProjectBtn');

function showproject(newIndex) {
    const total = projectsData.length;
    currentProjectIndex = (newIndex + total) % total;

    const prevIndex = (currentProjectIndex - 1 + total) % total;
    const nextIndex = (currentProjectIndex + 1) % total;

    swipeCards.forEach((card, idx) => {
        card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
        if (idx === currentProjectIndex) {
            card.classList.add('is-active');
        } else if (idx === prevIndex) {
            card.classList.add('is-prev');
        } else if (idx === nextIndex) {
            card.classList.add('is-next');
        } else {
            card.classList.add('is-hidden');
        }
    });

    swipeDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentProjectIndex);
    });

    const activeProject = projectsData[currentProjectIndex];
    if (activeProjectTitle) activeProjectTitle.textContent = activeProject.title;
    if (activeProjectDesc) activeProjectDesc.textContent = activeProject.description;
}

let touchStartX = 0;
let didSwipe = false;

function handleCardClick(clickedIndex) {
    if (didSwipe) {
        didSwipe = false;
        return;
    }

    if (clickedIndex !== currentProjectIndex) {
        showproject(clickedIndex);
    } else {
        const activeProject = projectsData[currentProjectIndex];
        openPreview(activeProject.title, activeProject.image);
    }
}

if (prevProjectBtn) {
    prevProjectBtn.addEventListener('click', () => {
        showproject(currentProjectIndex - 1);
    });
}

if (nextProjectBtn) {
    nextProjectBtn.addEventListener('click', () => {
        showproject(currentProjectIndex + 1);
    });
}

swipeDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        showproject(idx);
    });
});

if (activeViewProjectBtn) {
    activeViewProjectBtn.addEventListener('click', () => {
        const activeProject = projectsData[currentProjectIndex];
        openPreview(activeProject.title, activeProject.image);
    });
}

if (swipeStage) {
    swipeStage.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
        didSwipe = false;
    }, { passive: true });

    swipeStage.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const diffX = touchEndX - touchStartX;

        if (Math.abs(diffX) > 40) {
            didSwipe = true;
            if (diffX < 0) {
                showproject(currentProjectIndex + 1);
            } else {
                showproject(currentProjectIndex - 1);
            }
        }
    }, { passive: true });
}

showproject(0);