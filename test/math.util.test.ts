import { when } from "jest-when";
import MathUtil from "../utils/math.util";
describe('Test average function',()=>{
    // MathUtil.sum = jest.fn().mockReturnValueOnce(8)
    test('Test average sucess case1',()=>{
        const mockedFunction =jest.fn();
        MathUtil.sum=mockedFunction;
        when(mockedFunction ).calledWith(4,4).mockReturnValueOnce(8);
        expect(MathUtil.average(4,4)).toBe(4);
    })

})
