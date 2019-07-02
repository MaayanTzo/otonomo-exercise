import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
//import createStreamerFrom from './api/streamer'
//import generateCarData from './api/data-generator'
import createCarStreamer from './api/car-data-streamer'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import Input from './components/Input'
//import EventNotification from './components/EventNotification'

class App extends Component {
  //streamer = createStreamerFrom(() => generateCarData('12345678901234567'))
  carStreamer = createCarStreamer('12345678901234567')
  state = { carData: {} }

  updateState = carData => {
    this.setState({ carData })
  }

  componentDidMount() {
    this.carStreamer.subscribe(this.updateState)
    this.carStreamer.start()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/*<p>
            Edit <code>src/App.js</code> and save to reload.
            {JSON.stringify(this.state.carData)}
          </p>*/}
          <Input></Input>
          <Button></Button>
          <Checkbox></Checkbox>
          <div>{'VIN: ' + JSON.stringify(this.state.carData.vin)}</div>
          <div>
            {'timestamp: ' + JSON.stringify(this.state.carData.timestamp)}
          </div>
          <div>{'Fuel Level: ' + JSON.stringify(this.state.carData.fuel)}</div>
          <div>
            {'Wiper Fluid: ' + JSON.stringify(this.state.carData.wiperFluid)}
          </div>
          <div>
            {'Location: ' + JSON.stringify(this.state.carData.location)}
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
