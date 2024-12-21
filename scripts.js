// scripts.js

// Function to toggle code preview visibility
function toggleCode(id) {
    const codePreview = document.getElementById(`code-${id}`);
    const toggleButton = document.querySelector(`button[aria-controls="code-${id}"]`);
    const isVisible = codePreview.classList.contains('visible');

    if (isVisible) {
        codePreview.classList.remove('visible');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.innerHTML = `
            <svg role="presentation" focusable="false" height="16" width="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm1 12H7v-2h2v2zm0-4H7V4h2v4z"/>
            </svg> Show Code`;
        codePreview.setAttribute('aria-hidden', 'true');
    } else {
        codePreview.classList.add('visible');
        toggleButton.setAttribute('aria-expanded', 'true');
        toggleButton.innerHTML = `
            <svg role="presentation" focusable="false" height="16" width="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm1 12H7v-2h2v2zm0-4H7V4h2v4z"/>
            </svg> Hide Code`;
        codePreview.setAttribute('aria-hidden', 'false');
    }
}

// Function to toggle sub-list visibility
function toggleSubList(id) {
    const subList = document.getElementById(id);
    const button = document.querySelector(`[aria-controls="${id}"]`);
    const isVisible = subList.classList.contains('visible');

    if (isVisible) {
        subList.classList.remove('visible');
        button.setAttribute('aria-expanded', 'false');
    } else {
        subList.classList.add('visible');
        button.setAttribute('aria-expanded', 'true');
    }
}

// Function to copy code to clipboard
function copyCode(id) {
    const codeBlock = document.querySelector(`#${id} pre code`);
    const codeText = codeBlock.textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        showToast('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Function to show toast notifications
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '0.5rem 1rem';
    toast.style.borderRadius = '0.25rem';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    toast.style.zIndex = '1001';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 2000);
}

// Function to update the scroll progress bar
function updateProgressBar() {
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollPosition / totalHeight) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Function to toggle the visibility of the back-to-top button
function toggleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Function to smoothly scroll back to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Debounce function to optimize scroll events
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Function to load all card HTML files into the main container
function loadCards() {
    const cardsContainer = document.getElementById('cards-container');
    const cardsURL = 'cards/cards.html';

    fetch(cardsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${cardsURL}`);
            }
            return response.text();
        })
        .then(html => {
            cardsContainer.innerHTML = html;
        })
        .catch(error => {
            console.error(error);
            cardsContainer.innerHTML = '<p>Failed to load SEO steps. Please try again later.</p>';
        });
}

// Event Listeners
window.addEventListener('scroll', debounce(() => {
    updateProgressBar();
    toggleBackToTop();
}));

document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    updateProgressBar();
    toggleBackToTop();
});

// Enhance Keyboard Accessibility for Expandable Buttons
document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('expandable-button')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Prevent Event Bubbling for Copy Buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.copy-button')) {
        e.stopPropagation();
    }
});
