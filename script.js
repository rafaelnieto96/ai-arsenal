// script.js
document.addEventListener('DOMContentLoaded', function () {
    const toolCards = document.querySelectorAll('.tool-card');

    // Animación de entrada
    toolCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Efecto hover y click en las tarjetas
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.background = 'rgba(25, 35, 70, 0.8)';
            this.style.borderColor = 'rgba(20, 200, 255, 0.5)';
            this.style.boxShadow = '0 15px 40px rgba(0, 150, 255, 0.3), 0 0 20px rgba(0, 200, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(15, 25, 50, 0.75)';
            this.style.borderColor = 'rgba(20, 200, 255, 0.25)';
            this.style.boxShadow = '0 8px 32px rgba(0, 100, 255, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.05)';
        });

        card.addEventListener('click', function () {
            const toolName = this.querySelector('h3').textContent;
            console.log(`Herramienta seleccionada: ${toolName}`);

            // Efecto visual al hacer clic
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.03)';
            }, 150);

            // Aquí puedes agregar código para abrir cada herramienta
        });
    });

});