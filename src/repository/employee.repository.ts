import { DataSource, Repository } from "typeorm";
import dataSource from "../db/postgres.db";
import { Employee } from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private employeerepository:Repository<Employee>){
    
    }
        find():Promise<Employee[]>{

           
            return this.employeerepository.find();
            
        }
        findOneBy(id :number):Promise<Employee>{
            
            return this.employeerepository.findOneBy(
                {
                    id:id
                }
            );
        }
        createEmployee(newemployee:Employee){
            return this.employeerepository.save(newemployee);
            
        }
        async update(id:number){
            

        }
        async delete(id :number){
            const employee = await this.employeerepository.findOneBy(
                {
                id:id
            })
            return this.employeerepository.softRemove(employee);


        }

    
    } 
export default EmployeeRepository;