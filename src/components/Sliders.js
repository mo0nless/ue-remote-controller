import React from 'react'
import { Form, Grid} from 'semantic-ui-react'
import {CamContext} from './CamContext'

function Sliders(){
  const content = "Rotation"
  return(
    <CamContext.Consumer>
        {({Rotation, handleChange}) =>
          (
          <Grid columns={3}>
          <Grid.Column as={Form}>
            <Form.Input
              label={`Pitch: ${Rotation.Pitch}° `}
              min={0}
              max={360}
              name='Pitch'
              onChange={(e,v) => handleChange(e, v)}
              content="Rotation"
              step={1}
              type='range'
              value={Rotation.Pitch}
            />
          </Grid.Column >          
          <Grid.Column as={Form}>
            <Form.Input
              label={`Yaw: ${Rotation.Yaw}° `}
              min={0}
              max={360}
              name='Yaw'
              onChange={(e,v) => handleChange(e, v)}
              content="Rotation"
              step={1}
              type='range'
              value={Rotation.Yaw}
            />
          </Grid.Column>
          <Grid.Column as={Form}>
            <Form.Input
              label={`Roll: ${Rotation.Roll}° `}
              min={0}
              max={360}
              name='Roll'
              onChange={(e,v) => handleChange(e, v)}
              content="Rotation"
              step={1}
              type='range'
              value={Rotation.Roll}
            />
          </Grid.Column>
        </Grid>)}

    </CamContext.Consumer>)
}

      export default Sliders
    //}
  //}