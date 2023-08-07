import { Role } from "../../utils/role.enum";
import CreateAddressDto from "../dto/create-address.dto";
import CreateEmployeeDto from "../dto/create-employee.dto";
import Address from "../entity/address.entity";
import { Employee } from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import DepartmentRepository from "../repository/department.repository";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import dataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import logger from "../../utils/log.winston";
import * as dotenv from "dotenv";
import DepartmentService from "./department.service";
dotenv.config({path: "dist/.env" });

class EmployeeService {
  
   
    constructor(private employeeRepository: EmployeeRepository, private departmentService: DepartmentService) {

    }
    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRepository.find();
    }
    getEmployeeId = async (id: number): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findOneBy(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found for id:${id}`);

        }
        return employee;
    }
    createEmployee = async (employeedto: CreateEmployeeDto): Promise<Employee> => {
        const newemployee = new Employee();
        newemployee.name = employeedto.name;
        newemployee.username = employeedto.username;
        newemployee.experience = employeedto.experience;
        newemployee.joiningDate = employeedto.joiningDate;
        
        const department = await this.departmentService.getDepartmentId((employeedto.departmentId));
        newemployee.department = department;
     
        const newAddress = new Address();
        newAddress.address_line_1 = employeedto.address.address_line_1;
        newAddress.address_line_2 = employeedto.address.address_line_2;
        newAddress.city = employeedto.address.city;
        newAddress.state = employeedto.address.state;
        newAddress.country = employeedto.address.country;
        newAddress.pincode = employeedto.address.pincode;
        newemployee.address = newAddress//relation of foreign key
        
        newemployee.password = await bcrypt.hash(employeedto.password, 10)
        newemployee.role = employeedto.role;
        const employee = await this.employeeRepository.createEmployee(newemployee);

        return employee;
    }
    updateEmployee = async (id:number,updateEmployeedto: CreateEmployeeDto): Promise<Employee> => {
        const employee = await this.getEmployeeId(id);
        employee.name = updateEmployeedto.name;
        employee.username = updateEmployeedto.username;
        employee.address.address_line_1 = updateEmployeedto.address.address_line_1;
        employee.address.address_line_2= updateEmployeedto.address.address_line_2;
        employee.address.city = updateEmployeedto.address.city;
        employee.address.state = updateEmployeedto.address.state;
        employee.address.country = updateEmployeedto.address.country;
        employee.address.pincode = updateEmployeedto.address.pincode;
       
        await this.employeeRepository.update(employee)
        return employee


    }
    deleteEmployee = async (id: number): Promise<Employee> => {
        const employee = await this.getEmployeeId(id);
        await this.employeeRepository.delete(employee)
        return employee;

    }
    loginEmployee = async (username: string, password: string) => {
        const employee = await this.employeeRepository.findByUsername(username);
        if (!employee) {
            logger.error('Employee not found')
            throw new HttpException(401, "Employee not found");
        }
        
        const result = await bcrypt.compare(password, employee.password);
        if (!result) {
            logger.error('Incorrect  Username or Password')
            throw new HttpException(401, "Incorrect  Username or Password")
        }
        const payload = {
            name: employee.name,
            username: employee.username,
            role: employee.role

        }
        const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "24h"
        });
        return {token,employee}

    }


}
export default EmployeeService;