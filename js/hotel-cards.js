document.addEventListener('DOMContentLoaded', () => {
    const hotelCards = document.querySelectorAll('.hotel-logo-card');

    hotelCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const details = card.querySelector('.hotel-details');
            details.classList.remove('hidden');
            details.classList.add('visible');
        });

        card.addEventListener('mouseleave', () => {
            const details = card.querySelector('.hotel-details');
            details.classList.remove('visible');
            details.classList.add('hidden');
        });
    });
});