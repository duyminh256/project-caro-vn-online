import React from "react";
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {findPartner} from '../actions/socket'


const Loading = (props) =>{
        const {_findPartner,_stateUser,_stateSocket} = props
        if(!_stateUser.token)
            return(<Redirect to = '/'/>)
        if(_stateSocket.partner)
            return(<Redirect to = '/gameonline'/>)
        _findPartner(_stateUser.username)
        return (
          <div className="find">
            <h3 className="title-find">FINDING PARTNER ...</h3>
            <img src="https://res.cloudinary.com/dpsdkyleb/image/upload/v1573046201/Pngtree_vector_illustration_of_a_brown_4000081_o92nub.png" alt="logo" height="600" width="600"/> 
           </div>
          
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
  