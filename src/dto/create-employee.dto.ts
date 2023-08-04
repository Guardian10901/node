import { IsNotEmpty, IsString,IsEmail, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
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
}

export default CreateEmployeeDto;