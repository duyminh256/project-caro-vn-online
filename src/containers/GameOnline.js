import React  from 'react';
import 'antd/dist/antd.css';
import {  Button, Modal, message } from 'antd';
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import { playGame,undo,handleResponse,deleteResponse,disconnectGame,deleteResponse2,draw,handleResponse2} from '../actions/socket'
import Board from '../components/Board';
import Chat from './Chat'
import ListOnline from '../components/ListOnline'


const { confirm } = Modal;
const Game = (props) => {
  const {_stateGameOnline,_handleClick,_stateSocket,_undo,_handleResponse,_deleteResponse,_deleteResponse2,_disconnectGame,_draw,_handleResponse2} = props
  const {squares,winner,winline,nextplayer,player,request,response,history,response2,request2} = _stateGameOnline;
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
  const _request2 = _status =>{
    if(_status === true){
      confirm({
        title: 'DRAW',
        content: 'Đối thủ của bạn muốn cầu hòa. Đồng ý?',
        onOk() {
          _handleResponse2({res:true,partner: partner.socketId});
        },
        onCancel() {
          _handleResponse2({res:false,partner: partner.socketId});
        },
      });
    }
  }
  // const _request3 = _status =>{
  //   if(_status === true){
  //     confirm({
  //       title: 'LOSE',
  //       content: 'Đối thủ của bạn muốn xin thua. Đồng ý?',
  //       onOk() {
  //         _handleResponse2({res:true,partner: partner.socketId});
  //       },
  //       onCancel() {
  //         _handleResponse2({res:false,partner: partner.socketId});
  //       },
  //     });
  //   }
  // }
  const handleClick = ()=>{
    _undo(partner.socketId)
    message.success('Sent Request');
  }
  const handleClick2 = ()=>{
    _draw(partner.socketId)
    message.success('Sent Request');
  }
  return (
    <div className="game">
      {_request(request)}
      {_response(response)}
      {_request2(request2)}
      {_response2(response2)}
      {/* {_request3(request3)}
      {_response3(response3)} */}
      <div><ListOnline history ={_stateGameOnline.history}/></div>
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
          <Button type="danger" className="button " onClick={handleClick} disabled = {history.length === 1}>Undo</Button>
          <Button type="primary" className="button " onClick={handleClick2} disabled = {history.length === 1}>Cầu Hòa</Button>
          {/* <Button type="danger" className="button " onClick={handleClick3} disabled = {history.length === 1}>Xin Thua</Button> */}
        </div>
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
  // _lose: partner => dispatch(lose(partner)),
  _handleClick: pos => dispatch(playGame(pos)),
  _handleResponse: res => dispatch(handleResponse(res)),
  _handleResponse2: res => dispatch(handleResponse2(res)),
  // _handleResponse3: res => dispatch(handleResponse3(res)),
  _deleteResponse: () => dispatch(deleteResponse()),
  _deleteResponse2: () => dispatch(deleteResponse2()),
  // _deleteResponse3: () => dispatch(deleteResponse3()),
  _disconnectGame: () => dispatch(disconnectGame())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
