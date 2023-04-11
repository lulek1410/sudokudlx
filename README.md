[![CircleCI](https://circleci.com/gh/taylorjg/dlxlibjs.svg?style=svg)](https://circleci.com/gh/taylorjg/dlxlibjs)

## Description

This is a JavaScript library implementing Donald E. Knuth's Algorithm X utilising the Dencing Links technique (DLX). Library also contains functionality to use the algorithm to solve sudoku represented as 2D array of numbers in place corresponding to it's coordinates int the sudoku board.

- [Knuth's Algorithm X (Wikipedia)](http://en.wikipedia.org/wiki/Algorithm_X "Knuth's Algorithm X (Wikipedia)")
- [Dancing Links (Wikipedia)](http://en.wikipedia.org/wiki/Dancing_Links "Dancing Links (Wikipedia)")
- [Exact cover (Wikipedia)](http://en.wikipedia.org/wiki/Exact_cover "Exact cover (Wikipedia)")

## Examples

> **NOTE:** This examples pertains to the [@lulek1410/sudokudlx](https://www.npmjs.com/package/@lulek1410/sudokudlx) release of dlxlib.

### Solving exact cover problem

```
import { Dlx } from "@lulek1410/sudokudlx"

const matrix = [
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 1],
  [0, 0, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1]
]

const dlx = new Dlx()
const solution = dlx.solve(matrix)

// solution = [1, 3, 5]
```

### Solving sudoku

```
import { Dlx } from "@lulek1410/sudokudlx"
import { SudokuToOptionsMatrixConverter } from "@lulek1410/sudokudlx"
import { convertSolutionToSudoku } from "@lulek1410/sudokudlx"

const sudoku = [
  [4, 0, 0, 0, 0, 5, 0, 0, 7],
  [9, 0, 0, 3, 0, 0, 0, 0, 2],
  [0, 7, 0, 0, 0, 9, 0, 3, 5],
  [1, 0, 6, 0, 3, 0, 8, 0, 0],
  [0, 9, 0, 6, 0, 0, 5, 4, 1],
  [0, 0, 0, 0, 0, 8, 0, 2, 0],
  [7, 6, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 5, 0, 0, 0, 3],
  [3, 1, 0, 0, 0, 6, 0, 5, 8],
];

const matrix = SudokuToOptionsMatrixConverter.createOptionsMatrix(sudoku);
const solutions = new Dlx().solve(matrix, 2);
const solvedSudoku = convertSolutionToSudoku(matrix, solutions[0]);

//solutions = [
//  [
//      0,  37,  56,  57,  76, 113, 123, 151, 161, 162, 163, 173,
//    183, 193, 221, 231, 250, 251, 211, 252, 298, 308, 200, 318,
//    319, 374, 411, 439, 314, 301, 257, 265, 165, 187, 178, 277,
//    440, 219, 224, 376, 119, 441, 391,   3,  62, 469, 479, 480,
//    349, 324, 242, 238,  92, 412,  67,  11, 131,  19, 288, 289,
//    152, 365, 336,  98,  33,  46,  54,  84, 109, 357, 346, 438,
//    396, 408, 426, 450, 476, 134, 145, 454, 461
//  ],
//  [
//      0,  37,  56,  57,  76, 113, 123, 151, 161, 162, 163, 173,
//    183, 193, 221, 231, 250, 251, 211, 252, 298, 308, 200, 318,
//    319, 374, 411, 439, 314, 301, 257, 265, 165, 187, 178, 277,
//    440, 219, 224, 376, 119, 441, 391,   3,  62, 469, 479, 480,
//    349, 324, 242, 238,  92, 412,  67,  11, 131,  19, 288, 289,
//    152, 365, 336,  98,  33,  46,  54,  84, 109, 357, 346, 438,
//    396, 408, 426, 450, 476, 136, 143, 452, 463
//  ]
//]
//
//solvedSudoku = [
//  [4, 3, 2, 1, 6, 5, 9, 8, 7],
//  [9, 5, 1, 3, 8, 7, 4, 6, 2],
//  [6, 7, 8, 2, 4, 9, 1, 3, 5],
//  [1, 2, 6, 5, 3, 4, 8, 7, 9],
//  [8, 9, 3, 6, 7, 2, 5, 4, 1],
//  [5, 4, 7, 9, 1, 8, 3, 2, 6],
//  [7, 6, 5, 8, 9, 3, 2, 1, 4],
//  [2, 8, 4, 7, 5, 1, 6, 9, 3],
//  [3, 1, 9, 4, 2, 6, 7, 5, 8]
//];

```
