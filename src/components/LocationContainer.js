import React, {useState, useEffect} from 'react'
import {Header} from 'semantic-ui-react'
import InputLocation from './InputLocation'

function LocationContainer (props){
    return(
        <div>
            <Header as='h3'>Location:</Header>
             <InputLocation></InputLocation>  
        </div>
    )
}

export default LocationContainer