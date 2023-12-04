import { readFile } from 'fs/promises';

const dayNumber = 4;
const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile(`src/solutions/2023/day${dayNumber}/input.txt`, 'utf-8'));

    return solveFn(input);
  };

const extractNumbers = (numbers: string) =>
  numbers.trim().replace(/\s\s+/g, ' ').split(' ').map(Number);

const calculateLinePoints = (cardNumbers: number[], winningNumbers: number[]) =>
  cardNumbers.reduce(
    (total, num) =>
      winningNumbers.includes(num)
        ? total > 0
          ? total * 2
          : total + 1
        : total,
    0,
  );

const getFirstPartAnswer = async (input: string) => {
  const lines = input.split('\n');

  return lines.reduce((acc, line) => {
    const [, numbersString] = line.split(':');
    const [winningNumbersString, cardNumbersString] = numbersString.split('|');
    const winningNumbers = extractNumbers(winningNumbersString);
    const cardNumbers = extractNumbers(cardNumbersString);
    return acc + calculateLinePoints(cardNumbers, winningNumbers);
  }, 0);
};

const calculateSecondPartLineAnswer = (
  lines: string[],
  line: string,
  index: number,
) => {
  const [, numbersString] = line.split(':');
  const [winningNumbersString, cardNumbersString] = numbersString.split('|');

  const winningNumbers = extractNumbers(winningNumbersString);
  const cardNumbers = extractNumbers(cardNumbersString);

  const linePoints = cardNumbers.filter((currentNumber) =>
    winningNumbers.includes(currentNumber),
  ).length;

  const recursiveLinePoints: number = Array.from(
    { length: linePoints },
    (_, i) => i + 1,
  ).reduce(
    (accumulator: number, current: number): number =>
      accumulator +
      calculateSecondPartLineAnswer(
        lines,
        lines[index + current],
        index + current,
      ),
    0,
  );
  return linePoints + recursiveLinePoints;
};

const getSecondPartAnswer = async (input: string) => {
  const lines = input.split('\n');

  return lines.reduce((acc, line, index) => {
    const result = calculateSecondPartLineAnswer(lines, line, index);
    return acc + result;
  }, lines.length);
};

const solveFirstPart = solve(getFirstPartAnswer);
const solveSecondPart = solve(getSecondPartAnswer);

export { solveFirstPart, solveSecondPart };
