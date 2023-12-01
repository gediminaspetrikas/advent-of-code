import axios from 'axios';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs-extra';
import * as dotenv from 'dotenv';
import htmlToMd from 'html-to-md';
import * as cheerio from 'cheerio';

dotenv.config();

interface Arguments {
  day: number;
}

const argv = yargs(hideBin(process.argv))
  .option('day', {
    alias: 'd',
    description: 'Specify the day',
    type: 'number',
  })
  .help()
  .alias('help', 'h').argv as Arguments;

const day = argv.day; // The day of the problem from the first command line argument
const year = 2023; // The year of the problem
const sessionCookie = process.env.SESSION_COOKIE as string;

const fetchProblem = async () => {
  const response = await axios.get(
    `https://adventofcode.com/${year}/day/${day}`,
    {
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    },
  );

  const $ = cheerio.load(response.data);
  const problemHtml = $('article.day-desc').html() || '';
  return htmlToMd(problemHtml);
};

const fetchInput = async () => {
  const response = await axios.get(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    },
  );

  return response.data;
};

const main = async () => {
  const problem = await fetchProblem();
  const input = await fetchInput();

  const dayPath = `./src/solutions/2023/day${day}`;
  await fs.copy('./src/solutions/2023/template', dayPath);

  await fs.writeFile(`${dayPath}/README.md`, problem);
  await fs.writeFile(`${dayPath}/input.txt`, input);
};

main().catch(console.error);
