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
            
            return this.employeerepository.findOne(
                { where:{id:id},
                  relations:{
                    address:true
                }
                }
            );
        }
        createEmployee(newemployee:Employee){
            return this.employeerepository.save(newemployee);
            
        }
        async update(employee:Employee){
            return this.employeerepository.update({id:employee.id},employee);


        }
        async delete(employee:Employee){
           
            return this.employeerepository.softRemove(employee);


        }
        // findAddress(employee:Employee){
        //     return this.employeerepository.findOne({
        //         employee:employee
        //     })
        // }

    
    } 
export default EmployeeRepository;