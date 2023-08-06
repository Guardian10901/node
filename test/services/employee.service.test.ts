import { DataSource } from "typeorm";
import EmployeeService from "../../src/service/employee.service";
import { Employee } from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import { when } from "jest-when";
import { Role } from "../../utils/role.enum";

describe("Employee Services tests", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(() => {
        const dataSourse: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSourse.getRepository(Employee))
        employeeService = new EmployeeService(employeeRepository)
    });
    describe("Test for getallEmployee",async()=>{
        const mockedFunction = jest.fn();

        when(mockedFunction).calledWith(1).mockResolvedValueOnce({
            id: 1, name: "vidya", email: "vv@gmail.com", address: {
                line1: "abc", pincode: "1236"
            }, age: 25, password: "123654789", role: Role.Delevoper
        });
        employeeRepository.findOneBy = mockedFunction;
        const employee = await employeeService.getEmployeeId(1);
        expect(employee).toStrictEqual({
            id: 1, name: "vidya", email: "vv@gmail.com", address: {
                line1: "abc", pincode: "1236"
            }, age: 25, password: "123654789", role: Role.Delevoper
        });
    })
    describe('Test for getEmployeeById', () => {

        test(' Test Employee  for Id', async () => {
            const mockedFunction = jest.fn();

            when(mockedFunction).calledWith(1).mockResolvedValueOnce({
                id: 1, name: "vidya", email: "vv@gmail.com", address: {
                    line1: "abc", pincode: "1236"
                }, age: 25, password: "123654789", role: Role.Delevoper
            });
            employeeRepository.findOneBy = mockedFunction;
            const employee = await employeeService.getEmployeeId(1);
            expect(employee).toStrictEqual({
                id: 1, name: "vidya", email: "vv@gmail.com", address: {
                    line1: "abc", pincode: "1236"
                }, age: 25, password: "123654789", role: Role.Delevoper
            });
        })
        test('Test for Spying get all Employee', async () => {
            const spy = jest.spyOn(employeeRepository, 'find');
            spy.mockResolvedValueOnce([]);
            const users = await employeeService.getAllEmployees();
            expect(spy).toBeCalledTimes(1);
            expect(users).toEqual([]);
        })

    })
}
)
