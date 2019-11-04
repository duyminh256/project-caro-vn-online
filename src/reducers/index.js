import { combineReducers } from 'redux'
import game from './game'
import user from './user'
import socket from './socket'
import gameOnline from './gameOnline'
import upload from './upload'

export default combineReducers({
  game,
  user,
  socket,
  gameOnline,
  upload
})