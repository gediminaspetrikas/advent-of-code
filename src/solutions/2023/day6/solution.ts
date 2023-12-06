import { readFile } from 'fs/promises';

const dayNumber = 6;
const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile(`src/solutions/2023/day${dayNumber}/input.txt`, 'utf-8'));

    return solveFn(input);
  };

interface Race {
  time: number;
  distance: number;
}

const calculateWinningWays = (race: Race): number => {
  let winningWays = 0;
  for (let pressTime = 0; pressTime < race.time; pressTime++) {
    const travelTime = race.time - pressTime;
    const distance = pressTime * travelTime;
    if (distance > race.distance) {
      winningWays++;
    }
  }
  return winningWays;
};

const getFirstPartAnswer = async (inputString: string) => {
  const lines = inputString.split('\n').filter(Boolean);
  const time = lines[0].split(/\s+/).slice(1).map(Number);
  const distance = lines[1].split(/\s+/).slice(1).map(Number);

  const races: Race[] = time.map((t, i) => ({
    time: t,
    distance: distance[i],
  }));

  return races.map(calculateWinningWays).reduce((prev, curr) => prev * curr, 1);
};

const getSecondPartAnswer = async (inputString: string) => {
  const lines = inputString
    .split('\n')
    .map((line) => line.split(/\s+/).slice(1).join(''));
  const time = parseInt(lines[0]);
  const distance = parseInt(lines[1]);
  return calculateWinningWays({ time, distance });
};

const solveFirstPart = solve(getFirstPartAnswer);
const solveSecondPart = solve(getSecondPartAnswer);

export { solveFirstPart, solveSecondPart };
