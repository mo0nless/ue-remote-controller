import React, { Component } from 'react'
import { Form, Grid} from 'semantic-ui-react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'

export default class Sliders extends Component {
  state = { 
    Pitch: this.props.propertyValues.Pitch, 
    Yaw: this.props.propertyValues.Yaw, 
    Roll:this.props.propertyValues.Rolls
  }
  
  defaultData = {"Pitch": parseFloat(this.state.Pitch), "Yaw": parseFloat(this.state.Yaw), "Roll": parseFloat(this.state.Roll)}

  putRequest = () => {
    const data = {"Pitch": parseFloat(this.state.Pitch), "Yaw": parseFloat(this.state.Yaw), "Roll": parseFloat(this.state.Roll)}    
    Request(data, 'PUT', this.props.propertyReq)
  }

  handleAfterChange = AwesomeDebouncePromise(
    this.putRequest,
    100
  )

  handleChange = async (e, { name, value }) => {
    this.setState({ [name]: value })
    await this.handleAfterChange()     
  }
  

  //toggleVisibility = () =>  this.setState((prevState) => ({ visible: !prevState.visible }))
  
    render() {
      const { Pitch, Yaw, Roll} = this.state
      
      return (
        <Grid columns={3}>
        <Grid.Column as={Form}>
          <Form.Input
            label={`Pitch: ${Pitch}° `}
            min={0}
            max={360}
            name='Pitch'
            onChange={this.handleChange}
            step={1}
            type='range'
            value={Pitch}
          />
        </Grid.Column >          
        <Grid.Column as={Form}>
          <Form.Input
            label={`Yaw: ${Yaw}° `}
            min={0}
            max={360}
            name='Yaw'
            onChange={this.handleChange}
            step={1}
            type='range'
            value={Yaw}
          />
        </Grid.Column>
        <Grid.Column as={Form}>
          <Form.Input
            label={`Roll: ${Roll}° `}
            min={0}
            max={360}
            name='Roll'
            onChange={this.handleChange}
            step={1}
            type='range'
            value={Roll}
          />
        </Grid.Column>
      </Grid>
      )
    }
  }