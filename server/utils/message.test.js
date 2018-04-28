var expect = require('expect');
var { generateMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let res = generateMessage('testUser', 'testMessage');
        expect(res).toInclude({ from, text });
    });
});