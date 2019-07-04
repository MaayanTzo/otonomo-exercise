import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
//import createStreamerFrom from './api/streamer'
//import generateCarData from './api/data-generator'
import createCarStreamer from './api/car-data-streamer'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import Input from './components/Input'
import EventNotification from './components/EventNotification'

class App extends Component {
  //streamer = createStreamerFrom(() => generateCarData('12345678901234567'))
  state = {
    carData: {},
  }
  listEvents = []
  listVins = []
  setVin = this.setVin.bind(this)
  updateState = carData => {
    this.setState({ carData })
  }
  componentWillMount() {
    console.log('will mount')
    console.log(this.state.carData)
  }
  /*componentDidMount() {
    this.streamer.subscribe(this.updateState)
    this.streamer.start()
  }*/
  setVin() {
    //console.log('working')
    //console.log(this.vinInput.value)
    const carStreamer = createCarStreamer(this.vinInput.value)
    //console.log(this.state.carData)
    carStreamer.start()
    carStreamer.subscribe(carData => {
      this.setState({ carData })
    })
    this.listEvents.push(this.state.carData)
    //console.log(this.listEvents)
    this.listVins.push(this.state.carData.vin)
    //console.log(this.listVins);
  }
  render() {
    var allEvents = []
    for (let i = 0; i < this.listEvents.length; i++) {
      //if (this.state.carData.vin==this.listEvents[i].vin)
      allEvents.push(
        <EventNotification
          carEvent={this.state.carData}
          key={this.listEvents[i].vin}>
          {this.listEvents[i]}
        </EventNotification>,
      )
    }
    var allVins = []
    for (let i = 0; i < this.listVins.length; i++) {
      allVins.push(
        <Checkbox defaultChecked key={this.listVins[i]}>
          {this.listVins[i]}
        </Checkbox>,
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/*<p>
            Edit <code>src/App.js</code> and save to reload.
            {JSON.stringify(this.state.carData)}
          </p>*/}
          <Input newVin={x => (this.vinInput = x)}></Input>
          <Button setVin={this.setVin}>Add+</Button>
          {allVins}
          {allEvents}
          <div>{JSON.stringify(this.state.carData)}</div>
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
