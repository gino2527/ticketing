import React from 'react';
import moment from 'moment';

// npm components
import { Button, Table, Icon } from 'semantic-ui-react';

const EventsList = (props) => {
  let { events = [] } = props;
  return (
    <Table
      basic='very'
      singleLine
      striped
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            width={2}
          >
            DATE
          </Table.HeaderCell>
          <Table.HeaderCell
            width={5}
          >
            EVENT
          </Table.HeaderCell>
          <Table.HeaderCell
            width={3}
          >
            ORGANISER
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
          >
            LOCATION
          </Table.HeaderCell>
          <Table.HeaderCell
            textAlign='center'
            width={2}
          >
            TICKETS LEFT
          </Table.HeaderCell>
          <Table.HeaderCell
            textAlign='center'
            width={3}
          />
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {
        events.map((event, index) => {
          let {
            date,
            location,
            tickets_left,
            title
          } = event;

          return (
            <Table.Row key={index}>
              <Table.Cell>
                {moment(date).format('MMMM D, YYYY')}
              </Table.Cell>
              <Table.Cell>
                {title}
              </Table.Cell>
              <Table.Cell>
                {'Gino Cabullo'}
              </Table.Cell>
              <Table.Cell>
                {location}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Icon name='ticket alternate'/>&nbsp;
                {tickets_left}
              </Table.Cell>
              <Table.Cell
                className='actions'
              >
                <Button
                  basic
                  icon={{
                    color: 'blue',
                    name: 'eye',
                    size: 'large'
                  }}
                  onClick={() =>
                    props.handleEventSidebarToggle(event)
                  }
                  style={{
                    marginRight: '0px'
                  }}
                />
                <span>
                  |
                </span>
                <Button
                  basic
                  icon={{
                    color: 'green',
                    name: 'cart plus',
                    size: 'large'
                  }}
                  onClick={() =>
                    props.handleAddToCart(event)
                  }
                />
              </Table.Cell>
            </Table.Row>
          )
        })
      }
      </Table.Body>
    </Table>
  )
}

export default EventsList
