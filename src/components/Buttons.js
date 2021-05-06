import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'
import {CamContext} from "./CamContext"



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

  const handleOnClick = async (e) => {
    // this.setState({ [name]: value })
    // await this.handleAfterChange()   
  }

  function onClickedActivate(Cam, Rotation, Location){
    let propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.LiveProps[1].DisplayName
    Request(Rotation, 'PUT', propertyReq)
    propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.LiveProps[0].DisplayName
    Request(Location, 'PUT', propertyReq)
  }

  function onClickedReset(r){
    console.log(r)
  }
  
  return(
    <CamContext.Consumer>
        {({Cam, Rotation, Location, resetDefault, forceUpdate}) =>
          (
            <div>
            <Button 
              animated
              onClick={() => forceUpdate()}
            >
              <Button.Content visible>Get State</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            <Button 
              animated='vertical'
              onClick={() => onClickedActivate(Cam, Rotation,Location)}
            >
              <Button.Content visible>Activate Camera</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow up' />
              </Button.Content>
            </Button>
            <Button 
              animated='fade'
              onClick={() => resetDefault()}
            >
              <Button.Content visible>Reset Default</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow left' />
              </Button.Content>
            </Button>
          </div>)}
    </CamContext.Consumer>)
}

export default Buttons;