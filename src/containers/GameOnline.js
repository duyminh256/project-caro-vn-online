import React  from 'react';
import 'antd/dist/antd.css';
import {  Button, Modal, message } from 'antd';
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import { playGame,undo,handleResponse,deleteResponse,disconnectGame} from '../actions/socket'
import Board from '../components/Board';
import Chat from './Chat'


const { confirm } = Modal;
const Game = (props) => {
  const {_stateGameOnline,_handleClick,_stateSocket,_undo,_handleResponse,_deleteResponse,_disconnectGame} = props
  const {squares,winner,winline,nextplayer,player,request,response,history} = _stateGameOnline;
  const {partner} = _stateSocket
  const current = squares;
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Waiting: ${nextplayer}`;
  }
  if(!player){
    return(<Redirect to = '/home'/>)
  }
  if(!partner){
    Modal.error({
      content: 'Your friends is disconnect',
      onOk() {_disconnectGame()},
    });
  }
  const _response = _status =>{
    if(_status === "accept"){
      Modal.success({
        content: 'Both of you accept Undo',
        onOk() {_deleteResponse()},
      });
    }else if(_status === "not"){
      Modal.error({
        content: 'Not both of you accept Undo',
        onOk() {_deleteResponse()},
      });
    }
  }
  const _request = _status =>{
    if(_status === true){
      confirm({
        title: 'UNDO',
        content: 'Đối thủ của bạn muốn quay lại 1 bước. Đồng ý?',
        onOk() {
          _handleResponse({res:true,partner: partner.socketId});
        },
        onCancel() {
          _handleResponse({res:false,partner: partner.socketId});
        },
      });
    }
  }
  
  const handleClick = ()=>{
    _undo(partner.socketId)
    message.success('Sent Request');
  }
  return (
    <div className="game">
      {_request(request)}
      {_response(response)}
      <div className="game-board">
        <div className="title">
          Caro VN 
          </div>
        <Board
          winningSquares={winline || []}
          squares={current}
          onClick={i=>_handleClick({pos:i,partner: partner.socketId,allow: nextplayer === player})}
        />
      </div>
      <div className="game-info">
        <div>{nextplayer===player?"Your turn":status}&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="danger" className="button " onClick={handleClick} disabled = {history.length === 1}>Undo</Button></div>
        <br/><br/>
        <Chat/>
      </div>
    </div>
  );
}






const mapStateToProps = (state) => ({
  _stateGameOnline: state.gameOnline,
  _stateSocket: state.socket
})

const mapDispatchToProps = (dispatch) => ({
  _undo: partner => dispatch(undo(partner)),
  _handleClick: pos => dispatch(playGame(pos)),
  _handleResponse: res => dispatch(handleResponse(res)),
  _deleteResponse: () => dispatch(deleteResponse()),
  _disconnectGame: () => dispatch(disconnectGame())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
