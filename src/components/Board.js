import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const {winningSquares,squares,onClick} = this.props;
    return (
      <Square
        isWinning={winningSquares.includes(i)}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }
  
  renderAllSquares(){
    const {squares} = this.props;
    const matrixSize = Math.sqrt(squares.length);
    const board = Array(matrixSize).fill(null);
    let i = 0;
    while(i < matrixSize){
        const _squares = Array(matrixSize).fill(null);
        let j = 0;
        while(j < matrixSize){
            const squareKey = i * matrixSize + j;
            _squares.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
            j +=1;
        }
        board.push(<div key={i}>{_squares}</div>);
        i+=1;
    }
    return board;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderAllSquares()}
        </div>
      </div>
    );
  }
}
export default Board;