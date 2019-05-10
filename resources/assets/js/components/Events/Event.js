import React from 'react';
import moment from 'moment';

// npm components
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';

const Event = (props) => {
  let { event = {}, my = false } = props;
  let {
    count = 0,
    date,
    poster,
    tickets_left,
    title
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
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className='date'>
            {moment(date).format('MMMM D, YYYY')}
          </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Grid>
          <Grid.Row>
            <Grid.Column width='10'>
              <div className='tickets'>
              {
                my ?
                  <React.Fragment>
                    <Icon name='ticket' />
                    {count} tickets on hand
                  </React.Fragment> :
                  <React.Fragment>
                    <Icon name='ticket' />
                    {tickets_left} tickets left                    
                  </React.Fragment>
              }
              </div>
            </Grid.Column>
            <Grid.Column width='6'>
              <Button.Group>
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
                {
                  !my &&
                    <React.Fragment>
                      <span>
                        |
                      </span>
                      <Button
                        basic
                        disabled={tickets_left === 0}
                        icon={{
                          color: 'green',
                          name: 'cart plus',
                          size: 'large'
                        }}
                        onClick={() =>
                          props.handleAddToCart(event)
                        }
                      />
                    </React.Fragment>                      
                }
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default Event
