import buildInternalStructure from "./InternalStructureBuilder.js";

export default class Dlx {
  solve(matrix, numOfSolutions = Number.MAX_SAFE_INTEGER) {
    let root = buildInternalStructure(matrix);
    let searchFn = this.#search(root);
    let solutions = [];
    for (let index = 0; index < numOfSolutions; index++) {
      const iteratorResult = searchFn.next();
      if (iteratorResult.done) break;
      solutions.push(iteratorResult.value);
    }
    return solutions;
  }

  *#search(root) {
    if (root.nextColumn === root) {
      if (this.#currentSolution.length) {
        yield this.#currentSolution.slice();
      }
      return;
    }

    const columnHeader = this.#getColumnWithLeastRows(root);
    this.#coverColumn(columnHeader);
    for (let row = columnHeader.down; row != columnHeader; row = row.down) {
      this.#currentSolution.push(row.rowIndex);
      for (let rowNode = row.right; rowNode !== row; rowNode = rowNode.right) {
        this.#coverColumn(rowNode.columnHeader);
      }
      yield* this.#search(root);
      for (let rowNode = row.left; rowNode !== row; rowNode = rowNode.left) {
        this.#uncoverColumn(rowNode.columnHeader);
      }
      this.#currentSolution.pop();
    }
    this.#uncoverColumn(columnHeader);
  }

  #getColumnWithLeastRows(root) {
    let result = null;
    for (let col = root.nextColumn; col !== root; col = col.nextColumn) {
      if (!result || result.numberOfRows > col.numberOfRows) {
        result = col;
      }
    }
    return result;
  }

  #coverColumn(column) {
    column.unlinkHeaderColumn();
    column.loop("down", (row) => {
      row.loop("right", (rowNode) => {
        rowNode.columnHeader.unlinkNode(rowNode);
        if (!rowNode.columnHeader.numberOfRows) {
          rowNode.columnHeader.unlinkHeaderColumn();
        }
      });
    });
  }

  #uncoverColumn(column) {
    column.loop("up", (row) => {
      row.loop("left", (rowNode) => {
        rowNode.columnHeader.relinkNode(rowNode);
        if (!rowNode.columnHeader.numberOfRows) {
          rowNode.columnHeader.relinkHeaderColumn();
        }
      });
    });
    column.relinkHeaderColumn();
  }

  #currentSolution = [];
}
