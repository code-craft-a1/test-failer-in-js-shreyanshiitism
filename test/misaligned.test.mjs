import { expect } from 'chai';
import { print_color_map } from '../misaligned.mjs';

describe('Color Map Tests', () => {
    const captureConsoleOutput = (fn) => {
        const originalConsoleLog = console.log;
        const logs = [];
        console.log = (...args) => logs.push(args.join(' '));
        fn();
        console.log = originalConsoleLog;
        return logs;
    };

    it('should return correct number of color pairs', () => {
        const result = print_color_map();
        expect(result).to.equal(25);
    });

    it('should have continuous numbering from 0 to 24', () => {
        const logs = captureConsoleOutput(print_color_map);
        const numbers = logs.map(line => parseInt(line.split('|')[0].trim()));
        const expectedNumbers = Array.from({length: 25}, (_, i) => i);
        expect(numbers).to.deep.equal(expectedNumbers);
    });

    it('should have correct color pair combinations', () => {
        const logs = captureConsoleOutput(print_color_map);
        expect(logs[0]).to.equal('0 | White | Blue');
        expect(logs[1]).to.equal('1 | White | Orange');
        expect(logs[2]).to.equal('2 | White | Green');
        expect(logs[5]).to.equal('5 | Red | Blue');
        expect(logs[6]).to.equal('6 | Red | Orange');
    });

    it('should have consistent formatting', () => {
        const logs = captureConsoleOutput(print_color_map);
        logs.forEach(line => {
            expect(line).to.match(/^\d+ \| [A-Za-z]+ \| [A-Za-z]+$/);
        });
    });
}); 