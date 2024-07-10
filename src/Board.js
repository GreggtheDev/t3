import React from "react";
import Square from "./Square";

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  const boardSize = 3;
  let board = [];
  for (let row = 0; row < boardSize; row++) {
    let boardRow = [];
    for (let col = 0; col < boardSize; col++) {
      boardRow.push(renderSquare(row * boardSize + col));
    }
    board.push(
      <div className="board-row" key={row}>
        {boardRow}
      </div>
    );
  }

  return <div>{board}</div>;
}

export default Board;
