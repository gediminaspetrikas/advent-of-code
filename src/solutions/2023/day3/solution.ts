import { readFile } from 'fs/promises';
import _ from 'lodash';

const dayNumber = 3;
const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile(`src/solutions/2023/day${dayNumber}/input.txt`, 'utf-8'));

    return solveFn(input);
  };

const symbolRegex = /[^\d\s.]+/g;
const numbersRegex = /\d+/g;
const gearsRegex = /[*]/g;

const getAdjacentValue = (
  line: string,
  targetStartIndex: number,
  targetEndIndex: number,
  regex: RegExp,
) => {
  if (!line) {
    return;
  }

  const symbols = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    symbols.push({
      value: match[0],
      startIndex: match.index,
    });
  }
  if (symbols) {
    const adjacentSymbols = symbols.filter(
      ({ startIndex }) =>
        startIndex >= targetStartIndex - 1 && startIndex <= targetEndIndex + 1,
    );

    if (adjacentSymbols.length > 0) {
      return adjacentSymbols[0];
    }
  }

  return null;
};

const getFirstPartAnswer = async (input: string) => {
  const lines = input.split('\n');

  const answer = lines.reduce((acc, line, index) => {
    const numbers = [];
    let match;
    while ((match = numbersRegex.exec(line)) !== null) {
      numbers.push({
        value: match[0],
        startIndex: match.index,
      });
    }

    const numbersAdjacentToSymbols = numbers.filter(({ value, startIndex }) => {
      const endIndex = startIndex + value.toString().length - 1;

      if (getAdjacentValue(line, startIndex, endIndex, symbolRegex)) {
        return true;
      }
      if (
        index > 0 &&
        getAdjacentValue(lines[index - 1], startIndex, endIndex, symbolRegex)
      ) {
        return true;
      }
      if (
        index < lines.length - 1 &&
        getAdjacentValue(lines[index + 1], startIndex, endIndex, symbolRegex)
      ) {
        return true;
      }
    });

    return (
      acc + _.sumBy(numbersAdjacentToSymbols, ({ value }) => parseInt(value))
    );
  }, 0);
  return answer;
};

const getAdjacentParts = (
  line: string,
  targetStartIndex: number,
  targetEndIndex: number,
  regex: RegExp,
) => {
  if (!line) {
    return;
  }

  const parts = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    parts.push({
      value: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length - 1,
    });
  }
  if (parts) {
    const adjacentSymbols = parts.filter(({ startIndex, value, endIndex }) => {
      return (
        startIndex - 1 <= targetStartIndex && endIndex + 1 >= targetEndIndex
      );
    });

    if (adjacentSymbols.length > 0) {
      return adjacentSymbols;
    }
  }

  return null;
};

const getSecondPartAnswer = async (input: string) => {
  const lines = input.split('\n');

  const answer = lines.reduce((acc, line, index) => {
    const symbols = [];
    let match;
    while ((match = gearsRegex.exec(line)) !== null) {
      symbols.push({
        value: match[0],
        startIndex: match.index,
      });
    }

    const numbersAdjacentToSymbols = symbols.map(
      ({
        value,
        startIndex,
      }): {
        value: string;
        startIndex: number;
        endIndex: number;
      }[] => {
        const endIndex = startIndex + value.toString().length - 1;

        const adjacentPartsToGears = [
          line,
          lines[index - 1],
          lines[index + 1],
        ].map((l) => getAdjacentParts(l, startIndex, endIndex, numbersRegex));

        const parts = _(adjacentPartsToGears)
          .filter((p) => p !== undefined && p !== null)
          .flatten()
          .value() as {
          value: string;
          startIndex: number;
          endIndex: number;
        }[];

        if (parts.length !== 2) {
          return [];
        }

        return parts;
      },
    );

    numbersAdjacentToSymbols.forEach((parts) => {
      if (parts.length === 2) {
        acc += Number(parts[0].value) * Number(parts[1].value);
      }
    });

    return acc;
  }, 0);
  return answer;
};

const solveFirstPart = solve(getFirstPartAnswer);
const solveSecondPart = solve(getSecondPartAnswer);

export { solveFirstPart, solveSecondPart };
