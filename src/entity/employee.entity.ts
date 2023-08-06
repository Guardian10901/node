import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../../utils/role.enum";
import Department from "./department.entity";


@Entity('employees')
class Employee extends AbstractEntity{
   
    @Column()
    name: string;
  
    @Column()
    username: string;
   
    @Column()
    password:string;
    @Column()
    experience:number;
    @Column()
    joiningDate:string;
    @ManyToOne(()=>Department,(department)=>department.employees,{cascade:true})
    @JoinColumn({name:'departmentId'})
    department:Department
    @Column({default:Role.Delevoper})
    role:Role
   
    @OneToOne(()=>Address,(address)=>address.employee,{cascade:true})
    address :Address;
   

}
export { Employee };
