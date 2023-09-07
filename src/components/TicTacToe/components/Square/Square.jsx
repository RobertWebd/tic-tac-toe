import PropTypes from 'prop-types';
import './Square.css';

export const Square = ({ value, highlighted, onSquareClick }) => {
  return (
    <button className={`square ${highlighted ? 'highlighted' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  highlighted: PropTypes.bool,
  onSquareClick: PropTypes.func,
};
