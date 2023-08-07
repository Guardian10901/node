import { DataSource } from "typeorm";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";
import Department from "../../src/entity/department.entity";
import { when } from "jest-when";
import { plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../../src/dto/create-department.dto";


describe("Department Services tests", () => {
    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;
    
    beforeAll(async () => {
        const dataSourse: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        departmentRepository = await new DepartmentRepository(dataSourse.getRepository(Department))
        departmentService = await new DepartmentService(departmentRepository)
       
    });
    describe("Test for getallDepartments", () => {
        test(' Test get all departments', async () => {
            const mockedFunction = jest.fn();

            when(mockedFunction).calledWith().mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            });
            departmentRepository.find = mockedFunction;
            const department = await departmentService.getAllDepartments();
            expect(department).toStrictEqual({
                "id":9,
                "name":"Hr",

            });
        })
    })
    describe('Test for getDepartmentById', () => {

        test(' Test Department  for Id', async () => {
            const mockedFunction = jest.fn();

            when(mockedFunction).calledWith(9).mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            });
            departmentRepository.findOneBy = mockedFunction;
            const employee = await departmentService.getDepartmentId(9);
            expect(employee).toStrictEqual({
                "id":9,
                "name":"Hr",

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
    describe('Test for CreateDepartment ', () => {
        test(' Test for creating new department', async () => {
            const mockedFunction = jest.fn();
            const departmentdto = plainToInstance(CreateDepartmentDto,{
        
                "name":"Hr",

            } )
            when (mockedFunction).calledWith(departmentdto).mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            })
           
            departmentRepository.createDepartment = await mockedFunction;

            
            const department = await departmentService.createDepartment(departmentdto);
            expect(department).toStrictEqual({
                "id":9,
                "name":"Hr",

            });
        })

    })
    describe('Test for updateDepartment ', () => {
        test(' Test for updating an Department', async () => {
            const mockedFunction = jest.fn();
            when (mockedFunction).calledWith(9).mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            })
           
            departmentRepository.updateDepartment = mockedFunction;

            const departmentdto = plainToInstance(CreateDepartmentDto,{
        
                "name":"Hr",

            } )
            const mockedFunctionID = jest.fn();
            when (mockedFunctionID).calledWith(9).mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            })
            departmentRepository.findOneBy=mockedFunctionID;

            const department = await departmentService.upadateDepartment(9,departmentdto);
            expect(department).toStrictEqual({
                "id":9,
                "name":"Hr",

            });
        })

    })
    describe('Test for deleteDepartment ', () => {
        test(' Test for deleting an Department', async () => {
            const mockedFunction = jest.fn();
            when (mockedFunction).calledWith(9).mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            })
           
            departmentRepository.deleteDepartment = await mockedFunction;
            const mockedFunctionID = jest.fn();
            when (mockedFunctionID).calledWith(9).mockResolvedValueOnce({
                "id":9,
                "name":"Hr",

            })
            departmentRepository.findOneBy=mockedFunctionID;
            const departmentdto = plainToInstance(CreateDepartmentDto,{
        
                "name":"Hr",

            } )
            const department = await departmentService.deleteDepartment(9);
            expect(department).toStrictEqual({
                "id":9,
                "name":"Hr",

            });
        })

    })
})