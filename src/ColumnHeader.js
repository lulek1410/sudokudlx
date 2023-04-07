import Node from "./Node.js";

export default class ColumnHeader extends Node {
  static numOfColumns = 0;

  constructor() {
    super(null, -1);
    this.previousColumn = this;
    this.nextColumn = this;
    this.numberOfRows = 0;
  }

  appendHeaderColumn(newColumn) {
    this.numOfColumns++;
    this.previousColumn.nextColumn = newColumn;
    newColumn.previousColumn = this.previousColumn;
    newColumn.nextColumn = this;
    this.previousColumn = newColumn;
  }

  unlinkHeaderColumn() {
    this.numOfColumns--;
    this.nextColumn.previousColumn = this.previousColumn;
    this.previousColumn.nextColumn = this.nextColumn;
  }

  relinkHeaderColumn() {
    this.numOfColumns++;
    this.nextColumn.previousColumn = this;
    this.previousColumn.nextColumn = this;
  }

  addNode(node) {
    this.appendToColumn(node);
    this.numberOfRows++;
  }

  unlinkNode(node) {
    node.unlinkFromColumn();
    this.numberOfRows--;
  }

  relinkNode(node) {
    node.relinkToColumn();
    this.numberOfRows++;
  }
}
