let expect = require('expect');
let {generateMessage,generateLocationMessage} = require('./message');
describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{
        let from = 'Tom';
        let text = 'Some message';
        let message = generateMessage(from,text);
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
        //expect(message).toInclude({from,text});
        expect(message).toMatchObject({from,text});
    });
});

describe('generateMessage',()=>{
    it('should generate correct location object',()=>{
        let from = 'admin';
        let latitude = 34.23;
        let longitude = 123.213;
        let message = generateLocationMessage(from,latitude,longitude);
        let url = 'https://www.google.com/maps?q=34.23,123.213';
        expect(message).toMatchObject({from,url});
        expect(typeof message.createdAt).toBe('number');
    });
});