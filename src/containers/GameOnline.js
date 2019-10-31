import React  from 'react';
import 'antd/dist/antd.css';
import {  Button } from 'antd';
import { connect } from 'react-redux'
import { reset,handleClick} from '../actions/index'
import Board from '../components/Board';
import Chat from './Chat'

const Game = (props) => {
  const {_stateGame,_reset,_handleClick} = props
  const {squares,winner,xIsNext,winline} = _stateGame;
  const current = squares;

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Waiting: ${(xIsNext ? "X" : "O")}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="title">
          Caro VN 
          </div>
        <Board
          winningSquares={winline || []}
          squares={current}
          onClick={_handleClick}
        />
      </div>
     
      <div className="game-info">
        
        <div>{status}&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="danger" className="button " onClick={_reset}>Undo</Button></div>
        <br/><br/>
        <Chat/>
      </div>
    </div>
  );
}






const mapStateToProps = (state) => ({
  _stateGame: state.game,
  _stateUser: state.user,
  _stateSocket: state.socket
})

const mapDispatchToProps = (dispatch) => ({
  _reset: () => dispatch(reset()),
  _handleClick: pos => dispatch(handleClick(pos)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
