import { connect } from 'react-redux'
import React from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  InputNumber
} from 'antd';
import {Redirect} from 'react-router-dom'
import { RegisterUser } from '../actions/user'


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmDirty: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {register} = this.props
        register(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const {confirmDirty} = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const {confirmDirty} = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  

  render() {
    const {_state,form} = this.props
    const { getFieldDecorator } = form;
    if(_state.token)
      return(<Redirect to = '/home'/>)
      
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item className='title-register'>
          <h1>Register</h1>
        </Form.Item>
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(<Input size="large" />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input size="large"/>)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password size="large" />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} size="large"/>)}
        </Form.Item>
        <Form.Item label="Age">
          {getFieldDecorator('age')(<InputNumber min={1} max={100} size="large"/>)}
        </Form.Item>
        <Form.Item className='button-register'>
          <Button type="primary" htmlType="submit" size="large">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = (state) => ({
  _state: state.user
})
const mapDispatchToProps = (dispatch) => ({
  register: values => dispatch(RegisterUser(values)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( WrappedRegistrationForm)
