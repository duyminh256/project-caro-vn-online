import { connect } from 'react-redux'
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button } from 'antd';
import { Link,Redirect } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { loginUser,responseGoogle,responseFacebook} from '../actions/user'
import {GOOGLE_ID,FACEBOOK_ID} from '../constains/keys'


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const  {form} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const {login} = this.props
        login(values)
      }
    });
  };

  render() {
    const {_state,form,_responseFacebook,_responseGoogle} = this.props;
    if(_state.username)
      return(<Redirect to = '/home'/>)
      
    const { getFieldDecorator } = form;
    
    return (
      <Form onSubmit={this.handleSubmit} className="login-form login-form">
        <Form.Item className='title-login'>
          <h1>LOGIN</h1>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'The input is not valid E-mail!',
            }, {
              required: true,
              message: 'Please input your E-mail!',
            }],
          })(
            <Input
              type = "email"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item className='button-login'>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          &emsp;Or&emsp;<Link to="/register">Register now</Link>
        </Form.Item>
        <Form.Item className='button-login'>
          <FacebookLogin
            appId={FACEBOOK_ID}
            autoLoad= "true"
            fields="name,email,picture"
            callback={_responseFacebook} 
          />
          &emsp;&emsp;
          <GoogleLogin
            clientId= {GOOGLE_ID}
            buttonText="Login"
            onSuccess={_responseGoogle}
            onFailure={_responseGoogle}
          />
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


const mapStateToProps = (state) => ({
    _state: state.user
  })
const mapDispatchToProps = (dispatch) => ({
  login: values => dispatch(loginUser(values)),
  _responseFacebook: response => dispatch(responseFacebook(response)),
  _responseGoogle: response => dispatch(responseGoogle(response))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm)