import React from "react"; // Importing React to create and manage components
import Square from "./Square"; // Importing the Square component from the local file Square.js

// Function component Board that receives 'squares' (an array) and 'onClick' (a function) as props
function Board({ squares, onClick }) {
  // Function to render a Square component with a specific value and onClick handler
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />; // Passes the value and onClick handler to the Square component
  };

  const boardSize = 3; // Defines the size of the board (3x3)
  let board = []; // Initializes an empty array to hold the board's rows

  // Outer loop to create each row of the board
  for (let row = 0; row < boardSize; row++) {
    let boardRow = []; // Initializes an empty array to hold the squares in the current row

    // Inner loop to create each square in the current row
    for (let col = 0; col < boardSize; col++) {
      // Calculates the index for the squares array and renders the Square component
      boardRow.push(renderSquare(row * boardSize + col));
    }

    // Adds the current row (as a div element) to the board array
    board.push(
      <div className="board-row" key={row}>
        {" "}
        {/* Adds a unique key for each row */}
        {boardRow} {/* Renders the squares in the current row */}
      </div>
    );
  }

  // Renders the entire board (all rows) inside a div
  return <div>{board}</div>;
}

export default Board; // Exports the Board component to be used in other parts of the application
