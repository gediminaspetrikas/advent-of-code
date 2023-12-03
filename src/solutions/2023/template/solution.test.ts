import { solveFirstPart, solveSecondPart } from './solution';

const input = `1`;

describe('dayX', () => {
  describe('first part', () => {
    it('returns correct answer', async () => {
      const result = await solveFirstPart(input);
      expect(result).toBe(0);
    });
  });
  describe('second part', () => {
    it('returns correct answer', async () => {
      const result = await solveSecondPart(input);
      expect(result).toBe(0);
    });
  });
});
