import { expect } from "chai";
import { report } from "../weatherreport.mjs";

describe('Weather Report Tests', () => {
    it('should report rainy weather for various high temperature and precipitation combinations', () => {
        const testCases = [
            {
                name: "high temp, high precip, high wind",
                readings: {
                    temperatureInC: 50,
                    precipitation: 70,
                    humidity: 26,
                    windSpeedKMPH: 52
                }
            },
            {
                name: "very high values",
                readings: {
                    temperatureInC: 100,
                    precipitation: 100,
                    humidity: 100,
                    windSpeedKMPH: 100
                }
            }
        ];

        testCases.forEach(testCase => {
            const sensorStub = () => testCase.readings;
            const weather = report(sensorStub);
            expect(weather, `Failed for ${testCase.name}`).to.include("rain");
        });
    });

    it('should report partly cloudy when temperature is high and precipitation is moderate', () => {
        const sensorStub = () => ({
            temperatureInC: 30,
            precipitation: 40,
            humidity: 26,
            windSpeedKMPH: 20
        });
        
        const weather = report(sensorStub);
        expect(weather).to.equal("Partly Cloudy");
    });

    it('should report sunny day when temperature is low', () => {
        const sensorStub = () => ({
            temperatureInC: 20,
            precipitation: 70,
            humidity: 26,
            windSpeedKMPH: 52
        });
        
        const weather = report(sensorStub);
        expect(weather).to.equal("Sunny Day");
    });

    it('should report heavy rain when temperature is high, precipitation is high, but wind speed is low', () => {
        const sensorStub = () => ({
            temperatureInC: 30,
            precipitation: 65,
            humidity: 80,
            windSpeedKMPH: 30
        });
        
        const weather = report(sensorStub);
        expect(weather).to.include("rain");
    });

    it('should handle boundary conditions', () => {
        const testCases = [
            {
                name: "temperature boundary",
                readings: {
                    temperatureInC: 25,
                    precipitation: 70,
                    humidity: 26,
                    windSpeedKMPH: 52
                },
                expected: "Sunny Day"
            },
            {
                name: "precipitation lower boundary",
                readings: {
                    temperatureInC: 30,
                    precipitation: 20,
                    humidity: 26,
                    windSpeedKMPH: 20
                },
                expected: "Partly Cloudy"
            },
            {
                name: "precipitation upper boundary",
                readings: {
                    temperatureInC: 30,
                    precipitation: 60,
                    humidity: 26,
                    windSpeedKMPH: 20
                },
                expected: "Sunny Day"
            },
            {
                name: "wind speed boundary",
                readings: {
                    temperatureInC: 30,
                    precipitation: 70,
                    humidity: 26,
                    windSpeedKMPH: 50
                },
                expected: "Sunny Day"
            }
        ];

        testCases.forEach(testCase => {
            const sensorStub = () => testCase.readings;
            const weather = report(sensorStub);
            expect(weather, `Failed for ${testCase.name}`).to.equal(testCase.expected);
        });
    });

    it('should handle edge cases', () => {
        const testCases = [
            {
                name: "zero values",
                readings: {
                    temperatureInC: 0,
                    precipitation: 0,
                    humidity: 0,
                    windSpeedKMPH: 0
                },
                expected: "Sunny Day"
            },
            {
                name: "negative values",
                readings: {
                    temperatureInC: -10,
                    precipitation: -20,
                    humidity: -30,
                    windSpeedKMPH: -40
                },
                expected: "Sunny Day"
            }
        ];

        testCases.forEach(testCase => {
            const sensorStub = () => testCase.readings;
            const weather = report(sensorStub);
            expect(weather, `Failed for ${testCase.name}`).to.equal(testCase.expected);
        });
    });
}); 