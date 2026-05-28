// Auto time ago script
document.querySelectorAll('time[datetime]').forEach(el => {
    const publishDate = new Date(el.getAttribute('datetime'));
    const now = new Date();
    const diffSeconds = Math.floor((now - publishDate) / 1000);
    const diffDays = Math.floor(diffSeconds / 86400);

    if (diffDays < 7) {
        if (diffSeconds < 60) {
            el.textContent = "just now";
        } else if (diffSeconds < 3600) {
            el.textContent = Math.floor(diffSeconds / 60) + " mins ago";
        } else if (diffSeconds < 86400) {
            el.textContent = Math.floor(diffSeconds / 3600) + " hrs ago";
        } else {
            el.textContent = diffDays + " day" + (diffDays > 1? "s" : "") + " ago";
        }
    } else {
        el.textContent = publishDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
});

// Smooth scroll for nav links with offset for sticky header
const navLinks = document.querySelectorAll('#main-nav a');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const headerHeight = (header? header.offsetHeight : 0) + (nav? nav.offsetHeight : 0);

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#') && targetId!== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - headerHeight - 10;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Highlight active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 20;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger-btn');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        alert('Menu clicked - connect this to your mobile menu drawer');
    });
}
