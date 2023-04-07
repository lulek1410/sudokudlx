export function convertSolutionToSudoku(optionsMatrix, solution) {
  const chosenOptions = [];
  for (const index of solution) {
    chosenOptions.push(optionsMatrix[index]);
  }
  const resultMatrix = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );
  const baseSize = 81;
  for (const element of chosenOptions) {
    const position = element.slice(0, baseSize);
    const rows = element.slice(baseSize, baseSize * 2);
    position.forEach((value, posIndex) => {
      if (value) {
        let row = Math.floor(posIndex / 9);
        let col = posIndex % 9;
        let numbers = rows.slice(row * 9, (row + 1) * 9);
        numbers.forEach((value, numberIndex) => {
          if (value) {
            resultMatrix[row][col] = numberIndex + 1;
          }
        });
      }
    });
  }
  return resultMatrix;
}
