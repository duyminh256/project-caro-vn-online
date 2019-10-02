import React from 'react';
import Square from './Square';
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isWinning={this.props.winningSquares.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderAllSquares(){
    const matrixSize = Math.sqrt(this.props.squares.length);
    const board = Array(matrixSize).fill(null);
    for(let i = 0; i < matrixSize; i++){
        const squares = Array(matrixSize).fill(null);
        for(let j = 0; j < matrixSize; j++){
            var squareKey = i * matrixSize + j;
            squares.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
        }
        board.push(<div key={i}>{squares}</div>);
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