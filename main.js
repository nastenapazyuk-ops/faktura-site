// ===== СКРИПТ ТОЛЬКО ДЛЯ ГЛАВНОЙ СТРАНИЦЫ =====

// Проверяем, есть ли на странице секции с id (только на главной)
const hasSections = document.querySelectorAll('section[id]').length > 0;

if (hasSections) {
    // Плавная прокрутка только для главной
    document.querySelectorAll('nav a[href^="#"], .btn[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Подсветка активного пункта меню только на главной
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        let current = '';
        
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.style.color = '#6b3a1f';
                link.style.borderBottom = '2px solid #6b3a1f';
                link.style.paddingBottom = '4px';
            } else if (href && href.startsWith('#')) {
                link.style.color = '#2c1810';
                link.style.borderBottom = 'none';
                link.style.paddingBottom = '0';
            }
        });
    });
}