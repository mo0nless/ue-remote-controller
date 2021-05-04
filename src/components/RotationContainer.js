import React, {useState,useEffect} from 'react'
import {Header} from 'semantic-ui-react'
import Sliders from './Sliders';

function RotationContainer (props){    
    const propertyReq = 'http://localhost:30010/remote/preset/RemoteControlPreset/property/' + props.displayName
    
    // Uninitialized state will cause Child to error out
    const [items, setItems] = useState();
    
    // Data does't start loading
    // until *after* Parent is mounted
    useEffect(() => {
        fetch(propertyReq)
        .then(res => res.json())
        .then(data => setItems(data));
    }, []);

    //console.log(items.PropertyValues[0].PropertyValue)
    return(
        <div>
            <Header as='h3'>Rotation:</Header>          
               
            {items && <Sliders 
                propertyValues={items.PropertyValues[0].PropertyValue} 
                propertyReq={propertyReq}
                Pitch={props.Pitch}    
                Yaw={props.Yaw} 
                Roll={props.Roll}
                handleChange={(e) => props.handleChange(e.target.name, e.target.value)}>
                </Sliders>}
                    
        </div>
    )
}

export default RotationContainer