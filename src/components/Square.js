import React from 'react';

function Square(props) {
  const {isWinning,onClick,value} = props;
  return (
    <button type="button" className={`square ${(isWinning ? "square--winning" : null)}`} onClick={onClick}>
      {value}
    </button>
  );
}
export default Square;