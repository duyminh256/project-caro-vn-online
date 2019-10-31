import React from "react";
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {findPartner} from '../actions/socket'


const Loading = (props) =>{
        const {_findPartner,_stateUser,_stateSocket} = props
        if(_stateSocket.partner)
            return(<Redirect to = '/gameonline'/>)
        _findPartner(_stateUser.username)
        return (
           <h3>Tìm Partner</h3>
        );
}
const mapStateToProps = (state) => ({
    _stateUser: state.user,
    _stateSocket: state.socket
})
  
  const mapDispatchToProps = (dispatch) => ({
    _findPartner: name => dispatch(findPartner(name))
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loading)
  