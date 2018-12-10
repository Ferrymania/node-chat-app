const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{
    it('should reject non-string values',()=>{
        let str = 2123;
        expect(isRealString(str)).toBe(false);
    });

    it('should reject string with only spaces',()=>{
        let str = '      ';
        expect(isRealString(str)).toBe(false);
    });

    it('should allow string with non-sapce characters',()=>{
        let res = isRealString('  dada');
        expect(res).toBe(true);
    });
});