let expect = require('expect');
let {generateMessage} = require('./message');
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