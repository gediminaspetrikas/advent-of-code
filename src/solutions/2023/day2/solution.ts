import { readFile } from 'fs/promises';

type Cube = {
  count: number;
  color: string;
};

export const maxCubeCount: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export enum Color {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

export const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile('src/solutions/2023/day2/input.txt', 'utf-8'));

    return solveFn(input);
  };

const parseCubes = (game: string): Cube[] =>
  game.match(/(\d+) (\w+)/g)!.map((cube) => {
    const [count, color] = cube.split(' ');
    return { count: parseInt(count), color };
  });

const getFirstPartAnswer = async (input: string) => {
  const lines = input.split('\n');

  const answer = lines.reduce((acc, line) => {
    const [gameNumberString, gameData] = line.split(':');
    const gameNumber = parseInt(gameNumberString.match(/Game (\d+)/)![1]);

    const isPossible = gameData.split(';').every((game) => {
      const cubes = parseCubes(game);
      return cubes.every((cube) => cube.count <= maxCubeCount[cube.color]);
    });
    return isPossible ? acc + gameNumber : acc;
  }, 0);

  return answer;
};

const getSecondPartAnswer = async (input: string) => {
  const lines = input.split('\n');

  const answer = lines.reduce((acc, line) => {
    const [, gameData] = line.split(':');

    const maxCubeCount = gameData.split(';').reduce(
      (acc, draw) => {
        const cubes = parseCubes(draw).map((cube) => ({
          count: cube.count,
          color: cube.color as Color,
        }));

        const getMax = (accColor: number, color: Color) =>
          Math.max(
            accColor,
            cubes.find((cube) => cube.color === color)?.count || 0,
          );

        return {
          red: getMax(acc.red, Color.red),
          green: getMax(acc.green, Color.green),
          blue: getMax(acc.blue, Color.blue),
        };
      },
      { red: 0, green: 0, blue: 0 },
    );

    const power = Object.keys(maxCubeCount).reduce((acc, color) => {
      return maxCubeCount[color as Color]
        ? acc * maxCubeCount[color as Color]
        : acc;
    }, 1);

    return acc + power;
  }, 0);

  return answer;
};

const solveFirstPart = solve(getFirstPartAnswer);
const solveSecondPart = solve(getSecondPartAnswer);

export { solveFirstPart, solveSecondPart };
