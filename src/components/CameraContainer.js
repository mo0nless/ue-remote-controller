import React from 'react'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import LocationContainer from './LocationContainer'
import RotationContainer from './RotationContainer'
//import DropdownSelector from './DropdownSelector'
import Buttons from './Buttons'

function CameraContainer (props){    
    let liveProps = {}
    const parsedItems = props.items.map(item => {
        if (item.Name === "Main Camera")
        {
            liveProps = item.ExposedProperties
            console.log(liveProps)
            console.log(item.Name)
        }
            return(
                item
            )
    })

    return(
        parsedItems.map(item => {
            const exposedProps = item.ExposedProperties
                return(
                    <Segment compact key={item.Name}>
                        <h2>{item.Name}</h2>
                        <Divider hidden/>
                            <Grid.Column>
                                <RotationContainer displayName={exposedProps[1].DisplayName}></RotationContainer>
                                <Divider/>
                                <LocationContainer displayName={exposedProps[0].DisplayName}></LocationContainer>
                                <Divider hidden/>
                                <Buttons defaultProps={exposedProps} liveCamProps={liveProps}/>
                            </Grid.Column>
                    </Segment>
                )
        })
    )
}

export default CameraContainer