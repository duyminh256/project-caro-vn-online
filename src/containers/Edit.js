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
import {Redirect,Link} from 'react-router-dom'
import { updateInfo } from '../actions/user'


class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmDirty: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const {form} = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {_updateInfo,_state} = this.props
        _updateInfo(values,_state.token);
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
    if(!_state.allow)
      return(<Redirect to = '/'/>)
      
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <Form.Item className='title-register'>
          <h1>EDIT PROFILE</h1>
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
          {getFieldDecorator('username', {initialValue: _state.username
          })(<Input size="large" disabled = {_state.googleId||_state.facebookId}/>)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              }
            ],
            initialValue: _state.email,
          })(<Input size="large" disabled = {_state.googleId||_state.facebookId} />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
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
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Age&nbsp;
            </span>
          }
        >
          {getFieldDecorator('age',{initialValue: _state.age})(<InputNumber size="large" min={1} max={100}/>)}
        </Form.Item>
        <Form.Item className='button-edit'>
          <Button size="large" type="primary" htmlType="submit">
            SAVE
          </Button>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <Button size="large" type="default" htmlType="submit">
            <Link to="/profile">Back</Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'register' })(EditForm);

const mapStateToProps = (state) => ({
  _state: state.user
})
const mapDispatchToProps = (dispatch) => ({
  _updateInfo: (values,token) => dispatch(updateInfo(values,token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( WrappedEditForm)
