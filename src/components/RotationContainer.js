import React from 'react'
import {Header} from 'semantic-ui-react'
import Sliders from './Sliders';

function RotationContainer (props){  
    return(
        <div>
            <Header as='h3'>Rotation:</Header>                    
            <Sliders></Sliders>
        </div>        
    )
}

export default RotationContainer