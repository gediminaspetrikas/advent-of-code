import { solveFirstPart, solveSecondPart } from './solution';

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe('day3', () => {
  describe('first part', () => {
    it('returns correct answer', async () => {
      const result = await solveFirstPart(input);
      expect(result).toBe(4361);
    });
  });
  describe('second part', () => {
    it('returns correct answer', async () => {
      const result = await solveSecondPart(input);
      expect(result).toBe(467835);
    });
  });
});
