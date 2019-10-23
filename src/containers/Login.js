import { connect } from 'react-redux'
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button } from 'antd';
import { Link,Redirect } from 'react-router-dom';
import { loginUser} from '../actions/user'

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
    const {_state,form} = this.props;
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
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)} */}
          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          &emsp;Or&emsp;<Link to="/register">Register now</Link>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm)