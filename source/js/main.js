import { polyfills } from './utils/polyfills';
import burger from './modules/burger-menu';
import { setBrandSlider } from './modules/brands';

// Utils
// ---------------------------------

polyfills();

// Modules
// ----------------------------------

burger();
setBrandSlider();
