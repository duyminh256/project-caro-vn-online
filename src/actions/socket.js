
// src/socket.js
import io from 'socket.io-client';
import host from '../constains/host'

const socket = io(host);

export const getPartner = partner => ({
  type: 'GET_PARTNER',
  partner,
})
export const receiveMessage = messages => ({
  type: 'RECEIVE_MESSAGE',
  messages,
})
export const handleClickOnline = pos =>({
  type: 'HANDLE_CLICK_ONLINE',
  pos,
})
export const setUpGame = role =>({
  type: 'SET_UP_GAME',
  role,
})
export const sendRequest = () => ({
  type: 'SEND_REQUEST', 
})
export const sendRequest2 = () => ({
  type: 'SEND_REQUEST_2', 
})
export const sendResponse = (res) => ({
  type: 'SEND_RESPONSE',
  res 
})
export const sendResponse2 = (res) => ({
  type: 'SEND_RESPONSE_2',
  res 
})
export const deleteResponse = (res)=>({
  type: 'DELETE_RESPONSE',
  res 
})
export const deleteResponse2 = (res)=>({
  type: 'DELETE_RESPONSE_2',
  res 
})
export const disconnect = ()=>({
  type: 'DISCONNECT',
})
export const disconnectGame = ()=>({
  type: 'DISCONNECT_GAME',
})
const configureSocket = dispatch => {
  socket.on('SET_UP_GAME',role => dispatch(setUpGame(role)))
  socket.on('SEND_CLICK', position => dispatch(handleClickOnline(position)))
  socket.on('SEND_PARTNER', partner => dispatch(getPartner(partner)));
  socket.on('RECEIVE_MESSAGE',messages => dispatch(receiveMessage(messages)))
  socket.on('SEND_REQUEST',()=>dispatch(sendRequest()))
  socket.on('SEND_REQUEST_2',()=>dispatch(sendRequest2()))
  socket.on('SEND_RESPONSE_2',res=>dispatch(sendResponse2(res)))
  socket.on('SEND_RESPONSE',res=>dispatch(sendResponse(res)))
  socket.on('DISCONNECT',()=>dispatch(disconnect()))
}
export const findPartner = name =>{
  return () => socket.emit('FIND_PARNER',name)
}
export const sendMessage = messages =>{
  return () => socket.emit('SEND_MESSAGE',messages)
}
export const playGame = pos =>{
  if (pos.allow === true)
    {return () => socket.emit('SEND_CARO',pos)}
  return () => socket.emit('PLAY_GAME',pos)
}
export const undo = partner => {
  return () => socket.emit('UNDO',partner)
}
export const draw = partner => {
  return () => socket.emit('DRAW',partner)
}
export const handleResponse = res =>{
  return () => socket.emit('RESPONSE_UNDO',res)
}
export const handleResponse2 = res =>{
  return () => socket.emit('RESPONSE_DRAW',res)
}

export default configureSocket;