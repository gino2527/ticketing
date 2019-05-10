import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// npm components
import { Button, Dropdown, Menu, Icon, Sidebar } from 'semantic-ui-react';

// my components
import Cart from './Cart';
import LoginForm from './LoginForm';

// actions
import { toggleCartSidebar, unsetUser } from '../redux/actions/users';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // cartSidebarOpen: false
    }
  }

  handleCartSidebarToggle = (cartOpen) => {
    let { cartSidebarOpen } = this.state;

    this.setState({
      cartSidebarOpen: !cartSidebarOpen,
      ...typeof(cartOpen) === "boolean" && {
        cartSidebarOpen: cartOpen
      }
    })
  }
  
  render() {
    let { cart, cartSidebarOpen, user } = this.props;
    let { pathname } = this.props.location;

    return (
      <Menu
        id='nav'
        size='large'
      >
        <Menu.Item />
        <Menu.Item
          active={pathname === '/'}
          as={Link}
          to=''
        >
          <Icon
            name='home'
          />
        </Menu.Item>
        <Menu.Item
          active={pathname === '/events'}
          as={Link}
          to='events'
        >
          Events
        </Menu.Item>
        <Menu.Item
          active={pathname === '/my'}
          as={Link}
          to='my'
        >
          My Tickets
        </Menu.Item>
        <Menu.Menu position='right'>
          <a
            className='item'
            onClick={() => this.props.dispatch(toggleCartSidebar(true))}
          >
          {
            cart.length > 0 ?
              <React.Fragment>
                <Icon
                  color='green'
                  name='cart'
                />
                <Icon
                  color='green'
                  name='check'
                />
              </React.Fragment> :
              <Icon
                id='cart'
                name='shopping cart'
              />
          }
          </a>
        {
          Object.keys(user).length > 0 ?
            <Dropdown
              text={user.name}
              item
              simple
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.props.dispatch(unsetUser())}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> :
            <LoginForm />
        }
          <Menu.Item />
        </Menu.Menu>
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='right'
          vertical
          visible={cartSidebarOpen}
        >
          <div>
            <div className='closeSidebar'>
              <Button
                basic
                icon='close'
                onClick={() => this.props.dispatch(toggleCartSidebar(false))}                
              />
              <div className='title'>
                My Cart
              </div>
            </div>
            <Cart />
          </div>
        </Sidebar>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.user.cart,
  cartSidebarOpen: state.user.cartSidebarOpen,
  user: state.user.user
})

export default withRouter(connect(mapStateToProps)(Navbar))