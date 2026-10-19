import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const PRIMARY_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export const AppPreset = definePreset(Aura, {
  semantic: {
    primary: Object.fromEntries(
      PRIMARY_SHADES.map((shade) => [shade, `var(--color-primary-${shade})`])
    )
  }
});
