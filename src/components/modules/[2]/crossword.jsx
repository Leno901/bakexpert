import React, { useState } from "react";
import "./styles.css"; // Add this file for styles

// 10x10 crossword grid
const crosswordData = [
  ["S", "M", "A", "L", "L", "", "", "", "", ""],
  ["", "", "", "", "F", "", "", "", "", ""],
  ["", "", "", "", "R", "A", "N", "C", "E", ""],
  ["P", "A", "S", "T", "R", "Y", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["S", "W", "E", "E", "T", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["D", "E", "S", "S", "E", "R", "T", "", "", ""],
  ["B", "A", "K", "E", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];

const wordsToFind = [
  {
    word: "SMALL",
    positions: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
  {
    word: "FRANCE",
    positions: [
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ],
  },
  {
    word: "PASTRY",
    positions: [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
    ],
  },
  {
    word: "SWEET",
    positions: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
    ],
  },
  {
    word: "DESSERT",
    positions: [
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
    ],
  },
  {
    word: "BAKE",
    positions: [
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
    ],
  },
];

function Crossword() {
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);

  const handleCellClick = (row, col) => {
    // Check if the selected cell is part of any word's positions
    const selectedWord = wordsToFind.find((word) =>
      word.positions.some(([r, c]) => r === row && c === col)
    );

    if (selectedWord) {
      // Add the cell to selected cells if it's part of the word's positions
      const cellKey = `${row}-${col}`;
      if (!selectedCells.includes(cellKey)) {
        setSelectedCells([...selectedCells, cellKey]);
      }

      // Check if the entire word has been selected
      const selectedPositions = selectedWord.positions.map(
        ([r, c]) => `${r}-${c}`
      );
      const isWordFound = selectedPositions.every((pos) =>
        selectedCells.includes(pos)
      );

      if (isWordFound && !foundWords.includes(selectedWord.word)) {
        setFoundWords([...foundWords, selectedWord.word]);
      }
    }
  };

  const getCellClass = (row, col) => {
    const selected = selectedCells.includes(`${row}-${col}`);
    return selected ? "cell selected" : "";
  };

  return (
    <div className="crossword-container">
      <h1>Crossword Hunt</h1>
      <div className="grid-word-container">
        <div className="grid">
          {crosswordData.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${letter ? "filled" : ""} ${getCellClass(
                    rowIndex,
                    colIndex
                  )}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="word-list">
          <h2>Words to Find:</h2>
          <ul>
            {wordsToFind.map((word) => (
              <li
                key={word.word}
                className={foundWords.includes(word.word) ? "found" : ""}
              >
                {word.word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Crossword;
