import React from 'react';
import { connect } from 'react-redux';

// npm components
import { Button, Form, Menu, Popup } from 'semantic-ui-react';

// action
import { setUser } from '../redux/actions/users'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
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
    user['name'] = 'Gino';
    this.props.dispatch(setUser(user));
  }

  render() {
    let { errors = {}, user = {} } = this.state;
    let { email = '', password = '' } = user;

    return (
      <Popup
        content={
          <Form
            className='loginForm'
            onSubmit={this.handleSubmit}
          >
            <Form.Input
              autoComplete='off'
              error={Object.keys(errors).includes('email')}
              fluid
              label='Email'
              name='email'
              onChange={this.handleChange}
              type='email'
              value={email}
            />
            <Form.Input
              autoComplete='off'
              error={Object.keys(errors).includes('password')}
              fluid
              label='Password'
              name='password'
              onChange={this.handleChange}
              type='password'
              value={password}
            />
            <Button
              content='Log In'
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