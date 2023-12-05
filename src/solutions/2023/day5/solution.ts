import { readFile } from 'fs/promises';
import _ from 'lodash';

const dayNumber = 5;
const solve =
  (solveFn: (input: string) => Promise<number>) =>
  async (inputString?: string): Promise<number> => {
    const input =
      inputString ||
      (await readFile(`src/solutions/2023/day${dayNumber}/input.txt`, 'utf-8'));

    return solveFn(input);
  };

interface MappingRange {
  start: number;
  sourceStart: number;
  length: number;
}

const createMappingRanges = (str: string) => {
  return str
    .split('\n')
    .map((line) => line.split(' ').map(Number))
    .map(([start, sourceStart, length]) => ({ start, sourceStart, length }));
};

const mapValueThroughRanges = (source: number, ranges: MappingRange[]) => {
  for (const range of ranges) {
    if (
      source >= range.sourceStart &&
      source < range.sourceStart + range.length
    ) {
      return range.start + (source - range.sourceStart);
    }
  }
  return source;
};

interface SeedRange {
  start: number;
  length: number;
}

const createSeedRanges = (str: string): SeedRange[] => {
  const seedValuePairs = str.split(' ').map(Number);
  const seedRanges: SeedRange[] = [];

  for (let i = 0; i < seedValuePairs.length; i += 2) {
    seedRanges.push({
      start: seedValuePairs[i],
      length: seedValuePairs[i + 1],
    });
  }

  return seedRanges;
};

function* generateSeedsFromRanges(seedRanges: SeedRange[]): Iterable<number> {
  for (const seedRange of seedRanges) {
    for (let i = 0; i < seedRange.length; i++) {
      yield seedRange.start + i;
    }
  }
}

interface MappingRange {
  start: number;
  sourceStart: number;
  length: number;
}

const getFirstPartAnswer = async (inputString: string) => {
  const inputParts = inputString.split('\n\n');

  const seeds = inputParts[0].split(': ')[1].split(' ').map(Number);

  const ranges = inputParts
    .slice(1)
    .map((part) => part.split(':\n')[1])
    .map(createMappingRanges);

  const transformedSeeds = seeds.map((seed) => {
    return ranges.reduce((source, range) => {
      return mapValueThroughRanges(source, range);
    }, seed);
  });

  return _.min(transformedSeeds) ?? 0;
};

const getSecondPartAnswer = async (inputString: string) => {
  const inputParts = inputString.split('\n\n');

  const seedRanges = createSeedRanges(inputParts[0].split(': ')[1]);
  const seedGenerator = generateSeedsFromRanges(seedRanges);

  const ranges = inputParts
    .slice(1)
    .map((part) => part.split(':\n')[1])
    .map(createMappingRanges);

  let minValue = Number.MAX_SAFE_INTEGER;

  for (const seed of seedGenerator) {
    const transformedSeed = ranges.reduce((source, range) => {
      return mapValueThroughRanges(source, range);
    }, seed);

    minValue = Math.min(minValue, transformedSeed);
  }

  return minValue;
};

const solveFirstPart = solve(getFirstPartAnswer);
const solveSecondPart = solve(getSecondPartAnswer);

export { solveFirstPart, solveSecondPart };
