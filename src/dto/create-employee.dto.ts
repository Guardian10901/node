import { IsNotEmpty, IsString,IsEmail, ValidateNested, IsEnum, IsNumber, IsDate } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import { Role } from "../../utils/role.enum";
import Department from "../entity/department.entity";
class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string
    @IsNotEmpty()
    joiningDate:string;
    
    experience:number;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    address:CreateAddressDto;

    @IsNotEmpty()
    departmentId:number;


    @IsNotEmpty()
    @IsEnum(Role)//only accept values from erum
    role:Role

}

export default CreateEmployeeDto;