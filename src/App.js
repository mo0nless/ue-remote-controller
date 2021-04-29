import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import {Container } from 'semantic-ui-react'
import CameraContainer from './components/CameraContainer'

//import FetchData from './components/FetchData';
//import Button from './components/Button';

function App() {
  // constructor() {
  //     super()
  //     this.state = {
  //         loading: false,
  //         remoteControl: {}
  //     }
  // this.handleClick = this.handleClick.bind(this)
  // }
  
  // componentDidMount() {
  //     this.setState({loading: true})
  //     fetch("http://localhost:30010/remote/preset/RemoteControlPreset")
  //         .then(response => response.json())
  //         .then(data => {
  //             this.setState({
  //                 loading: false,
  //                 remoteControl: data
  //             })
  //             // console.log(data.Preset.Name)
  //         })
  // }

  // handleClick(){
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       {
  //         "PropertyValue": {
  //             "Pitch": -90,
  //             "Yaw": 0,
  //             "Roll": 0
  //         },
  //         "GenerateTransaction": true
  //       }
  //     )
  //   };
  //   fetch('http://localhost:30010/remote/preset/RemoteControlPreset/property/Relative Rotation (CameraActor_1)', requestOptions)
  //       .then(response => response.status === 200 ? console.log("success") : console.log("error"))   
  // }

  // Uninitialized state will cause Child to error out
  const [items, setItems] = useState();
  
  // Data does't start loading
  // until *after* Parent is mounted
  useEffect(() => {
    fetch("http://localhost:30010/remote/preset/RemoteControlPreset")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);
  
  
  //render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     { <img src={logo} className="App-logo" alt="logo" /> }
      //     <CameraContainer></CameraContainer>
      //     {/* <p>
      //       { Object.keys(this.state.remoteControl).length === 0 ? "Loading.." : this.state.remoteControl.Preset.Name}
      //     </p> */}
      //     {/* <FetchData handleClick={this.handleClick}/> */}
      //   </header>
      // </div>
      <Container style={{ margin: 20 }} className="App">
        <div>
          {items && <CameraContainer items={items.Preset.Groups}></CameraContainer>}
          {/* <CameraContainer></CameraContainer> */}
        </div>
      </Container>
    );
 //}
}

export default App;
