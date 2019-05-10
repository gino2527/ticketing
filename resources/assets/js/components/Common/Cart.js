import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

// npm components
import { Button, Grid, Icon, Input, Item, Segment } from 'semantic-ui-react';

// actions
import { clearCart, increaseCount, removeFromCart, setEvents, toggleCartSidebar } from '../redux/actions/users';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placingOrder: false
    }
  }

  handlePlaceOrder = () => {
    let { cart } = this.props;

    this.setState({
      placingOrder: true
    }, () => {
      Axios.post('/api/orders/new', { cart })
        .then(res => {
          this.setState({
            placingOrder: false
          }, () => {
            let events = res.data;
            this.props.dispatch(setEvents(events));
            this.props.dispatch(clearCart());

            setTimeout(() => {
              this.props.dispatch(toggleCartSidebar(false));
            }, 500);
          })
        })
        .catch(err => {
          console.log(err);
        })
    })
  }

  render() {
    let { placingOrder } = this.state;
    let { cart = [] } = this.props;

    return (
      <div className='cart'>
        <Grid>
        {
          cart.length > 0 ?
            cart.map((item, index) => {
              let { count, event = {} } = item;
              let {
                date,
                location,
                title
              } = event;
              return (
                <Grid.Row as={Segment} key={index}>
                  <Grid.Column width='10'>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <Item.Header>
                            {title}
                          </Item.Header>
                          <Item.Meta>
                            {moment(date).format('MMMM D, YYYY')}
                          </Item.Meta>
                          <Item.Extra>
                            {location}
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Grid.Column>
                  <Grid.Column
                    className='count'
                    width='4'
                  >
                    <Input
                      fluid
                      min='0'
                      onChange={(e, data) => this.props.dispatch(increaseCount(index, data.value))}
                      type='number'
                      value={count}
                    />
                  </Grid.Column>
                  <Grid.Column width='2'>
                    <Icon
                      className='trash'
                      name='trash'
                      onClick={() => this.props.dispatch(removeFromCart(index))}
                    />
                  </Grid.Column>
                </Grid.Row>
              )
            }) :
            <React.Fragment>
              <Grid.Row as={Segment} id='empty'>
                Much empty!
              </Grid.Row>
            </React.Fragment>
        }
        {
          cart.length > 0 &&
            <React.Fragment>
              <Grid.Row className='buy'>
                <Button
                  animated
                  disabled={placingOrder}
                  fluid
                  loading={placingOrder}
                  onClick={this.handlePlaceOrder}
                  positive
                >
                  <Button.Content
                    content={'Place Order'}
                    visible
                  />
                  <Button.Content
                    color='green'
                    content={
                      <Icon
                        name='arrow right'
                      />
                    }
                    hidden
                  />
                </Button>
              </Grid.Row>
              <Grid.Row className='buy'>
                <Button
                  animated='fade'
                  disabled={placingOrder}
                  fluid
                  negative
                  onClick={() => this.props.dispatch(clearCart())}
                >
                  <Button.Content
                    content={'Empty Cart'}
                    visible
                  />
                  <Button.Content
                    content={
                      <Icon
                        name='trash'
                      />
                    }
                    hidden
                  />
                </Button>            
              </Grid.Row>
            </React.Fragment>
        }
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.user.cart
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps)(Cart)
