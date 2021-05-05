import React from 'react'
import { Form, Grid} from 'semantic-ui-react'
import {CamContext} from "./CamContext"

function InputLocation(){
  return (
    <CamContext.Consumer>
        {({Cam, Rotation, Location, handleChange}) =>
          (
        <Grid columns={3}>
        <Grid.Column as={Form}>
            <Form.Input 
              fluid label='X' 
              name='X'
              content="Location"
              onChange={handleChange}
              value={Location.X}
            />
        </Grid.Column >          
        <Grid.Column as={Form}>
            <Form.Input 
              fluid label='Y'
              name='Y'
              content="Location"
              onChange={handleChange}
              value={Location.Y}
            />
        </Grid.Column>
        <Grid.Column as={Form}>
            <Form.Input 
              fluid label='Z' 
              name='Z'
              content="Location"
              onChange={handleChange}
              value={Location.Z}
            />
        </Grid.Column>
      </Grid>)}

    </CamContext.Consumer>)
}

export default InputLocation