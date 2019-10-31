import React from "react";
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { Input } from 'antd';
import {sendMessage} from '../actions/socket'

const { Search } = Input;
const Chat = (props) =>{
        const {_state,_sendMessage,_stateUser} = props
        return (
            <div className="container">
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Chat</div>
                                <hr/>
                                <div className="messages">
                                    {_state.messages.map((message,index) => {
                                        const _id = index
                                        return (
                                            <div key={_id}>{message.from}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <Search
                                    placeholder="input search text"
                                    enterButton="SEND"
                                    size="large"
                                    onSearch={value => _sendMessage({'mes':value,'to':_state.partner.socketId,"from":_stateUser.username})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
const mapStateToProps = (state) => ({
    _state: state.socket,
    _stateUser: state.user
    
})
  
  const mapDispatchToProps = (dispatch) => ({
    _sendMessage: message => dispatch(sendMessage(message))
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chat)
  