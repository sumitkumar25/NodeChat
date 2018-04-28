var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'testUser';
        let text = 'testMessage';
        let res = generateMessage(from, text);
        expect(res).toMatchObject({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        var from = 'test';
        var lat = 10;
        var long = 20;
        var url = 'https://www.google.com/maps?q=10,20'
        let res = generateLocationMessage(from, lat, long);
        expect(res).toMatchObject({ from, url });
    });
});