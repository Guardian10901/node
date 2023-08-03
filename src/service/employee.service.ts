import { Employee } from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository) {

    }
    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRepository.find();
    }
    getEmployeeId = async (id: number): Promise<Employee | null> => {
        return this.employeeRepository.findOneBy(id);
    }
    createEmployee = async (name: string, email: string): Promise<Employee> => {
        const newemployee = new Employee();
        newemployee.name = name;
        newemployee.email = email;
        const employee = await this.employeeRepository.createEmployee(newemployee);
        return employee;
    }
    // updateEmpoyee =async (name: string, email: string):Promise<Employee> =>{

    // }
    deleteEmployee = async (id : number):Promise<void> =>{
        const employee = await this.employeeRepository.delete(id);

    }


}
export default EmployeeService;