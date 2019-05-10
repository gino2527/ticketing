import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

// npm components
import { Button, Form, Grid, Icon, Menu, Message, Modal, Popup, TextArea } from 'semantic-ui-react';

// action
import { setEvents } from '../redux/actions/users'

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isLoading: false,
      event: {}
    }
  }

  componentWillUnmount() {
    console.log('object')
  }
  

  handleChange = (e, data) => {
    let { event } = this.state;
    let { name, value } = data;

    event[name] = value;
    this.setState({
      event
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { event } = this.state;

    this.setState({
      errors: {},
      isLoading: true
    }, () => {
      Axios.post('/api/events/new', event)
        .then(res => {
          this.setState({
            event: {},
            isLoading: false
          }, () => {
            let events = res.data;
            this.props.handleEventFormModal();
            this.props.dispatch(setEvents(events));
          })
        })
        .catch(err => {
          let { errors } = err.response.data;
          this.setState({
            errors,
            isLoading: false
          })
        })
    })
  }

  render() {
    let { errors = {}, isLoading, event = {} } = this.state;
    let {
      date = '',
      location = '',
      max_tickets = '',
      time_from = '',
      time_to = '',
      title = '',
      description = ''
    } = event;

    return (
      <Modal
        centered={false}
        size='mini'
        onClose={() => {
          this.setState({
            event: {}
          }, () => {
            this.props.handleEventFormModal()
          })
        }}
        open={this.props.open}
        trigger={
          <Menu.Item
            as={'a'}
            className='cart'
            onClick={this.props.handleEventFormModal}
          >
            <Icon
              name='plus'
            />
          </Menu.Item>
        }
      >
        <Modal.Header>New Event</Modal.Header>
        <Modal.Content>
          <Form
            className='eventForm'
            onSubmit={this.handleSubmit}
          >
          {
            Object.keys(errors).length > 0 &&
              <Message
                content='Please fill the required details properly.'
                negative
              />
          }
            <Form.Input
              autoComplete='off'
              error={Object.keys(errors).includes('title')}
              fluid
              label='Title'
              name='title'
              onChange={this.handleChange}
              type='text'
              value={title}
            />
            <Form.Field
              error={Object.keys(errors).includes('description')}
            >
              <label>Description</label>
              <TextArea
                autoComplete='off'
                name='description'
                onChange={this.handleChange}
                value={description}
              />
            </Form.Field>
            <Form.Input
              autoComplete='off'
              error={Object.keys(errors).includes('location')}
              fluid
              label='Location'
              name='location'
              onChange={this.handleChange}
              type='text'
              value={location}
            />
            <Grid>
              <Grid.Row>
                <Grid.Column width='10'>
                  <Form.Input
                    autoComplete='off'
                    error={Object.keys(errors).includes('date')}
                    fluid
                    label='Date'
                    name='date'
                    onChange={this.handleChange}
                    type='text'
                    value={date}
                  />
                </Grid.Column>
                <Grid.Column width='6'>
                  <Form.Input
                    autoComplete='off'
                    error={Object.keys(errors).includes('max_tickets')}
                    fluid
                    label='Max Tickets'
                    name='max_tickets'
                    onChange={this.handleChange}
                    type='text'
                    value={max_tickets}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns='2'>
                <Grid.Column>
                  <Form.Input
                    autoComplete='off'
                    error={Object.keys(errors).includes('time_from')}
                    fluid
                    label='Time From'
                    name='time_from'
                    onChange={this.handleChange}
                    type='text'
                    value={time_from}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    autoComplete='off'
                    error={Object.keys(errors).includes('time_to')}
                    fluid
                    label='Time To'
                    name='time_to'
                    onChange={this.handleChange}
                    type='text'
                    value={time_to}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className='submit'>
              <Button
                content='Log In'
                disabled={isLoading}
                loading={isLoading}
                primary
                type='submit'
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect()(EventForm)