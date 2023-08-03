import Address from "../entity/address.entity";
import { Employee } from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository) {

    }
    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRepository.find();
    }
    getEmployeeId = async (id: number): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findOneBy(id);
        if(!employee){
            throw new HttpException(404,`Employee not found for id:${id}`);

        }
        return employee;
    }
    createEmployee = async (name: string, email: string,address:Address): Promise<Employee> => {
        const newemployee = new Employee();
        newemployee.name = name;
        newemployee.email = email;

        const newAddress = new Address();
        newAddress.line1=address.line1;
        newAddress.pincode=address.pincode;
        newemployee.address = newAddress
        const employee = await this.employeeRepository.createEmployee(newemployee);
        return employee;
    }
    // updateEmpoyee =async (id :number,name: string, email: string,address:Address):Promise<Employee> =>{
    //     const employee =await this.getEmployeeId(id);
            // employee.name =name;


    // }
    deleteEmployee = async (id : number):Promise<void> =>{
        const employee= await this.getEmployeeId(id);
         await this.employeeRepository.delete(employee);

    }


}
export default EmployeeService;