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
  unselectedVin = []
  setVin = this.setVin.bind(this)
  checkIfSelected = this.checkIfSelected.bind(this)
  updateState = carData => {
    this.setState({ carData })
  }

  setVin() {
    const carStreamer = createCarStreamer(this.vinInput.value)
    carStreamer.start()
    carStreamer.subscribe(carData => {
      this.listEvents.push(carData)
      this.updateState()
    })
    //console.log(this.listEvents)
    this.listVins.push(this.vinInput.value)
    //console.log(this.listVins)
  }
  checkIfSelected(event) {
    //console.log(this.state.isChecked)
    event.target.classList.toggle('unselected')
    //console.log(event.target.classList);
    var currentVinIndex = this.unselectedVin.indexOf(event.target.id)
    console.log(currentVinIndex)
    var isVinUnselected = event.target.classList.contains('unselected')
    if (isVinUnselected) {
      this.unselectedVin.push(event.target.id)
      console.log(this.unselectedVin)
    } else {
      this.unselectedVin.splice(currentVinIndex, 1)
      console.log(this.unselectedVin)
    }
    //console.log(this.isVinUnselected)
    //console.log(this.unselectedVin)
  }
  render() {
    var allVins = []
    for (let i = 0; i < this.listVins.length; i++) {
      allVins.push(
        <Checkbox
          defaultChecked
          onClick={this.checkIfSelected}
          id={this.listVins[i]}
          key={i}>
          {this.listVins[i]}
        </Checkbox>,
      )
    }
    var allEvents = []
    for (let i = 0; i < this.listEvents.length; i++) {
      if (!this.unselectedVin.includes(this.listEvents[i].vin)) {
        allEvents.push(
          <EventNotification carEvent={this.listEvents[i]} key={i}>
            {this.listEvents[i]}
          </EventNotification>,
        )
      }
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
