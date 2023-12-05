import { readFile } from 'fs/promises';

const dayNumber = 1;
const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile(`src/solutions/2023/day${dayNumber}/input.txt`, 'utf-8'));

    return solveFn(input);
  };

const getFirstPartAnswer = async (inputString: string) => {
  return 0;
};

const getSecondPartAnswer = async (inputString: string) => {
  return 0;
};

const solveFirstPart = solve(getFirstPartAnswer);
const solveSecondPart = solve(getSecondPartAnswer);

export { solveFirstPart, solveSecondPart };
