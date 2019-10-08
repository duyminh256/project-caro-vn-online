

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
function fillSquare(size,history){
  const squares = Array(size).fill(null)
  if (history.length !== 0){
    history.forEach(element => {
      squares[element.pos]=element.key
    });
  }
  return squares;
}
const game = (state = {
  squares: Array(400).fill(null),
  history: [{pos:0,key:null}],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
  winline: null,
  isDescending: true,
}, action) => {
  switch (action.type) {
    case 'HANDLE_CLICK':
      {
        const _xIsNext = state.xIsNext;
        const _history = state.history.slice(0, state.stepNumber+1);
        const current = fillSquare(state.squares.length,_history);
        if (state.winner || current[action.pos]) {
          return state;
        }
       const next = state.xIsNext ? "X" : "O";
        current[action.pos] = next;
       _history.push({pos:action.pos,key:next})
        
        const _winline = calculateWinner(current,action.pos,state.xIsNext);
        return {...state,
                  squares: current,
                  history: _history,
                  stepNumber: _history.length-1,
                  xIsNext: !_xIsNext,
                  winner: _winline?current[action.pos]:null,
                  winline: _winline||null,  
                };
      }
    case 'SORT_HISTORY':
      return {...state,isDescending: !state.isDescending}
    case 'JUMP_TO':
      {
        const _history = state.history.slice(0, action.step+1);
        const current = fillSquare(state.squares.length,_history);
        const _winline = calculateWinner(current,_history[action.step].pos,(action.step % 2) !== 0);
       
        return {...state,
          squares: current,
          stepNumber: action.step,
          xIsNext: (action.step % 2) === 0,
          winner: _winline?current[_history[action.step].pos]:null,
          winline: _winline||null, 
        }
      }
    case 'RESET':
        return {...state,
                  squares: Array(400).fill(null),
                  history: [{pos:0,key:null}],
                  stepNumber: 0,
                  xIsNext: true,
                  winner: null,
                  winline: null,
                  isDescending: true
                }
    default:
      return state
  }
}

export default game