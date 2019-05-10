import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

// npm components
import { Button, Form, Menu, Popup, Message } from 'semantic-ui-react';

// action
import { setUser } from '../redux/actions/users'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isLoading: false,
      user: {}
    }
  }

  handleChange = (e, data) => {
    let { user } = this.state;
    let { name, value } = data;

    user[name] = value;
    this.setState({
      user
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { user } = this.state;
    
    this.setState({
      errors: {},
      isLoading: true
    }, () => {
      Axios.post('/api/user/login', user)
        .then(res => {
          this.setState({
            isLoading: false
          }, () => {
            let { user } = res.data;
            this.props.dispatch(setUser(user));
          })
        })
        .catch(err => {
          this.setState({
            errors: err.response.data,
            isLoading: false
          })
        })
    })
  }

  render() {
    let { errors = {}, isLoading, user = {} } = this.state;
    let { email = '', password = '' } = user;

    return (
      <Popup
        content={
          <Form
            className='loginForm'
            onSubmit={this.handleSubmit}
          >
          {
            Object.keys(errors).length > 0 &&
              <Message
                content='Incorrect Email/Password Combination'
                negative
              />
          }
            <Form.Input
              autoComplete='off'
              fluid
              label='Email'
              name='email'
              onChange={this.handleChange}
              type='email'
              value={email}
            />
            <Form.Input
              autoComplete='off'
              fluid
              label='Password'
              name='password'
              onChange={this.handleChange}
              type='password'
              value={password}
            />
            <Button
              content='Log In'
              disabled={isLoading}
              loading={isLoading}
              type='submit'
            />
          </Form>
        }
        on='click'
        trigger={
          <Menu.Item>
            Login
          </Menu.Item>
        }
      />
    )
  }
}

export default connect()(LoginForm)