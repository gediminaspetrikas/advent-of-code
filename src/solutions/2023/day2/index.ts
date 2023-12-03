import { solveFirstPart, solveSecondPart } from './solution';

const executeSolution = async () => {
  const firstPartResult = await solveFirstPart();
  console.log(firstPartResult);

  const secondPartResult = await solveSecondPart();
  console.log(secondPartResult);
};

executeSolution();
