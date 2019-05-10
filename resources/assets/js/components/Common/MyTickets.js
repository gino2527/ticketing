import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

// npm components
import { Button, Grid, Menu, Sidebar } from 'semantic-ui-react';

// my components
import Event from '../Events/Event';
import EventOpen from '../Events/EventOpen';

// actions
import { setMyEvents } from '../redux/actions/users';

// https://stackoverflow.com/questions/40682103/splitting-an-array-up-into-chunks-of-a-given-size
function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

class MyTickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventOpen: {},
      eventSidebarOpen: false
    }
  }

  componentDidMount() {
    Axios.get('/api/events/my')
      .then(res => {
        this.props.dispatch(setMyEvents(res.data));
      })
  }  

  handleEventSidebarToggle = (eventOpen) => {
    let { eventSidebarOpen } = this.state;

    this.setState({
      eventSidebarOpen: false,
      eventOpen: {},
      ...Object.keys(eventOpen).length > 0 && {
        eventSidebarOpen: !eventSidebarOpen,
        eventOpen
      }
    })
  }

  render() {
    let { eventOpen, eventSidebarOpen } = this.state;
    let { events = [] } = this.props;
    let rows = chunkArrayInGroups(events, 4);
  
    return (
      <div className='events'>
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
                        my={true}
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
        </Grid>
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
              my={true}
            />
          </div>
        </Sidebar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.user.my
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps)(MyTickets)