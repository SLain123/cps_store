import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

const setBrandSlider = () => {
    const breakpoint = window.matchMedia(`(max-width:767px)`);
    let brandsSlider;

    const breakpointChecker = () => {
        if (breakpoint.matches) {
            return activateSwiper();
        } else {
            if (brandsSlider) {
                brandsSlider.destroy(true, true);
            }
            return;
        }
    };

    const activateSwiper = () => {
        brandsSlider = new Swiper('.brands__content-block', {
            spaceBetween: 16,
            slidesOffsetBefore: 16,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'brands__bullet',
                bulletActiveClass: 'brands__bullet_active',
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

const displayAllBrandsBtn = document.querySelector('.brands__expand-btn');
const displayAllBrandsText = document.querySelector('.brands__expand-text');
const brandsBlock = document.querySelector('.brands__content-block');

const displayAllBrands = () => {
    if(brandsBlock.classList.contains('brands__expand-btn_expand')) {
        brandsBlock.classList.remove('brands__expand-btn_expand');
        displayAllBrandsText.innerText = 'Показать все';
        displayAllBrandsText.classList.add('arrow-expand__text');
        displayAllBrandsText.classList.remove('arrow-expand__text_arrow_transform');
    }
    else {
        brandsBlock.classList.add('brands__expand-btn_expand');
        displayAllBrandsText.innerText = 'Скрыть';
        displayAllBrandsText.classList.remove('arrow-expand__text');
        displayAllBrandsText.classList.add('arrow-expand__text_arrow_transform');
    }
}

displayAllBrandsBtn.addEventListener('click', () => {
    displayAllBrands();
})

export { setBrandSlider };
