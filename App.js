import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newBoard));
  };

  const calculateWinner = (squares) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const status = winner ? `Winner: ${winner}`: `Next player: ${xIsNext ? 'VARSHA' : 'KUNIKA'}` ;

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {Array(3)
                .fill(null)
                .map((_, colIndex) => renderSquare(rowIndex * 3 + colIndex))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
