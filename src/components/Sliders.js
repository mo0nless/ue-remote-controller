import React, { Component } from 'react'
import { Form, Grid} from 'semantic-ui-react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'

export default class Sliders extends Component {
  constructor(){
    super()
  }
  // state = { 
  //   Pitch: this.props.Pitch, 
  //   Yaw: this.props.Yaw, 
  //   Roll:this.props.Roll
  // }
  
  // defaultData = {"Pitch": parseFloat(this.state.Pitch), "Yaw": parseFloat(this.state.Yaw), "Roll": parseFloat(this.state.Roll)}

  // putRequest = () => {
  //   const data = {"Pitch": parseFloat(this.state.Pitch), "Yaw": parseFloat(this.state.Yaw), "Roll": parseFloat(this.state.Roll)}    
  //   Request(data, 'PUT', this.props.propertyReq)
  // }

  // handleAfterChange = AwesomeDebouncePromise(
  //   this.putRequest,
  //   100
  // )

  // handleChange = async (e, { name, value }) => {
  //   this.setState({ [name]: value })
  //   await this.handleAfterChange()     
  // }
  

  //toggleVisibility = () =>  this.setState((prevState) => ({ visible: !prevState.visible }))
  
    render() {
      //const { Pitch, Yaw, Roll} = this.props
      
      return (
        <Grid columns={3}>
        <Grid.Column as={Form}>
          <Form.Input
            label={`Pitch: ${this.props.Pitch}° `}
            min={0}
            max={360}
            name='Pitch'
            onChange={(e) => this.props.handleChange(e.target.name, e.target.value)}
            step={1}
            type='range'
            value={this.props.Pitch}
          />
        </Grid.Column >          
        <Grid.Column as={Form}>
          <Form.Input
            label={`Yaw: ${this.props.Yaw}° `}
            min={0}
            max={360}
            name='Yaw'
            onChange={(e) => this.props.handleChange(e.target.name, e.target.value)}
            step={1}
            type='range'
            value={this.props.Yaw}
          />
        </Grid.Column>
        <Grid.Column as={Form}>
          <Form.Input
            label={`Roll: ${this.props.Roll}° `}
            min={0}
            max={360}
            name='Roll'
            onChange={(e) => this.props.handleChange(e.target.name, e.target.value)}
            step={1}
            type='range'
            value={this.props.Roll}
          />
        </Grid.Column>
      </Grid>
      )
    }
  }