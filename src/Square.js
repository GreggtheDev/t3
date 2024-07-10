import React from "react"; // Importing React to create and manage components

// Function component Square that receives 'value' and 'onClick' as props
function Square({ value, onClick }) {
  return (
    // Renders a button element with the class "square" and the onClick handler
    <button className="square" onClick={onClick}>
      {value}{" "}
      {/* Displays the value (either 'X', 'O', or null) inside the button */}
    </button>
  );
}

export default Square; // Exports the Square component to be used in other parts of the application
