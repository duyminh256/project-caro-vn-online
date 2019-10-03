import React from 'react';
import Board from './Board';

function fillSquare(history){
  const squares = Array(400).fill(null)
  if (history.length !== 0){
    history.forEach(element => {
      squares[element.pos]=element.key
    });
  }
  return squares;
}

function checkLineCols(squares,pos,comp,ops,type,jump){
  let count = 1;
  let left = pos-jump;
  let right = pos + jump;
  const winline = [pos];
  while(squares[left]||squares[right]){
    if(type === 1){
      if(parseInt((left/20),10)!==parseInt((pos/20),10)&& parseInt((right/20),10)!==parseInt((pos/20),10)){
        break;
      }
    }
    if(left>=0&&squares[left]===comp){
      winline.push(left);
      count += 1;
    }
    if(right<400&&squares[right]===comp){
      winline.push(right);
      count += 1;
    }
    if(squares[right]===ops||squares[left]===ops){
      count = 0 ;
      break;
    }
    if(squares[left])
    {
      left -= jump;
    }
    if(squares[right])
    { right += jump;}
  }
  if(count >= 5){
    return winline;
  }
  return null;
}
function checkCross(squares,pos,comp,ops,type,jump){
  let count = 1;
  let left = pos-jump;
  let right = pos+jump;
  const winline = [pos];
  while(squares[left]||squares[right]){
    if(type === 3){
      if(parseInt((left%20),10)>parseInt((pos%20),10)&& parseInt((right%20),10)<parseInt((pos%20),10)){
        break;
      }
    }else if(parseInt((left%20),10)<parseInt((pos%20),10)&& parseInt((right%20),10)>parseInt((pos%20),10)){
        break;
    }
    if(left>=0&&squares[left]===comp){
      winline.push(left)
      count += 1;
    }
    if(right<400&&squares[right]===comp){
      winline.push(right)
      count += 1;
    }
    if(squares[right]===ops||squares[left]===ops){
      count = 0 ;
      break;
    }
    if(squares[left])
    {
      left -= jump;
    }
    if(squares[right])
    { 
      right += jump;
    }
  }
  if(count >= 5){
    return winline;
  }
  return null;
}
function calculateWinner(squares,pos,next) {
    const ops = next ? 'O' : 'X'
    const comp = next ? 'X' : 'O'
    const checkLine = checkLineCols(squares,pos,comp,ops,1,1);
    if(checkLine) {return checkLine;}
    const checkCol = checkLineCols(squares,pos,comp,ops,2,20);
    if(checkCol){return checkCol;}
    const checkCross1 = checkCross(squares,pos,comp,ops,3,21);
    if(checkCross1){return checkCross1;}
    const checkCross2 = checkCross(squares,pos,comp,ops,4,19);
    if(checkCross2){return checkCross2;}
    return null;
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{pos:0,key:null}],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      winline: null,
      isDescending: true,
    };
  }

  reset(){
    this.setState({
      history: [{pos:0,key:null}],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
      winline: null,
      isDescending: true,
    });
}

  handleClick(i) {
    const {history,stepNumber,winner,xIsNext} = this.state;
    const _xIsNext = xIsNext;
    const _history = history.slice(0, stepNumber+1);
    const current = fillSquare(_history);
 
    if (winner || current[i]) {
      return;
    }
	  const next = xIsNext ? "X" : "O";
    current[i] = next;
    _history.push({pos:i,key:next})
    
    const _winline = calculateWinner(current,i,xIsNext);
   

    if(_winline){
      this.setState({
        winner: current[i],
        winline: _winline,      
      });
    }
    this.setState({
      history: _history,
      stepNumber: _history.length-1,
      xIsNext: !_xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winner: null,
      winline: null,
    });
  }

  sortHistory() {
    const {isDescending} = this.state;
    this.setState({
      isDescending: !isDescending
    });
  }

  render() {
    const {history,stepNumber,winner,xIsNext,winline,isDescending} = this.state;
    const _history = history;
    
    const current = fillSquare(_history.slice(0, stepNumber+1));
    const moves = _history.map((step, move) => {
      const _id = move;
      const desc = move ?
        `Go to move # ${move}  Position --> Row: ${parseInt((step.pos/20 + 1),10)}, Col: ${(step.pos%20+1)}` :
        'Go to game start';
      return (
        <li key={_id}>
          <button type="button" onClick={() => this.jumpTo(move)}>
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
            <button type="button" className="button" onClick={()=>this.reset()}>Reset</button></div>
          <Board
            winningSquares={winline || []}
            squares={current}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button type = "button" className="button" onClick={() => this.sortHistory()}>
            Sort by: {isDescending ? "Asending":"Descending"}
          </button>
          <ol>{isDescending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}





export default Game;
