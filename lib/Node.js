export default class Node {
  constructor(columnHeader, rowIndex) {
    this.columnHeader = columnHeader;
    this.rowIndex = rowIndex;
    this.left = this;
    this.right = this;
    this.up = this;
    this.down = this;
    if (columnHeader) {
      columnHeader.addNode(this);
    }
  }

  appendToRow(node) {
    this.left.right = node;
    node.right = this;
    node.left = this.left;
    this.left = node;
  }

  appendToColumn(node) {
    this.up.down = node;
    node.down = this;
    node.up = this.up;
    this.up = node;
  }

  unlinkFromColumn() {
    this.up.down = this.down;
    this.down.up = this.up;
  }

  relinkToColumn() {
    this.up.down = this;
    this.down.up = this;
  }

  loop(propName, fn) {
    for (let next = this[propName]; next !== this; next = next[propName]) {
      fn(next);
    }
  }
}
