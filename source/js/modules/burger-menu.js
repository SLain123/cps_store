const burger = () => {
    const burgerMenu = document.querySelector('.menu');
    const openBurgerBtn = document.querySelector('.header__open-burger-btn');
    const closeBurgerBtn = document.querySelector('.menu__close-burger');

    openBurgerBtn.addEventListener('click', () => {
        burgerMenu.classList.remove('menu_active_false');
        burgerMenu.classList.add('menu_open');
    })

    closeBurgerBtn.addEventListener('click', () => {
        burgerMenu.classList.remove('menu_open');
        burgerMenu.classList.add('menu_close');
        setTimeout(() => { 
            burgerMenu.classList.add('menu_active_false');
            burgerMenu.classList.remove('menu_close')
        }, 350)
    })
}

export default burger;
