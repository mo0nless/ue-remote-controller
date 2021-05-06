import React, {Component, useState, useEffect} from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import LocationContainer from './LocationContainer'
import RotationContainer from './RotationContainer'
import {CamContext} from './CamContext'
import Buttons from './Buttons'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Request from './Request'

function CameraContainer(props) { 
    const [Cam, setCam] = useState({
            Name: props.item.Name,
            RotName: props.item.ExposedProperties[1].DisplayName,
            LocName: props.item.ExposedProperties[0].DisplayName,
            LiveProps: props.liveProps,              
            defaultLoc:{},
            defaultRot:{},
            handleChange: handleChange
    });

    const [Location, setLocation] = useState()
    const [Rotation, setRotation] = useState()

    useEffect(() => {    
        let propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.LocName
        fetch(propertyReq)
        .then(res => res.json())
        .then(data => {
            setLocation(data.PropertyValues[0].PropertyValue)
            setCam(prevState => ({ 
                ...prevState,  //Take the previous state object
                defaultLoc: data.PropertyValues[0].PropertyValue //update the single correspondent value
            }))
        })
    },[])      

    useEffect(() => {    
        let propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/'+ Cam.RotName
        fetch(propertyReq)
        .then(res => res.json())
        .then(data => {
            setRotation(data.PropertyValues[0].PropertyValue)
            setCam(prevState => ({ 
                ...prevState,  //Take the previous state object
                defaultRot: data.PropertyValues[0].PropertyValue //update the single correspondent value
            }))
        })
        
    },[])
    
    function resetDefault(){
        setRotation(Cam.defaultRot)
        setLocation(Cam.defaultLoc)
        putRequestOnChange("Rotation")
        putRequestOnChange("Location")
    }

    function forceUpdateHandler(){
        this.forceUpdate();
    };

    async function handleChange(e, value){
        switch (value.content) {
            case "Rotation":
                setRotation( prevState => ({ 
                    ...prevState,  //Take the previous state object
                    [value.name]: parseFloat(value.value) //update the single correspondent value
                }))
                break;
            case "Location":
                setLocation( prevState => ({ 
                    ...prevState,  //Take the previous state object
                    [value.name]: parseFloat(value.value) //update the single correspondent value
                }))
                break;
            default:
                break;
        } 
        await handleAfterChange(value.content)    
    }

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
        5
    )}

    return(
        <CamContext.Provider value={{
            Cam: Cam,
            Location: Location,
            Rotation: Rotation,
            handleChange: handleChange,
            resetDefault: resetDefault,
            forceUpdate: forceUpdateHandler
            }}>
            {Location && Rotation &&<Segment compact>
                <h2>{Cam.Name}</h2>
                <Divider hidden/>
                <Grid.Column>
                    <RotationContainer/>
                <Divider/>
                    <LocationContainer/>
                <Divider hidden/>
                    <Buttons/>
                </Grid.Column>
            </Segment>}
        </CamContext.Provider>
        )
    
}

export default CameraContainer