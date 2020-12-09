import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

const setBrandSlider = () => {
    const breakpoint = window.matchMedia(`(max-width:768px)`);
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

export default setBrandSlider;
