import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../../utils/role.enum";


@Entity('employees')
class Employee extends AbstractEntity{
   
    @Column()
    name: string;
    @Column({nullable:true})
    age:number;
    @Column()
    email: string;
    @OneToOne(()=>Address,(address)=>address.employee,{cascade:true})
    address :Address;
    @Column()
    password:string;
    @Column({default:Role.Delevoper})
    role:Role

}
export { Employee };
