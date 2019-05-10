import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';

// npm components
import { Button, Dropdown, Grid, Icon, Input, Menu, Sidebar } from 'semantic-ui-react';

// my components
import Event from './Event';
import EventsList from './EventsList';
import EventOpen from './EventOpen';

// actions
import { addToCart, increaseCount, setEvents, toggleCartSidebar } from '../redux/actions/users';

// https://stackoverflow.com/questions/40682103/splitting-an-array-up-into-chunks-of-a-given-size
function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

const sortOptions = [
  {
    text: 'Created',
    value: 'created_at'
  },
  {
    text: 'Date',
    value: 'date'
  },
  {
    text: 'Tickets Left',
    value: 'tickets_left'
  },
  {
    text: 'Title',
    value: 'title'
  },
]

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventOpen: {},
      eventSidebarOpen: false,
      exporting: false,
      results: [],
      searchQuery: '',
      sorting: false,
      view: 'grid'
    }
  }

  handleAddToCart = (event) => {
    let { cart } = this.props;

    let tempIndex = -1;
    cart.some((order, index) => {
      if (order.event.id === event.id) {
        tempIndex = index;
        return;
      };
    });

    if (tempIndex !== -1) {
      let count = cart[tempIndex].count + 1;

      this.props.dispatch(increaseCount(tempIndex, count))
    } else {
      let order = {
        event,
        count: 1
      }

      this.props.dispatch(addToCart(order));
    }    
  }

  handleChangeOrder = (e, data) => {
    let { value } = data;

    this.setState({
      sorting: true
    }, () => {
      Axios.get('/api/events', {
        params: {
          ...value !== 'created_at' && {
            sort: value
          }
        }
      })
        .then(res => {
          this.setState({
            sorting: false
          }, () => {
            let events = res.data;
            this.props.dispatch(setEvents(events));
          })
        })
    })
  }

  handleChangeView = (view) => {
    this.setState({
      view
    })
  }

  handleEventSidebarToggle = (eventOpen) => {
    let { eventSidebarOpen } = this.state;

    this.setState({
      eventSidebarOpen: false,
      ...Object.keys(eventOpen).length > 0 && {
        eventSidebarOpen: !eventSidebarOpen,
      }
    }, () => {
      this.setState({
        eventOpen: {},
        ...Object.keys(eventOpen).length > 0 && {
          eventOpen,
        }
      })
    })
  }

  handleExport = () => {
    window.open('/api/events/export', '_blank');
  }

  handleSearchChange = (e, data) => {
    let { events = [] } = this.props;
    let { value } = data;

    this.setState({
      searching: true,
      searchQuery: value
    }, () => {
      let re = new RegExp(_.escapeRegExp(value), 'i')
      let isMatch = result => re.test(result.title)

      let results = _.filter(events, isMatch);

      this.setState({
        searching: false,
        results,
      })
    })
    
  }

  render() {
    let { eventOpen, eventSidebarOpen, exporting, results, searching, searchQuery, sorting, view } = this.state;
    let { events } = this.props;
    if (searchQuery) {
      events = results;
    }
    let rows = chunkArrayInGroups(events, 4);
  
    return (
      <div className='events'>
        <Menu secondary>
          <Menu.Item>
            <span>
              Events sorted by&nbsp;
              <Dropdown
                defaultValue={sortOptions[0].value}
                disabled={sorting || searchQuery.length > 0}
                inline
                onChange={this.handleChangeOrder}
                options={sortOptions}
              />
            </span>
          </Menu.Item>
          <Menu.Menu>
            <Menu.Item>
              <Input
                disabled={sorting}
                icon='search'
                loading={searching}
                onChange={this.handleSearchChange}
                placeholder='Search events...'
                value={searchQuery}
              />
            </Menu.Item>
            <Menu.Item>
              <Button
                animated='fade'
                disabled={exporting}
                loading={exporting}
                onClick={this.handleExport}
                positive
              >
                <Button.Content
                  content={'Export'}
                  visible
                />
                <Button.Content
                  content={
                    <Icon
                      name='download'
                    />
                  }
                  hidden
                />              
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button.Group
                size='large'
              >
                <Button
                  active={view === 'grid'}
                  icon='grid layout'
                  onClick={() => this.handleChangeView('grid')}
                />
                <Button
                  active={view === 'list'}
                  icon='th list'
                  onClick={() => this.handleChangeView('list')}
                />
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      {
        view === 'grid' ?
          <Grid stackable>
          {
            rows.map((events, index) => {
              return (
                <Grid.Row
                  columns='4'
                  key={index}
                >
                {
                  events.map((event, index) => {
                    return (
                      <Grid.Column key={index}>
                        <Event
                          event={event}
                          handleAddToCart={this.handleAddToCart}
                          handleEventSidebarToggle={this.handleEventSidebarToggle}
                        />
                      </Grid.Column>
                    )
                  })
                }
                </Grid.Row>
              )
            })
          }
          </Grid> :
          <EventsList
            events={events}
            handleAddToCart={this.handleAddToCart}
            handleEventSidebarToggle={this.handleEventSidebarToggle}
          />
      }
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='left'
          vertical
          visible={eventSidebarOpen}
        >
          <div>
            <div className='closeSidebar'>
              <Button
                basic
                icon='close'
                onClick={() => this.handleEventSidebarToggle({})}
              />
            </div>
            <EventOpen
              event={eventOpen}
              handleAddToCart={this.handleAddToCart}
              handleEventSidebarToggle={this.handleEventSidebarToggle}
            />
          </div>
        </Sidebar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.user.cart,
  events: state.user.events
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps)(Events)