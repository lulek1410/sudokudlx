export default class SudokuToOptionsMatrixConverter {
  static createOptionsMatrix(sudokuGrid) {
    const matrix = [];
    for (let row = 0; row < 9; ++row) {
      for (let col = 0; col < 9; ++col) {
        const number = sudokuGrid[row][col];
        if (number) {
          matrix.push(this.#createOption(row, col, number));
        } else {
          for (let number = 1; number <= 9; ++number) {
            matrix.push(this.#createOption(row, col, number));
          }
        }
      }
    }
    return matrix;
  }

  static #createOption(row, col, number) {
    const baseSize = 81;
    const option = Array(baseSize * 4).fill(0);
    const numIndex = number - 1;
    option[row * 9 + col] = 1;
    option[baseSize + row * 9 + numIndex] = 1;
    option[baseSize * 2 + col * 9 + numIndex] = 1;
    option[
      baseSize * 3 +
        Math.floor(row / 3) * 27 +
        Math.floor(col / 3) * 9 +
        numIndex
    ] = 1;
    return option;
  }
}
