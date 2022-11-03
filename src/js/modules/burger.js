const burger = (menuSelector, burgerSelector) => {
    const menuElement = document.querySelector(menuSelector),
          burgerElement = document.querySelector(burgerSelector);

    //   Скрыли меню
    menuElement.style.display = 'none';

    // Отслеживание действий на бургере
        burgerElement.addEventListener('click', () => {
            if (menuElement.style.display == 'none' && window.screen.availWidth < 993) {
                menuElement.style.display = 'block';
            } else {
                menuElement.style.display = 'none';
            }
        });
    
    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElement.style.display = 'none';
        }
    });
};

export default burger;