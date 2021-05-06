import React from 'react'

export const CamContext = React.createContext({
    Cam: {},
    Location: {},
    Rotation: {},
    handleChange: () => {},
    resetDefault: () => {},
    forceUpdate: () => {}
});