import React, {Component} from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import LocationContainer from './LocationContainer'
import RotationContainer from './RotationContainer'
//import DropdownSelector from './DropdownSelector'
import Buttons from './Buttons'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'

class CameraContainer extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            Name: this.props.item.Name,
            RotName: this.props.item.ExposedProperties[1].DisplayName,
            LocName: this.props.item.ExposedProperties[0].DisplayName,
            LiveProps: this.props.liveProps,
            X: 0,
            Y: 0,
            Z: 0,
            Pitch: 0, 
            Yaw: 0, 
            Roll: 0
        }

        this.propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'

        this.RequestLoc(this.propertyReq + this.state.LocName)
        this.RequestRot(this.propertyReq + this.state.RotName)

        this.handleChange = this.handleChange.bind(this)
    }      

    RequestLoc = (propertyReq) => {
        fetch(propertyReq)
        .then(res => res.json())
        .then(data =>
            {
                this.setState({
                    X: data.PropertyValues[0].PropertyValue.X,
                    Y: data.PropertyValues[0].PropertyValue.Y,
                    Z: data.PropertyValues[0].PropertyValue.Z
                })
            });
    }

    RequestRot = (propertyReq) => {
        fetch(propertyReq)
        .then(res => res.json())
        .then(data =>
        {
            this.setState({
                Pitch: data.PropertyValues[0].PropertyValue.Pitch,
                Yall: data.PropertyValues[0].PropertyValue.Yall,
                Roll: data.PropertyValues[0].PropertyValue.Roll
            })
        });
    }

    putRequest = () => {
        const data = {"Pitch": parseFloat(this.state.Pitch), "Yaw": parseFloat(this.state.Yaw), "Roll": parseFloat(this.state.Roll)}    
        Request(data, 'PUT', this.props.propertyReq)
      }
    
    handleAfterChange = AwesomeDebouncePromise(
    this.putRequest,
    100
    )

    handleChange = async (e, { name, value }) => {
        console.log("TEST")
        this.setState({ [name]: value })
        await this.handleAfterChange()     
    }

    render(){
        return(
            console.log(this.state),
            <Segment compact>
                <h2>{this.state.Name}</h2>
                <Divider hidden/>
                <Grid.Column>
                    <RotationContainer 
                        displayName={this.state.RotName}
                        Pitch={this.state.Pitch} 
                        Yaw={this.state.Yaw} 
                        Roll={this.state.Roll}
                        handleChange={this.handleChange}
                    ></RotationContainer>
                <Divider/>
                    <LocationContainer 
                        displayName={this.state.LocName}
                        X={this.state.X} 
                        Y={this.state.Y} 
                        Z={this.state.Z}
                        handleChange={this.handleChange}
                    ></LocationContainer>
                <Divider hidden/>
                    <Buttons defaultProps={this.props.item.ExposedProperties} liveCamProps={this.liveProps}/>
                </Grid.Column>
            </Segment>
            )
    }
}

export default CameraContainer