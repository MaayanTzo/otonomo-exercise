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
    isFuelFiltered: false,
  }
  listEvents = []
  listEventsUnder15 = []
  listVins = []
  unselectedVin = []
  setVin = this.setVin.bind(this)
  checkIfSelected = this.checkIfSelected.bind(this)
  filterByFuel = this.filterByFuel.bind(this)
  updateState = carData => {
    this.setState({ carData })
  }

  setVin() {
    const carStreamer = createCarStreamer(this.vinInput.value)
    carStreamer.start()
    carStreamer.subscribe(carData => {
      this.listEvents.push(carData)
      this.updateState()
      if (carData.fuel < 0.16) {
        this.listEventsUnder15.push(carData)
      }
    })
    this.listVins.push(this.vinInput.value)
  }
  checkIfSelected(event) {
    event.target.classList.toggle('unselected')
    var currentVinIndex = this.unselectedVin.indexOf(event.target.id)
    var isVinUnselected = event.target.classList.contains('unselected')
    if (isVinUnselected) {
      this.unselectedVin.push(event.target.id)
    } else {
      this.unselectedVin.splice(currentVinIndex, 1)
    }
  }
  filterByFuel() {
    var fuelFilter = this.state.isFuelFiltered ? false : true
    console.log('filter')
    this.setState({
      isFuelFiltered: fuelFilter,
    })
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
    if (this.state.isFuelFiltered) {
      var allEvents = []
      for (let i = 0; i < this.listEventsUnder15.length; i++) {
        if (!this.unselectedVin.includes(this.listEventsUnder15[i].vin)) {
          allEvents.push(
            <EventNotification carEvent={this.listEventsUnder15[i]} key={i}>
              {this.listEventsUnder15[i]}
            </EventNotification>,
          )
        }
      }
    } else {
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
    }

    var check = this.state.isFuelFiltered ? 'checked' : ''
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
          <Checkbox defaultChecked={check} onClick={this.filterByFuel}>
            Filter events where fuel level is under 15%
          </Checkbox>
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
