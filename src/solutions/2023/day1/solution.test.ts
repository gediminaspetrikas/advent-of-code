import { solveFirstPart, solveSecondPart } from './solution';

const input1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const input2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('day1', () => {
  describe('first part', () => {
    it('returns correct answer', async () => {
      const result = await solveFirstPart(input1);
      expect(result).toBe(142);
    });
  });
  describe('second part', () => {
    it('returns correct answer', async () => {
      const result = await solveSecondPart(input2);
      expect(result).toBe(281);
    });
  });
});
