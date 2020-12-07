const burger = () => {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    const burgerMenu = document.querySelector('.menu');
    const openBurgerBtn = document.querySelector('.header__open-burger-btn');
    const closeBurgerBtn = document.querySelector('.menu__close-burger');

    // Функция высчитывает отступ равный скроллу браузера

    const findPadding = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    const openMenu = () => {
        body.style.paddingRight = `${findPadding()}px`;
        body.classList.add('no-scroll');
        burgerMenu.classList.remove('menu_active_false');
        burgerMenu.classList.add('menu_open');
        overlay.classList.add('overlay_active');
    }

    const closeMenu = () => {
        burgerMenu.classList.remove('menu_open');
        burgerMenu.classList.add('menu_close');
        setTimeout(() => { 
            body.style.paddingRight = '0px';
            body.classList.remove('no-scroll');
            burgerMenu.classList.add('menu_active_false');
            burgerMenu.classList.remove('menu_close');
            overlay.classList.remove('overlay_active');
        }, 350)
    }

    openBurgerBtn.addEventListener('click', openMenu);

    closeBurgerBtn.addEventListener('click', closeMenu);


}

export default burger;
