

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
    xIsNext: true,
    nextplayer: null,
    winner: null,
    winline: null,
    player: null,
    opponent: null,
    request: null,
    response: null,
  }, action) => {
    switch (action.type) {
      case 'HANDLE_CLICK_ONLINE':
        {
          const _xIsNext = state.xIsNext;
          const _history = state.history;
          const current = fillSquare(state.squares.length,_history);
          if (state.winner || current[action.pos.position]) {
            return state;
          }
         const next = state.xIsNext ? "X" : "O";
          current[action.pos.position] = next;
         _history.push({pos:action.pos.position,key:next})
          
          const _winline = calculateWinner(current,action.pos.position,state.xIsNext);
          const _nextplayer = state.nextplayer === state.player? state.opponent : state.player
          const _winner = _winline?state.nextplayer:null
          return {...state,
                    squares: current,
                    history: _history,
                    xIsNext: !_xIsNext,
                    nextplayer: _nextplayer,
                    winner: _winner,
                    winline: _winline||null,  
                  };
        }
      case 'SET_UP_GAME':
        {
          return{...state,
                  xIsNext: action.role.xIsNext,
                  nextplayer: action.role.playing,
                  player: action.role.player,
                  opponent: action.role.opponent}
        }
        case 'SEND_REQUEST':
            return {...state,request: true}
        case 'SEND_RESPONSE':
          {
            if(action.res === true){
             
              const _xIsNext = !state.xIsNext
              const _nextplayer = state.nextplayer === state.player? state.opponent : state.player
              const _history = state.history.slice(0,state.history.length-1)
              const current = fillSquare(state.squares.length,_history);
              return {...state,
                request: null,
                squares: current,
                history: _history,
                winner: null,
                winline: null,
                xIsNext: _xIsNext,
                response: "accept",
                nextplayer: _nextplayer 
              }
            }
            return {...state,
                request: null,
                response: "not",
            }
          }
          case 'DISCONNECT_GAME':
            return {...state,
              squares: Array(400).fill(null),
              history: [{pos:0,key:null}],
              xIsNext: true,
              nextplayer: null,
              winner: null,
              winline: null,
              player: null,
              opponent: null,
              request: null,
              response: null,}
          case 'DELETE_RESPONSE':
            return {...state,response: true}
      default:
        return state
    }
  }
  
  export default game