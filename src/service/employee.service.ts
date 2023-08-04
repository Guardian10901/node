import { Role } from "../../utils/role.enum";
import CreateAddressDto from "../dto/create-address.dto";
import Address from "../entity/address.entity";
import { Employee } from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository) {

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
    createEmployee = async (name: string, email: string, address: CreateAddressDto,age:number,password:string,role:Role): Promise<Employee> => {
        const newemployee = new Employee();
        newemployee.name = name;
        newemployee.email = email;
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        newemployee.address = newAddress//relation of foreign key
        newemployee.age=age;
        newemployee.password= await bcrypt.hash(password,10)
        newemployee.role=role;
        const employee = await this.employeeRepository.createEmployee(newemployee);
       
        return employee;
    }
    updateEmployee = async (id: number, name: string, email: string, address: Address): Promise<Employee> => {
        const employee = await this.getEmployeeId(id);
        employee.name = name;
        employee.email = email;
        employee.address.line1=address.line1;
        employee.address.pincode=address.pincode;
        console.log(employee)
        await this.employeeRepository.update(employee)
        return employee


    }
    deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.getEmployeeId(id);
        await this.employeeRepository.delete(employee);

    }
    loginEmployee = async (email:string,password:string)=>{
        const employee = await this.employeeRepository.findByEmail(email);
        if(!employee){
            throw new HttpException(401,"Employee not found");
        }
        const result =await bcrypt.compare(password,employee.password);
        if(!result)
        {
            throw new HttpException(401,"Incorrect  Username or Password")
        }
        const payload={
            name:employee.name,
            email:employee.email,
            role:employee.role

        }
        const token = jsonwebtoken.sign(payload,"ABCDX",{
            expiresIn:"1h"});
        return(token)

    }


}
export default EmployeeService;