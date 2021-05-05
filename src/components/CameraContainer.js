import React, {Component, useState, useEffect} from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import LocationContainer from './LocationContainer'
import RotationContainer from './RotationContainer'
import {CamContext} from './CamContext'
import Buttons from './Buttons'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'

function CameraContainer(props) { 
    const [Cam, initCam] = useState({
            Name: props.item.Name,
            RotName: props.item.ExposedProperties[1].DisplayName,
            LocName: props.item.ExposedProperties[0].DisplayName,
            LiveProps: props.liveProps,              

            handleChange: handleChange
    });

    const [Location, setLocation] = useState()
    const [Rotation, setRotation] = useState()

    async function handleChange(e, value){
        if (value.content == "Rotation"){  
            setRotation( prevState => ({ 
                ...prevState,  //Take the previous state object
                [value.name]: parseFloat(value.value) //update the single correspondent value
            }))
        }
        else{       
            setLocation( prevState => ({ 
                ...prevState,  //Take the previous state object
                [value.name]: parseFloat(value.value) //update the single correspondent value
            }))
        }
        await handleAfterChange(value.content)    
    }

    useEffect(() => {    
        let propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.LocName
        fetch(propertyReq)
        .then(res => res.json())
        .then(data => setLocation(data.PropertyValues[0].PropertyValue))
    },[])      

    useEffect(() => {    
        let propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.RotName
        fetch(propertyReq)
        .then(res => res.json())
        .then(data => setRotation(data.PropertyValues[0].PropertyValue))
    },[])
    

    function putRequestOnChange(content){
        let propertyReq = ""
        switch (content) {
            case "Rotation":
                propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.RotName
                Request(Rotation, 'PUT', propertyReq)
                break;
            case "Location":
                propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.LocName
                Request(Location, 'PUT', propertyReq)
                break;
            default:
                break;
        }       
      }
    
    function handleAfterChange(content){
        AwesomeDebouncePromise(
        putRequestOnChange(content),
        100
    )}

    return(
        <CamContext.Provider value={{
            Cam: Cam,
            Location: Location,
            Rotation: Rotation,
            handleChange: handleChange
            }}>
            {Location && Rotation &&<Segment compact>
                <h2>{Cam.Name}</h2>
                <Divider hidden/>
                <Grid.Column>
                    <RotationContainer></RotationContainer>
                <Divider/>
                    <LocationContainer></LocationContainer>
                <Divider hidden/>
                    <Buttons defaultProps={props.item.ExposedProperties} liveCamProps={Cam.LiveProps}/>
                </Grid.Column>
            </Segment>}
        </CamContext.Provider>
        )
    
}

export default CameraContainer