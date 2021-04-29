import React, {useState, useEffect} from 'react'
import {Header} from 'semantic-ui-react'
import InputLocation from './InputLocation'

function LocationContainer (props){
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

    return(
        <div>
            <Header as='h3'>Location:</Header>
             {items && <InputLocation propertyValues={items.PropertyValues[0].PropertyValue} propertyReq={propertyReq}></InputLocation>}
                    
        </div>
    )
}

export default LocationContainer