export const reverseString = (input: string) => {
  const characters = input.split("");

  const reversed = characters.slice(0, -1).reverse();

  const lastChart = input.charAt(input.length - 1);

  const result = reversed.join("") + lastChart;

  return result;
};

export const longest = (input: string) => {
  const sentences = input.split(" ");
  let longestWord = "";

  sentences.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return longestWord;
};

export const countWords = (inputArray: string[], queryArray: string[]) => {
  const wordCount: number[] = [];
  const inputMap: Map<string, number> = new Map();

  inputArray.forEach((word) => {
    if (inputMap.has(word)) {
      inputMap.set(word, inputMap.get(word)! + 1);
    } else {
      inputMap.set(word, 1);
    }
  });

  queryArray.forEach((query) => {
    if (inputMap.has(query)) {
      wordCount.push(inputMap.get(query)!);
    } else {
      wordCount.push(0);
    }
  });

  return wordCount;
};

export const diagonalSum = (matrix: number[][]) => {
  const firstDiagonal: number[] = [];
  const secondDiagonal: number[] = [];

  let firstDiagonalSum: number = 0;
  let secondDiagonalSum: number = 0;

  for (let i = 0; i < matrix.length; i++) {
    firstDiagonal.push(matrix[i][i]);
    secondDiagonal.push(matrix[i][matrix.length - 1 - i]);
  }

  firstDiagonalSum = firstDiagonal.reduce((acc, curr) => acc + curr, 0);
  secondDiagonalSum = secondDiagonal.reduce((acc, curr) => acc + curr, 0);

  const sum = Math.abs(firstDiagonalSum - secondDiagonalSum);

  return sum;
};
