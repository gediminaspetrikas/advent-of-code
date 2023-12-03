import { readFile } from 'fs/promises';
import _ from 'lodash';

const maxCubeCount: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

enum Color {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile('src/solutions/2023/day2/input.txt', 'utf-8'));

    return solveFn(input);
  };

const getFirstPartAnswer = async (input: string) => {
  console.log('first part');
  const lines = input.split('\n');

  const answer = lines.reduce((acc, line) => {
    const [gameNumberString, gameData] = line.split(':');
    const gameNumber = parseInt(gameNumberString.match(/Game (\d+)/)![1]);

    const isPossible = gameData.split(';').every((game) => {
      const cubes = game.match(/(\d+) (\w+)/g)!.map((cube) => {
        const [count, color] = cube.split(' ');
        return { count: parseInt(count), color };
      });

      return cubes.every((cube) => cube.count <= maxCubeCount[cube.color]);
    });
    return isPossible ? acc + gameNumber : acc;
  }, 0);

  return answer;
};

const getSecondPartAnswer = async (input: string) => {
  console.log('second part');
  const lines = input.split('\n');

  const answer = lines.reduce((acc, line) => {
    const [, gameData] = line.split(':');

    const maxCubeCount = gameData.split(';').reduce(
      (acc, draw) => {
        const cubes: { color: Color; count: number }[] = draw
          .match(/(\d+) (\w+)/g)!
          .map((cube) => {
            const [count, color] = cube.split(' ');
            return { count: parseInt(count), color: color as Color };
          });

        const getMax = (accColor: number, color: Color): number =>
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
