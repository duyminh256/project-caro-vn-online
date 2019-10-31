
// src/socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const getPartner = partner => ({
  type: 'GET_PARTNER',
  partner,
})
export const receiveMessage = messages => ({
  type: 'RECEIVE_MESSAGE',
  messages,
})
const configureSocket = dispatch => {
  socket.on('SEND_PARTNER', partner => dispatch(getPartner(partner)));
  socket.on('RECEIVE_MESSAGE',messages => dispatch(receiveMessage(messages)))
}
export function findPartner(name) {
  return () => socket.emit('FIND_PARNER',name)
}
export function sendMessage(messages){
  return () => socket.emit('SEND_MESSAGE',messages)
}
export function playGame(pos){
  return () => socket.emit('PLAY_GAME',pos)
}
export function undo(){
  return () => socket.emit('UNDO')
}
export default configureSocket;