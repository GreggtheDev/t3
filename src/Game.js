import React, { useState } from "react"; // Importing React and useState hook to manage state
import Board from "./Board"; // Importing the Board component from the local file Board.js

// Function component Game that manages the state and logic of the game
function Game() {
  // useState hook to manage the history of the game states (each state is an array of 9 squares)
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  // useState hook to manage the current step number in the game history
  const [stepNumber, setStepNumber] = useState(0);
  // useState hook to manage which player's turn is next (true for 'X', false for 'O')
  const [xIsNext, setXIsNext] = useState(true);

  // Function to handle click events on the squares
  const handleClick = (i) => {
    // Slicing the history to include only the steps up to the current step
    const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
    // Getting the current state of the game
    const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
    // Creating a copy of the current squares array
    const squares = current.squares.slice();
    // If there is a winner or the square is already filled, return early
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Set the value of the clicked square to 'X' or 'O' based on xIsNext
    squares[i] = xIsNext ? "X" : "O";
    // Updating the history state with the new game state
    setHistory(historyUpToCurrentStep.concat([{ squares }]));
    // Updating the step number to the latest step
    setStepNumber(historyUpToCurrentStep.length);
    // Toggle the xIsNext state to switch turns
    setXIsNext(!xIsNext);
  };

  // Function to jump to a specific step in the game history
  const jumpTo = (step) => {
    // Updating the step number to the selected step
    setStepNumber(step);
    // Setting xIsNext based on whether the step number is even or odd
    setXIsNext(step % 2 === 0);
  };

  // Getting the current game state based on the step number
  const current = history[stepNumber];
  // Calculating the winner based on the current squares array
  const winner = calculateWinner(current.squares);

  // Mapping over the game history to create a list of move buttons
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${Math.floor(move / 3)}, ${move % 3})` // Description for each move
      : "Go to game start"; // Description for the start of the game
    return (
      <li key={move}>
        {" "}
        {/* Each list item has a unique key */}
        <button
          onClick={() => jumpTo(move)} // On click, jump to the selected move
          style={{ fontWeight: move === stepNumber ? "bold" : "normal" }} // Highlight the current move
        >
          {desc} {/* Button text */}
        </button>
      </li>
    );
  });

  // Setting the status message based on whether there is a winner or whose turn is next
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // Rendering the game components: Board and game information
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />{" "}
        {/* Board component with current squares and click handler */}
      </div>
      <div className="game-info">
        <div>{status}</div> {/* Status message */}
        <ol>{moves}</ol> {/* List of move buttons */}
      </div>
    </div>
  );
}

// Function to calculate the winner based on the squares array
function calculateWinner(squares) {
  // Possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Loop through each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if the squares at these positions are the same (and not null)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }
  return null; // No winner
}

export default Game; // Exporting the Game component to be used in other parts of the application
