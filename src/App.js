import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import CameraContainer from './components/CameraContainer'

function App() {
  // Uninitialized state will cause Child to error out
  const [items, setItems] = useState();
  
  // Data does't start loading
  // until *after* Parent is mounted
  useEffect(() => {
    fetch("http://localhost:30010/remote/preset/RemoteControlPreset")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);
  
  let liveProps = {}
  const parsedItems = items && items.Preset.Groups.map(item => {
      if (item.Name === "Main Camera")
      {
          liveProps = item.ExposedProperties
      }
          return(
              item
          )
  })
  
  return (
      <div style={{ margin: 20 }} className="App">          
        {parsedItems && parsedItems.map(item => {
          return(
            <CameraContainer 
              item={item} 
              key={item.Name} 
              liveProps={liveProps}
            >
            </CameraContainer>
          )})
        }
      </div>
  )
}

export default App;
