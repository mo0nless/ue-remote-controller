import React, { Component } from 'react'
import { Form, Grid} from 'semantic-ui-react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'


export default class InputLocation extends Component {
  state = { X: this.props.propertyValues.X, Y: this.props.propertyValues.Y, Z:this.props.propertyValues.Z}
  default = { X: this.props.propertyValues.X, Y: this.props.propertyValues.Y, Z:this.props.propertyValues.Z}

  putRequest = () => {    
    const data = {"X": parseFloat(this.state.X), "Y": parseFloat(this.state.Y), "Z": parseFloat(this.state.Z)}
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
  //toggleVisibility = () => this.setState((prevState) => ({ visible: !prevState.visible }))
  
    render() {
      const { X, Y, Z} = this.state
  
      return (
        <Grid columns={3}>
        <Grid.Column as={Form}>
            <Form.Input 
              fluid label='X' 
              name='X'
              onChange={this.handleChange}
              value={X}
            />
        </Grid.Column >          
        <Grid.Column as={Form}>
            <Form.Input 
              fluid label='Y'
              name='Y'
              onChange={this.handleChange}
              value={Y}
            />
        </Grid.Column>
        <Grid.Column as={Form}>
            <Form.Input 
              fluid label='Z' 
              name='Z'
              onChange={this.handleChange}
              value={Z}
            />
        </Grid.Column>
      </Grid>
      )
    }
  }