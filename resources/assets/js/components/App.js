import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';

// my components
import Events from './Events/Events';
import MyTickets from './Common/MyTickets';
import Navbar from './Common/Navbar';

// actions
import { setEvents } from './redux/actions/users';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  componentDidMount = () => {
    Axios.get('/api/events')
      .then(res => {
        let events = res.data;
        this.props.dispatch(setEvents(events));
      })
  }
  
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route
            exact path='/'
            render={() => {
              return (
                <Events />
              )
            }}
          />
          <Route
            exact path='/my'
            render={() => {
              return (
                <MyTickets />
              )
            }}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default connect()(App)