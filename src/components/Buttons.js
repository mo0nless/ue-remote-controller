import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'



function Buttons(props) {
  const propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/' + props.displayName

  //const data = {"X": parseFloat(this.state.X), "Y": parseFloat(this.state.Y), "Z": parseFloat(this.state.Z)}

  const putRequest = () => {
    const data = {"Pitch": parseFloat(this.state.Pitch), "Yaw": parseFloat(this.state.Yaw), "Roll": parseFloat(this.state.Roll)}    
    Request(data, 'PUT', this.props.propertyReq)
  }

  const handleAfterChange = AwesomeDebouncePromise(
    putRequest,
    100
  )

  const handleChange = async (e, { name, value }) => {
    this.setState({ [name]: value })
    await this.handleAfterChange()     
  }
  
  return(
    <div>
      <Button animated>
        <Button.Content visible>Get State</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow right' />
        </Button.Content>
      </Button>
      <Button animated='vertical'>
        <Button.Content visible>Activate Camera</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow up' />
        </Button.Content>
      </Button>
      <Button animated='fade'>
        <Button.Content visible>Reset Default</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow left' />
        </Button.Content>
      </Button>
    </div>
  )
}

export default Buttons;