import ColumnHeader from "./ColumnHeader.js";
import Node from "./Node.js";

export default function buildInternalStructure(matrix) {
  const root = new ColumnHeader();
  const headerList = [];
  matrix.forEach((row, rowIndex) => {
    let firstNodeInRow = null;
    row.forEach((col, colIndex) => {
      if (rowIndex === 0) {
        const columnHeader = new ColumnHeader();
        root.appendHeaderColumn(columnHeader);
        headerList.push(columnHeader);
      }
      if (col) {
        const columnHeader = headerList[colIndex];
        const node = new Node(columnHeader, rowIndex);
        if (firstNodeInRow) {
          firstNodeInRow.appendToRow(node);
        } else {
          firstNodeInRow = node;
        }
      }
    });
  });
  return root;
}
