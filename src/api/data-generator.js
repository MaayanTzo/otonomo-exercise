import faker from 'faker'

export default function generateCarData(vin) {
  return {
    vin,
    timestamp: timestamp(),
    fuel: fuelLevel(),
    wiperFluid: wiperFluid(),
    location: location(),
  }
}

function timestamp() {
  return new Date().getTime()
}

function fuelLevel() {
  return percentage()
}

function wiperFluid() {
  return percentage()
}

function location() {
  return {
    lat: coordinate(),
    lng: coordinate(),
  }
}

function coordinate() {
  return faker.random
    .number({ min: 0, max: 25, precision: 0.000000001 })
    .toFixed(9)
}

function percentage() {
  return faker.random.number({ min: 0, max: 1, precision: 0.01 }).toFixed(2)
}
