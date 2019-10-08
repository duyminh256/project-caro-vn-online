import React from 'react';
import Board from './Board';


const Game = ({_state,reset,handleClick,jumpTo,sortHistory}) => {
    const {squares,history,stepNumber,winner,xIsNext,winline,isDescending} = _state;
    const _history = history;
    const current = squares;
    const moves = _history.map((step, move) => {
      const _id = move;
      const desc = move ?
        `Go to move # ${move}  Position --> Row: ${parseInt((step.pos/20 + 1),10)}, Col: ${(step.pos%20+1)}` :
        'Go to game start';
      return (
        <li key={_id}>
          <button type="button" onClick= {()=>jumpTo(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${(xIsNext ? "X" : "O")}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="title">
            Caro VN &nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" className="button" onClick={reset}>Reset</button></div>
          <Board
            winningSquares={winline || []}
            squares={current}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button type = "button" className="button" onClick={sortHistory}>
            Sort by: {isDescending ? "Asending":"Descending"}
          </button>
          <div className="list"><ol>{isDescending ? moves : moves.reverse()}</ol></div>
        </div>
      </div>
    );
}





export default Game
