import express, { NextFunction, Response } from "express";
import EmployeeService from "../service/employee.service";
import { plainToClass, plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import ValidateException from "../exception/validate.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
class EmployeeController {
    public router: express.Router;
    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", authenticate,authorize,this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeId);
        this.router.post("/", this.createEmployee);
        this.router.put("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteEmployee);
        this.router.post("/login",this.loginEmployee);

    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employee = await this.employeeService.getAllEmployees();
        res.status(200).send(employee);
    }
    getEmployeeId = async (req: express.Request, res: express.Response, next: NextFunction,) => {
        try {
            const employeeId: number = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeId(employeeId);
            res.status(200).send(employee);
        }
        catch (error) {
            next(error);

        }
    }
    createEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            
            const createEmployee = plainToInstance(CreateEmployeeDto, req.body);

            const errors = await validate(createEmployee);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new ValidateException(404,"Vaildation error",errors);

            }

            const employee = await this.employeeService.createEmployee(createEmployee.name, createEmployee.email, createEmployee.address,createEmployee.age,createEmployee.password,createEmployee.role)
            res.status(201).send(employee);
        } catch (error) {
            next(error);
        }
    }
    deleteEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const employeeId: number = Number(req.params.id);
            const employee = await this.employeeService.deleteEmployee(employeeId);
            res.status(204).send(employee)
        } catch (error) {
            next(error)
        }

    }
    updateEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const employeeId: number = Number(req.params.id);
            const { name, email, address } = req.body;
            const updateEmployee = plainToInstance(CreateEmployeeDto, req.body);

            const errors = await validate(updateEmployee);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new ValidateException(404,"Vaildation error",errors);

            }
            const employee = await this.employeeService.updateEmployee(employeeId, name, email, address)
            res.status(200).send(employee);
        }
        catch (error) {
            next(error)
        }
    }
    public loginEmployee=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        const { email , password } =req.body;
        try{
            const token = await this.employeeService.loginEmployee(email,password);
            res.status(200).send({data:token})
        }catch(error)
        {
            next(error)
        }

    }
}
export default EmployeeController;