import React from 'react';
import moment from 'moment';

// npm components
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';

const EventOpen = (props) => {
  let { event = {}, my = false } = props;
  let {
    count = 0,
    description,
    date,
    location,
    organiser,
    poster,
    tickets_left,
    time_from,
    time_to,
    title,
  } = event;

  return (
    <Card className='event'>
      <Image
        className='poster'
        style={{
          background: `url('${poster}')`,
          backgroundPosition: 'center'
        }}
        ui={false}
        wrapped
      />
      <Card.Content extra>
        <Grid>
          <Grid.Row columns='2'>
            <Grid.Column className='avatar'>
              <Image
                avatar
                src='/images/user-placeholder.jpg'
              />
              {organiser && organiser.name}
            </Grid.Column>
            <Grid.Column className='right'>
            {
              my ?
                <div className='my'>
                  <Icon name='ticket' />
                  {count} tickets on hand
                </div> :
                <Button.Group>
                  <Button
                    animated='fade'
                    color='green'
                    onClick={() =>
                      props.handleAddToCart(event)
                    }
                  >
                    <Button.Content
                      content={
                        <div className='tickets'>
                          <Icon name='ticket' />
                          {tickets_left} tickets left
                        </div>
                      }
                      visible
                    />
                    <Button.Content
                      color='green'
                      content={
                        <React.Fragment>
                          <Icon
                            name='cart plus'
                          />
                        </React.Fragment>
                      }
                      hidden
                      icon={{
                        name: 'cart plus',
                        size: 'large'
                      }}
                    />
                  </Button>
                </Button.Group>
            }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content className='info'>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span>
            Date and Time
          </span>
        </Card.Meta>
        <Card.Description>
          <Icon name='calendar' />
          <span className='date'>
            {moment(date).format('MMMM D, YYYY')}&nbsp;
            (
            {
              moment(time_from, 'HH:mm:ss').format('ha')
            }
            {' - '}
            {
              moment(time_to, 'HH:mm:ss').format('ha')
            }
            )
          </span>
        </Card.Description>
        <Card.Description>
          <Icon name='point' />
          <span>
            {location}
          </span>
        </Card.Description>
        <Card.Description>
          <span className='date'>
            
          </span>
        </Card.Description>
        <Card.Meta>
          <span>
            Description
          </span>
        </Card.Meta>
        <Card.Description className='desc'>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default EventOpen
