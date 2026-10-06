import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6fbfd',
      100: '#ccf7fa',
      200: '#99eff4',
      300: '#66e7ee',
      400: '#33dfe5',
      500: '#03c9d7',
      600: '#03b5c1',
      700: '#029ca8',
      800: '#02838f',
      900: '#016a76',
      950: '#01454e'
    }
  }
});
