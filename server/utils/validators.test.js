var expect = require('expect');
var { isRealString } = require('./validators');
describe('test isRealString', () => {
    it('should reject non string', () => {
        let data = 10;
        let res = isRealString(data);
        expect(res).toBe(false);
    });
    it('should reject non string', () => {
        let data = '    ';
        let res = isRealString(data);
        expect(res).toBe(false);
    });
    it('should reject non string', () => {
        let data = 'test';
        let res = isRealString(data);
        expect(res).toBe(true);
    })
})