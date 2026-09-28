import { compactNumber, seriesColors } from './chart-theme';

describe('chart-theme', () => {
  describe('compactNumber', () => {
    it('leaves values under a thousand as they are', () => {
      expect(compactNumber(0)).toBe('0');
      expect(compactNumber(999)).toBe('999');
    });

    it('keeps one decimal for thousands under ten thousand', () => {
      expect(compactNumber(1500)).toBe('1.5k');
      expect(compactNumber(9999)).toBe('10.0k');
    });

    it('drops the decimal from ten thousand up', () => {
      expect(compactNumber(93438)).toBe('93k');
    });

    it('uses M for millions', () => {
      expect(compactNumber(2_500_000)).toBe('2.5M');
    });

    it('keeps the sign of negative values', () => {
      expect(compactNumber(-1500)).toBe('-1.5k');
      expect(compactNumber(-2_500_000)).toBe('-2.5M');
    });
  });

  describe('seriesColors', () => {
    it('returns one colour per requested series', () => {
      expect(seriesColors(4).length).toBe(4);
      expect(seriesColors(0)).toEqual([]);
    });
  });
});
