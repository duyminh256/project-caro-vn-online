import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home'
import Game from '../containers/Game'
import GameOnline from '../containers/GameOnline'
import Loading from '../containers/Loading'
import Edit from '../containers/Edit'
import Upload from '../containers/Upload'
import Profile from'../containers/Profile'

function App() {  
    return (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
            <Route path='/game' component={Game}/>
            <Route path='/gameonline' component={GameOnline}/>
            <Route path='/loading' component={Loading}/>
            <Route path= '/upload' component={Upload}/>
            <Route path= '/edit' component={Edit}/>
            <Route path='/profile' component={Profile}/>

        </Switch>
    );
  }
  export default App;