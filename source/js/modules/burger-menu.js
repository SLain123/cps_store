const burger = () => {
    const header = document.querySelector('.header');
    const burgerMenuBlock = document.querySelector('.menu__block');
    const openBurgerBtn = document.querySelector('.menu__open-btn');
    const openBurgerBtnIcon = document.querySelector('.menu__open-btn-pic');
    const extraMenuBlock = document.querySelector('.header__extramenu');
    const searchBlock = document.querySelector('.header__search');

    openBurgerBtn.addEventListener('click', () => {
        if(!burgerMenuBlock.classList.contains('menu__block_active')) {
            burgerMenuBlock.classList.add('menu__block_active');
            extraMenuBlock.classList.add('header__extramenu_active_false');
            searchBlock.classList.add('header__search_active');       
            header.classList.add('header_with-active-menu');
            openBurgerBtnIcon.src = './img/icon/close-burger.svg';
        } else {
            burgerMenuBlock.classList.remove('menu__block_active');
            extraMenuBlock.classList.remove('header__extramenu_active_false');
            searchBlock.classList.remove('header__search_active');
            header.classList.remove('header_with-active-menu');
            openBurgerBtnIcon.src = './img/icon/burger.svg';
        }
    })
}

export default burger;
