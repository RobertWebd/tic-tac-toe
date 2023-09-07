import { Square } from '../Square';
import { calculateWinner, getArray } from './Board.utils';
import PropTypes from 'prop-types';
import './Board.css';



export const Board = ({ xIsNext, squares, onPlay }) => {
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
    const winner = calculateWinner(squares);

    if (winner) {
      return 'Winner: ' + winner;
    }

    return 'Next player: ' + (xIsNext ? 'X' : 'O');
  };

  const renderBoard = () => {
    return getArray(3).map((_, rowIndex) => {
      const cols = getArray(3).map((item, colIndex) => {
        const index = rowIndex * 3 + colIndex;

        return <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />;
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
      {renderBoard()}
    </div>
  );
};

Board.propTypes = {
  xIsNext: PropTypes.bool,
  squares: PropTypes.array,
  onPlay: PropTypes.func,
};