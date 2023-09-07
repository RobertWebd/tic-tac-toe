import { useEffect, useState } from 'react';
import { Board } from './components';
import './TicTacToe.css';

export const TicTacToe = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [sorted, setSorted] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);
  const [moves, setMoves] = useState([]);
  const xIsNext = currentMove % 2 == 0;
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
    return moves.map((description, move) => (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>;
      </li>
    ));
  };

  useEffect(() => {
    const newMoves = history.map((squares, move) => {
      let description;

      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }

      return description;
    });

    setMoves(newMoves);
  }, [history]);

  useEffect(() => {
    const sortedMoves = moves.reverse();

    setMoves(sortedMoves);
  }, [sorted]);

  const handleSort = () => {
    setSorted((prevSorted) => !prevSorted);
    // setHistory((prevHistory) => prevHistory.reverse());
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          <p className="curentMove">You are at move # {currentMove}</p>
          {renderMoves()}
        </ol>
      </div>
      <div className="game-button">
        <button onClick={handleSort}>Sort by: {sorted ? 'Ascending' : 'Descending'}</button>
      </div>
    </div>
  );
};
