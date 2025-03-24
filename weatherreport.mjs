import { expect } from "chai";

function sensorStub() {
    return {
        temperatureInC: 50,
        precipitation: 70,
        humidity: 26,
        windSpeedKMPH: 52
    };
}

function report(sensorReader) {
    const readings = sensorReader();
    let weather = "Sunny Day";

    if (readings.temperatureInC > 25) {
        if (readings.precipitation >= 20 && readings.precipitation < 60) {
            weather = "Partly Cloudy";
        } else if (readings.windSpeedKMPH > 50) {
            weather = "Alert, Stormy with heavy rain";
        }
    }
    return weather;
}

function testRainy() {
    const weather = report(sensorStub);
    console.log(weather);
    expect(weather).includes("rain", "Test failed: Expected 'rain' in weather description");
}

function testHighPrecipitation() {
    // This instance of stub needs to be different-
    // to give high precipitation (>60) and low wind-speed (<50)

    const weather = report(sensorStub);

    // strengthen the assert to expose the bug
    // (function returns Sunny day, it should predict rain)
    expect(weather).is.not.empty;
}

testRainy();
testHighPrecipitation();
console.log("All is well (maybe!)");
