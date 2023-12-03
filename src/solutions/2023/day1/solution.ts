import { readFile } from 'fs/promises';

const readInputFile = async () => {
  return await readFile('src/solutions/2023/day1/input1.txt', 'utf-8');
};

const digitMapping: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function convertToDoubleDigit(lineNumbers: number[]) {
  return lineNumbers.length === 1
    ? Number(`${lineNumbers[0]}${lineNumbers[0]}`)
    : Number(`${lineNumbers[0]}${lineNumbers[lineNumbers.length - 1]}`);
}

const extractFromDigitsAndWords = (line: string): number => {
  const lineNumbers: number[] = [];

  let processedString = line;

  while (processedString !== '') {
    if (Number(processedString[0])) {
      lineNumbers.push(Number(processedString[0]));
      processedString = processedString.slice(1);
      continue;
    }

    let isNumberWord = false;
    for (const [word, value] of Object.entries(digitMapping)) {
      if (processedString.startsWith(word)) {
        isNumberWord = true;
        lineNumbers.push(value);
        processedString = processedString.slice(word.length);
        break;
      }
    }

    if (isNumberWord) {
      continue;
    }

    processedString = processedString.slice(1);
  }
  return convertToDoubleDigit(lineNumbers);
};

const extractFromDigits = (line: string): number => {
  const lineNumbers = line.split('').filter(Number).map(Number);

  if (!lineNumbers.length) {
    return 0;
  }

  return convertToDoubleDigit(lineNumbers);
};

const calculate =
  (extractFn: (line: string) => number) =>
  async (inputString?: string): Promise<number> => {
    const input = inputString || (await readInputFile());

    return input
      .split('\n')
      .map(extractFn)
      .reduce((acc, curr) => acc + curr, 0);
  };

const solveFirstPart = calculate(extractFromDigits);
const solveSecondPart = calculate(extractFromDigitsAndWords);

export { solveFirstPart, solveSecondPart };
