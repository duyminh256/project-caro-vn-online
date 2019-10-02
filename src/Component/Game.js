import React from 'react';
import Board from './Board';

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
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = fillSquare(history);
    //const squares = current.slice();
    if (this.state.winner || current[i]) {
      return;
    }
	  var next = this.state.xIsNext ? "X" : "O";
    current[i] = next;
    history.push({pos:i,key:next})
    
    const winline = calculateWinner(current,i,this.state.xIsNext);
    console.log(winline)

    if(winline){
      this.setState({
        winner: current[i],
        winline: winline,      
      });
    }
    this.setState({
      history: history,
      stepNumber: history.length-1,
      xIsNext: !this.state.xIsNext,
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
    this.setState({
      isDescending: !this.state.isDescending
    });
  }

  render() {
    const history = this.state.history;
    const current = fillSquare(history.slice(0, this.state.stepNumber+1));
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move  + " Position --> Row: " + parseInt(step.pos/20 + 1) + ", Col: " + (step.pos%20+1) :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (this.state.winner) {
      status = "Winner: " + this.state.winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="title">
            Caro VN &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="button" onClick={()=>this.reset()}>Reset</button></div>
          <Board
            winningSquares={this.state.winline ? this.state.winline : []}
            squares={current}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="button" onClick={() => this.sortHistory()}>
            Sort by: {this.state.isDescending ? "Asending":"Descending"}
          </button>
          <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}
function fillSquare(history){
  var squares = Array(400).fill(null)
  if (history.length !== 0){
    history.forEach(element => {
      squares[element.pos]=element.key
    });
  }
  return squares;
}

function checkLineCols(squares,pos,comp,ops,type,jump){
  var count = 1;
  var left = pos-jump;
  var right = pos + jump;
  var winline = [pos];
  while(true){
    if(type === 1){
      if(parseInt(left/20)!==parseInt(pos/20)&& parseInt(right/20)!==parseInt(pos/20)){
        break;
      }
    }
    
    if(!squares[left]&&!squares[right]){
      break;
    }
    if(left>=0&&squares[left]===comp){
      winline.push(left);
      count ++;
    }
    if(right<400&&squares[right]===comp){
      winline.push(right);
      count++;
    }
    if(squares[right]===ops||squares[left]===ops){
      count = 0 ;
      break;
    }
    if(squares[left])
    {
      left = left-jump;
    }
    if(squares[right])
    { right = right+jump;}
  }
  if(count >= 5){
    return winline;
  }
  return null;
}
function checkCross(squares,pos,comp,ops,type,jump){
  var count = 1;
  var left = pos-jump;
  var right = pos+jump;
  var winline = [pos];
  while(true){
    if(type === 3){
      if(parseInt(left%20)>parseInt(pos%20)&& parseInt(right%20)<parseInt(pos%20)){
        break;
      }
    }else{
      if(parseInt(left%20)<parseInt(pos%20)&& parseInt(right%20)>parseInt(pos%20)){
        break;
      }
    }
    
    if(!squares[left]&&!squares[right]){
      break;
    }
    if(left>=0&&squares[left]===comp){
      winline.push(left)
      count++;
    }
    if(right<400&&squares[right]===comp){
      winline.push(right)
      count++;
    }
    if(squares[right]===ops||squares[left]===ops){
      count = 0 ;
      break;
    }
    if(squares[left])
    {
      left = left-jump;
    }
    if(squares[right])
    { 
      right = right+jump;
    }
  }
  if(count >= 5){
    return winline;
  }
  return null;
}
function calculateWinner(squares,pos,next) {
    var ops = next ? 'O' : 'X'
    var comp = next ? 'X' : 'O'
    var checkLine = checkLineCols(squares,pos,comp,ops,1,1);
    if(checkLine) {return checkLine;}
    var checkCol = checkLineCols(squares,pos,comp,ops,2,20);
    if(checkCol){return checkCol;}
    var checkCross1 = checkCross(squares,pos,comp,ops,3,21);
    if(checkCross1){return checkCross1;}
    var checkCross2 = checkCross(squares,pos,comp,ops,4,19);
    if(checkCross2){return checkCross2;}
    
    return null;
}





export default Game;
