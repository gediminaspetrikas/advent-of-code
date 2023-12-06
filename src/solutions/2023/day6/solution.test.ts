import { solveFirstPart, solveSecondPart } from './solution';

const input = `Time:      7  15   30
Distance:  9  40  200`;

describe('day6', () => {
  describe('first part', () => {
    it('returns correct answer', async () => {
      const result = await solveFirstPart(input);
      expect(result).toBe(288);
    });
  });
  describe('second part', () => {
    it('returns correct answer', async () => {
      const result = await solveSecondPart(input);
      expect(result).toBe(71503);
    });
  });
});
