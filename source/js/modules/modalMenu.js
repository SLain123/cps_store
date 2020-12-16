const modalMenu = () => {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');

    const burgerMenu = document.querySelector('.menu');
    const openBurgerBtn = document.querySelector('.header__open-burger-btn');
    const closeBurgerBtn = document.querySelector('.menu__close-burger');

    const modalFeedback = document.querySelector('.main-content__modal-feedback');
    const openFeedbackBtn = document.querySelectorAll('.feedback-btn');
    const closeFeedbackBtn = document.querySelector('.modal__close-feedback');

    const modalCall = document.querySelector('.main-content__modal-call');
    const openCallBtn = document.querySelectorAll('.call-btn');
    const closeCallBtn = document.querySelector('.modal__close-call');

    // Функция высчитывает отступ равный скроллу браузера;

    const findPadding = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    const openMenu = (windowBlock, openClassName, finishClassName) => {
        windowBlock.classList.remove(finishClassName);
        windowBlock.classList.add(openClassName);
    };

    const closeMenu = (windowBlock, openClassName, closeClassName, finishClassName) => {
        windowBlock.classList.remove(openClassName);
        windowBlock.classList.add(closeClassName);
        setTimeout(() => {
            windowBlock.classList.add(finishClassName);
            windowBlock.classList.remove(closeClassName);
        }, 350);
    };

    const activeOverlay = () => {
        overlay.classList.add('overlay_active');
        body.style.paddingRight = `${findPadding()}px`;
        body.classList.add('no-scroll');
    }

    const deActiveOverlay = () => {
        overlay.classList.remove('overlay_active');
        body.style.paddingRight = '0px';
        body.classList.remove('no-scroll');
    }

    // Menu events;

    openBurgerBtn.addEventListener('click', () => {
        openMenu(burgerMenu, 'menu_open', 'menu_active_false');
        activeOverlay();
    });

    closeBurgerBtn.addEventListener('click', () => {
        closeMenu(burgerMenu, 'menu_open', 'menu_close', 'menu_active_false');
        deActiveOverlay();
    });

    // Feedback events;

    for(let btn of openFeedbackBtn) {
        btn.addEventListener('click', () => {
            openMenu(modalFeedback, 'modal_open', 'modal_active_false');
            activeOverlay();
            if(document.documentElement.clientWidth < 1366) {
                closeMenu(burgerMenu, 'menu_open', 'menu_close', 'menu_active_false');
            }      
        });
    }
    
    closeFeedbackBtn.addEventListener('click', () => {
        closeMenu(modalFeedback, 'modal_open', 'modal_close', 'modal_active_false');
        deActiveOverlay();
    });

    // Call events;

    for(let btn of openCallBtn) {
        btn.addEventListener('click', () => {
            openMenu(modalCall, 'modal_open', 'modal_active_false');
            activeOverlay();
            if(document.documentElement.clientWidth < 1366) {
                closeMenu(burgerMenu, 'menu_open', 'menu_close', 'menu_active_false');
            }      
        });
    }
    
    closeCallBtn.addEventListener('click', () => {
        closeMenu(modalCall, 'modal_open', 'modal_close', 'modal_active_false');
        deActiveOverlay();
    });

    // Overlay events;

    overlay.addEventListener('click', () => {
        if(document.documentElement.clientWidth < 1366) {
            closeMenu(burgerMenu, 'menu_open', 'menu_close', 'menu_active_false');
        }
        closeMenu(modalFeedback, 'modal_open', 'modal_close', 'modal_active_false');
        closeMenu(modalCall, 'modal_open', 'modal_close', 'modal_active_false');
        deActiveOverlay();
    })

    // Resize event

    window.addEventListener('resize', () => {
        if(document.documentElement.clientWidth < 1366) {
            closeMenu(burgerMenu, 'menu_open', 'menu_close', 'menu_active_false');
        }
        closeMenu(modalFeedback, 'modal_open', 'modal_close', 'modal_active_false');
        closeMenu(modalCall, 'modal_open', 'modal_close', 'modal_active_false');
        deActiveOverlay();
    })
};

export default modalMenu;
