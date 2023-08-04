import MathUtil from "../utils/math.util";
describe('Test average function',()=>{
    MathUtil.sum = jest.fn().mockReturnValueOnce(8)
    test('Test average sucess case1',()=>{
        expect(MathUtil.average(4,4)).toBe(4);
    })

})
