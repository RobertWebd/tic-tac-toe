import { useState } from 'react';
import { Board } from './components';
import './TicTacToe.css';

export const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sorted, setSorted] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const renderMoves = () => {
    let moves = history.map((_, move) => {
      let description;

      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

    return sorted ? moves.reverse() : moves;
  };

  const handleSort = () => setSorted((prevSorted) => !prevSorted);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} lastMove={currentMove + 1 === history.length} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <p>You are at move: #{currentMove}</p>
        <ol>{renderMoves()}</ol>
      </div>
      <button className="sort-btn" onClick={handleSort}>
        Sort by {sorted ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};
