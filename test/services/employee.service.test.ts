import { DataSource } from "typeorm";
import EmployeeService from "../../src/service/employee.service";
import { Employee } from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import { when } from "jest-when";
import { Role } from "../../utils/role.enum";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../../src/dto/create-employee.dto";
import DepartmentRepository from "../../src/repository/department.repository";
import Department from "../../src/entity/department.entity";
import {departmentServices} from "../../src/route/department.route"
import DepartmentService from "../../src/service/department.service";
import bcrypt from "bcrypt";
import Address from "../../src/entity/address.entity";
import jsonwebtoken from "jsonwebtoken"
describe("Employee Services tests", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(async () => {
        const dataSourse: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = await new EmployeeRepository(dataSourse.getRepository(Employee))
        employeeService = new EmployeeService(employeeRepository, departmentServices)
      
    });
    describe("Test for getallEmployees", () => {
        test(' Test get all Employees', async () => {
            const mockedFunction = jest.fn();

            when(mockedFunction).calledWith().mockResolvedValueOnce([{
                "id": 4, 
                "name": "Ashok",

                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            }]);
            employeeRepository.find = mockedFunction;
            const employee = await employeeService.getAllEmployees();
            expect(employee).toStrictEqual([{
                "id": 4,
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            }]);
        })
    })
    describe('Test for getEmployeeById', () => {

        test(' Test Employee  for Id', async () => {
            const mockedFunction = jest.fn();

            when(mockedFunction).calledWith(4).mockResolvedValueOnce({
                "id": 4, 
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
            employeeRepository.findOneBy = mockedFunction;
            const employee = await employeeService.getEmployeeId(4);
            expect(employee).toStrictEqual({
                "id": 4, 
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
        })
        // test('Test for Spying get all Employee', async () => {
        //     const spy = jest.spyOn(employeeRepository, 'find');
        //     spy.mockResolvedValueOnce([]);
        //     const users = await employeeService.getAllEmployees();
        //     expect(spy).toStrictEqualCalledTimes(1);
        //     expect(users).toEqual([]);
        // })

    })
    describe('Test for CreateEmployee ', () => {
        test(' Test for creating new Employee', async () => {
            const mockedFunction = jest.fn();            
            const mockedDepartmentFunction = jest.fn();
            departmentServices.getDepartmentId =  mockedDepartmentFunction;
            employeeRepository.createEmployee = mockedFunction;
            
            const employeedto: CreateEmployeeDto = plainToInstance(CreateEmployeeDto, {
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            })

            when(mockedDepartmentFunction).calledWith(9).mockResolvedValueOnce({
                "id": 9,
                "createdAt": "2023-08-06T10:32:56.054Z",
                "updatedAt": "2023-08-06T10:32:56.054Z",
                "deletedAt": null,
                "name": "Hr",
                "employees": [
                    {
                        
                        "createdAt": "2023-08-06T13:29:30.458Z",
                        "updatedAt": "2023-08-06T13:29:30.458Z",
                        "deletedAt": null,
                        "name": "Ashok",
                        "username": "ash",
                        "password": "$2b$10$1Bse2yUt7IVuEjOJ2tBo0O46fQgL8gbuZPrurxM6xpN56cjt4LgAy",
                        "experience": 8,
                        "joiningDate": "11/02/2012",
                        "role": "Admin"
                    }
                ]
            })
            
            // const employeePassed = new Employee();
            // employeePassed.name = "Ashok";
            // employeePassed.username = "ash";
            // employeePassed.password = "mockpasswordhash";
            // employeePassed.joiningDate ="11/02/2012";
            // employeePassed.experience = 8;
            // employeePassed.department = await departmentServices.getDepartmentId(9);
            // employeePassed.role =Role.ADMIN;
            // const address = new Address();
            // address.address_line_1 ="Edachira";
            // address.address_line_2 = "Kakkanad";
            // address.city = "Ernakulam";
            // address.state="Kerala";
            // address.country="India";
            // address.pincode="682024";
            // employeePassed.address=address;
         


            mockedFunction.mockResolvedValueOnce({
                "id":4,
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
            bcrypt.hash=jest.fn().mockResolvedValue("mockpasswordhash");
                    
           
            
            const employee = await employeeService.createEmployee(employeedto);
           
            expect(employee).toStrictEqual({
                "id":4,
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
        })

    })
    describe('Test for updateEmployee ', () => {
        test(' Test for updating an Employee', async () => {
            const mockedFunction = jest.fn();
            const mockedSubFunction =jest.fn()
            when(mockedSubFunction).calledWith(4).mockResolvedValueOnce({
                "id": 4, 
                "name": "Ashok",
                "username": "ash",
                "password": "mockpasswordhash",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
            employeeRepository.findOneBy = mockedSubFunction;
            const employeedto = plainToInstance(CreateEmployeeDto, {

                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            })
            

            when(mockedFunction).calledWith(4, employeedto).mockResolvedValueOnce({
                "id": 4, 
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
            bcrypt.hash=jest.fn().mockResolvedValue("mockpasswordhash");
            employeeRepository.update= mockedFunction;

            const employee = await employeeService.updateEmployee(4, employeedto);
            expect(employee).toStrictEqual({
                "id": 4,
                "name": "Ashok",
                "username": "ash",
                "password": "mockpasswordhash",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
        })

    })
    describe('Test for deleteEmployee ', () => {
        test(' Test for deleting an Employee', async () => {
            const mockedFunction = jest.fn();
            const employeedto = plainToInstance(CreateEmployeeDto, {

                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            })
            const mockedSubFunction =jest.fn()
            when(mockedSubFunction).calledWith(4).mockResolvedValueOnce({
                "id": 4, 
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
            employeeRepository.findOneBy = await mockedSubFunction;
            when(mockedFunction).calledWith().mockResolvedValueOnce({
                "id": 4, 
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
            employeeRepository.delete = await mockedFunction;

            const employee = await employeeService.deleteEmployee(4);
            expect(employee).toStrictEqual({
                "id": 4,
                "name": "Ashok",
                "username": "ash",
                "password": "ashok",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            });
        })

    })
    describe("Test for login",()=>{
        test(' Test for login for an Employee', async () => {
            const mockedFunction = jest.fn();
            jsonwebtoken.sign=jest.fn().mockReturnValue("eyJhbGciOiJ");
            bcrypt.compare=jest.fn().mockResolvedValue(true)
            when(mockedFunction).calledWith("ash").mockResolvedValueOnce({
                "id": 4,
                "name": "Ashok",
                "username": "ash",
                "password": "$2b$10$1Bse2yUt7IVuEjOJ2tBo0O46fQgL8gbuZPrurxM6xpN56cjt4LgAy",
                "joiningDate": "11/02/2012",
                "experience": 8,
                "departmentId": 9,
                "role": "Admin",
                "address": {
                    "address_line_1": "Edachira",
                    "address_line_2": "Kakkanad",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India",
                    "pincode": "682024"
                }
            })
            employeeRepository.findByUsername =await mockedFunction
            const result = await employeeService.loginEmployee("ash","ashok");
            expect(result.token).toStrictEqual("eyJhbGciOiJ")
            

    })
})
})
