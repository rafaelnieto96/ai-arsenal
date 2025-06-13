document.addEventListener('DOMContentLoaded', function () {
    const toolCards = document.querySelectorAll('.tool-card');

    // Entry animation
    toolCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Hover and click effects
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.classList.add('interacted');
        });

        card.addEventListener('click', function () {
            const toolName = this.querySelector('h3').textContent;
            console.log(`Tool selected: ${toolName}`);

            // Visual click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.03)';
            }, 150);

            // Redirects
            if (toolName === 'Translate Engine') {
                window.location.href = 'https://translateengine.pythonanywhere.com/';
            } else if (toolName === 'Legal Guardian') {
                window.location.href = 'https://legalguardian2.pythonanywhere.com/';
            } else if (toolName === 'Text Forge') {
                window.location.href = 'https://textforge.pythonanywhere.com/';
            } else if (toolName === 'Brief Engine') {
                window.location.href = 'https://briefengine.pythonanywhere.com/';
            } else if (toolName === 'Code Alchemist') {
                window.location.href = 'https://codealchemist.pythonanywhere.com/';
            } else if (toolName === 'Data Nexus') {
                window.location.href = 'https://datanexus.pythonanywhere.com/';
            } else if (toolName === 'Deep Vision') {
                window.location.href = 'https://deepvision.pythonanywhere.com/';
            }
        });
    });
});