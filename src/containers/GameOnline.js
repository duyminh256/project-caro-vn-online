import React  from 'react';
import 'antd/dist/antd.css';
import {  Button, Modal, message } from 'antd';
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import { waiting,deleteResponse4,handleResponse4,playGame,undo,handleResponse,deleteResponse,disconnectGame,deleteResponse2,draw,handleResponse2,newGame,handleResponse3,deleteResponse3,disconnect,lose} from '../actions/socket'
import Board from '../components/Board';
import Chat from './Chat'
import ListOnline from '../components/ListOnline'


const { confirm } = Modal;
const Game = (props) => {
  const {_waiting,_deleteResponse4,_handleResponse4,_disconnect,_lose,_stateGameOnline,_handleClick,_stateSocket,_undo,_handleResponse,_deleteResponse,_deleteResponse2,_disconnectGame,_draw,_handleResponse2,_handleResponse3,_new,_deleteResponse3} = props
  const {waiting1,squares,winner,winline,nextplayer,player,request,response,history,response2,request2,request3,response3,response4,request4} = _stateGameOnline;
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
  const _response2 = _status =>{
    if(_status === "accept"){
      Modal.success({
        content: 'Both of you accept Draw',
        onOk() {_deleteResponse2()},
      });
    }else if(_status === "not"){
      Modal.error({
        content: 'Not both of you accept Draw',
        onOk() {_deleteResponse2()},
      });
    }
  }
  const _response3 = _status =>{
    if(_status === "accept"){
      Modal.success({
        content: 'Lets play new game',
        onOk() {_deleteResponse3()},
      });
    }else if(_status === "not"){
      Modal.error({
        content: 'Not both of you accept play new game',
        onOk() {_disconnectGame();_disconnect()},
      });
    }
  }
  const _response4 = _status =>{
    if(_status === "accept"){
      Modal.success({
        content: 'This game end',
        onOk() {_deleteResponse4()},
      });
    }
  }
  const _request = _status =>{
    if(_status === true){
      confirm({
        title: 'UNDO',
        content: 'Your opponent want to UNDO. Agree?',
        onOk() {
          _handleResponse({res:true,partner: partner.socketId});
        },
        onCancel() {
          _handleResponse({res:false,partner: partner.socketId});
        },
      });
    }
  }
  const _request2 = _status =>{
    if(_status === true){
      confirm({
        title: 'DRAW',
        content: 'Your opponent want to DRAW. Agree?',
        onOk() {
          _handleResponse2({res:true,partner: partner.socketId});
        },
        onCancel() {
          _handleResponse2({res:false,partner: partner.socketId});
        },
      });
    }
  }
  const _request3 = _status =>{
    if(_status === true){
      confirm({
        title: 'Play New Game',
        content: 'Your opponent want to play NEW GAME. Agree?',
        onOk() {
          _handleResponse3({res:true,partner: partner.socketId});
        },
        onCancel() {
          _handleResponse3({res:false,partner: partner.socketId});
        },
      });
    }
  }
  const _request4 = _status =>{
    if(_status === true){
      Modal.error({
        content: 'Your opponent want to surrender. You win',
        onOk() {_handleResponse4({res:true,partner: partner.socketId});},
      });
    }
  }
  const handleClick = ()=>{
    _undo(partner.socketId)
    message.success('Sent Request');
    _waiting()
  }
  const handleClick2 = ()=>{
    _draw(partner.socketId)
    message.success('Sent Request');
    _waiting()
  }
  const handleClick3 = ()=>{
    _new(partner.socketId)
    message.success('Sent Request');
    _waiting()
  }
  const handleClick4 = ()=>{
    _lose(partner.socketId)
    message.success('Sent Request');
    _waiting()
  }
  return (
    <div className="game">
      {_request(request)}
      {_response(response)}
      {_request2(request2)}
      {_response2(response2)}
      {_request3(request3)}
      {_response3(response3)}
      {_request4(request4)}
      {_response4(response4)}
      
      <Modal
          visible={waiting1}
          footer={[]}
        >
          <p>Waiting your opponent...</p>
      </Modal>



      <div className="game-history"><ListOnline history ={_stateGameOnline.history}/></div>
      <div className="game-board">
        <div className="title">
          Caro VN 
          &emsp;
          <Button type="primary" className="button" onClick={handleClick3} disabled = {!winner}>Play New Game</Button></div>
        <Board
          winningSquares={winline || []}
          squares={current}
          onClick={i=>_handleClick({pos:i,partner: partner.socketId,allow: nextplayer === player})}
        />
      </div>
      <div className="game-info">
          <div>{nextplayer===player&&!winner?"Your turn":status}</div>
          <Button type="danger" className="button " onClick={handleClick} disabled = {history.length === 1}>Undo</Button>&emsp;
          <Button type="primary" className="button " onClick={handleClick2} disabled = {history.length === 1}>Want draw</Button>&emsp;
          <Button type="danger" className="button "  onClick={handleClick4}disabled = {history.length === 1}>Want Lose</Button> &emsp;
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
  _draw: partner => dispatch(draw(partner)),
  _new: partner =>dispatch(newGame(partner)),
  _lose: partner => dispatch(lose(partner)),
  _handleClick: pos => dispatch(playGame(pos)),
  _handleResponse: res => dispatch(handleResponse(res)),
  _handleResponse2: res => dispatch(handleResponse2(res)),
  _handleResponse3: res => dispatch(handleResponse3(res)),
  _handleResponse4: res => dispatch(handleResponse4(res)),
  _deleteResponse: () => dispatch(deleteResponse()),
  _deleteResponse2: () => dispatch(deleteResponse2()),
  _deleteResponse3: () => dispatch(deleteResponse3()),
  _deleteResponse4: () => dispatch(deleteResponse4()),
  _disconnectGame: () => dispatch(disconnectGame()),
  _waiting:()=>dispatch(waiting()),
  _disconnect:()=>dispatch(disconnect())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
