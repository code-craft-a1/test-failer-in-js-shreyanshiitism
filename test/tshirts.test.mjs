import { expect } from 'chai';
import { size } from '../tshirts.mjs';

describe('T-shirt Size Tests', () => {
    it('should handle boundary conditions correctly', () => {
        expect(size(38)).to.equal('M');
        expect(size(42)).to.equal('M');
    });

    it('should return correct size for typical measurements', () => {
        expect(size(37)).to.equal('S');
        expect(size(40)).to.equal('M');
        expect(size(43)).to.equal('L');
    });

    it('should handle edge cases', () => {
        expect(size(0)).to.equal('S');
        expect(size(-1)).to.equal('S');
        expect(size(100)).to.equal('L');
    });
}); 