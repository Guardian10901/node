import { IsNotEmpty, IsString,IsEmail, ValidateNested, IsEnum } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import { Role } from "../../utils/role.enum";
class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    address:CreateAddressDto;

    age:number

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsEnum(Role)//only accept values from erum
    role:Role
}

export default CreateEmployeeDto;