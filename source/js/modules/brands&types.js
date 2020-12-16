import Swiper, { Pagination } from 'swiper';

const displayAllInfoBtn = document.querySelector('#info-exp-btn');
const displayAllInfoText = document.querySelector('#info-exp-text');
const displayAllBrandsBtn = document.querySelector('#brands-exp-btn');
const displayAllBrandsText = document.querySelector('#brands-exp-text');
const displayAllTypesBtn = document.querySelector('#types-exp-btn');
const displayAlltypesText = document.querySelector('#types-exp-text');
const infoBlock = document.querySelector('#info-content');
const brandsBlock = document.querySelector('#brands-content');
const typesBlock = document.querySelector('#types-content');

const expandBlock = (parentBlock, textBlock, className, openText = 'Показать все', closeText = 'Скрыть') => {
    if (parentBlock.classList.contains(className)) {
        parentBlock.classList.remove(className);
        textBlock.innerText = openText;
        textBlock.classList.add('arrow-expand__text');
        textBlock.classList.remove(
            'arrow-expand__text_arrow_transform',
        );
    } else {
        parentBlock.classList.add(className);
        textBlock.innerText = closeText;
        textBlock.classList.remove('arrow-expand__text');
        textBlock.classList.add(
            'arrow-expand__text_arrow_transform',
        );
    }
};

// Events;

displayAllInfoBtn.addEventListener('click', () => {
    expandBlock(infoBlock, displayAllInfoText, 'info__text_expand', 'Читать далее');
})

displayAllBrandsBtn.addEventListener('click', () => {
    expandBlock(brandsBlock, displayAllBrandsText, 'card__expand-btn_expand');
});

displayAllTypesBtn.addEventListener('click', () => {
    expandBlock(typesBlock, displayAlltypesText, 'card__expand-btn_expand_wide');
});

// Swiper;

Swiper.use([Pagination]);

const brandTypeSlider = () => {
    const breakpoint = window.matchMedia(`(max-width:767px)`);
    let brandsSlider;

    const breakpointChecker = () => {
        if (breakpoint.matches) {
            return activateSwiper();
        } else {
            if (brandsSlider) {
                brandsSlider.forEach(slider => slider.destroy(true, true));
            }
            return;
        }
    };

    const activateSwiper = () => {
        brandsSlider = new Swiper('.card__content-block', {
            spaceBetween: 16,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'card__bullet',
                bulletActiveClass: 'card__bullet_active',
            },

            breakpoints: {
                320: {
                    slidesPerView: 1,
                    width: 240,
                },
                480: {
                    width: 224,
                },
            },
        });
    };

    breakpoint.addEventListener('change', () => breakpointChecker());
    breakpointChecker();
};

export default brandTypeSlider;
