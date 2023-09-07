import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Square } from '../Square';
import { calculateWinner, getArray } from './Board.utils';
import './Board.css';

export const Board = ({ xIsNext, squares, lastMove, onPlay }) => {
  const [lines, setLines] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);

  const winnerStatus = calculateWinner(squares);

  useEffect(() => {
    if (winnerStatus && winnerStatus.winner && !gameEnd) {
      setLines(winnerStatus.lines);
      setGameEnd(true);
    }
  }, [winnerStatus]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  };

  const getStatus = () => {
    if (winnerStatus && winnerStatus.winner) {
      return 'Winner: ' + winnerStatus.winner;
    }

    if (!winnerStatus && squares.every(Boolean)) {
      return 'Draw!';
    }

    return 'Next player: ' + (xIsNext ? 'X' : 'O');
  };

  const renderBoard = () => {
    return getArray(3).map((row, rowIndex) => {
      const cols = getArray(3).map((col, colIndex) => {
        const index = rowIndex * 3 + colIndex;

        return (
          <Square
            key={index}
            value={squares[index]}
            highlighted={lines.includes(index) && lastMove}
            onSquareClick={() => handleClick(index)}
          />
        );
      });

      return (
        <div key={rowIndex} className="board-row">
          {cols}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="status">{getStatus()}</div>
      <div className="board">{renderBoard()}</div>
    </div>
  );
};

Board.propTypes = {
  xIsNext: PropTypes.bool,
  squares: PropTypes.array,
  lastMove: PropTypes.bool,
  onPlay: PropTypes.func,
};
