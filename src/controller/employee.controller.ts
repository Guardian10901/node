import express, { NextFunction, Response } from "express";
import EmployeeService from "../service/employee.service";
import { plainToClass, plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import ValidateException from "../exception/validate.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../../utils/role.enum";
import employeeService from "../service/employee.service";
import logger from "../../utils/log.winston";
import { Employee } from "../entity/employee.entity";
import { Timestamp } from "typeorm";
import HttpException from "../exception/http.exception";
class EmployeeController {
    public router: express.Router;
    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/",authenticate,authorize([Role.ADMIN,Role.HR,Role.Delevoper,Role.UI]) ,this.getAllEmployees);
        this.router.get("/:id",authenticate,authorize([Role.ADMIN,Role.HR,Role.Delevoper,Role.UI]) ,this.getEmployeeId);
        this.router.post("/", authenticate,authorize([Role.ADMIN,Role.HR]) ,this.createEmployee);
        this.router.put("/:id", authenticate,authorize([Role.ADMIN,Role.HR]) ,this.updateEmployee);
        this.router.delete("/:id",authenticate,authorize([Role.ADMIN,Role.HR]) ,this.deleteEmployee);
        this.router.post("/login" ,this.loginEmployee);

    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const reqStart=Date.now();
        const employee = await this.employeeService.getAllEmployees();
        logger.info("All Employees sucessfully fetched ")
        res.status(200).send({data:employee,error:null,message:"OK",meta:{length:employee.length,took:Date.now()-reqStart,total:employee.length}});
        
    }
    getEmployeeId = async (req: express.Request, res: express.Response, next: NextFunction,) => {
        try {const reqStart=Date.now();
            const employeeId: number = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeId(employeeId);
            if(!employee){
                throw new HttpException(404,"Not Found");
            }
            logger.info(`Employee with id ${employeeId} fetched suceessfully `)
            res.status(200).send({data:employee,error:null,message:"OK",meta:{length:"1",took:Date.now()-reqStart,total:"1"}});
        }
        catch (error) {
            
            logger.error('Employee with id ${employeeId} fetch failed')
            next(error);

        }
    }
    createEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {const reqStart=Date.now();
            
            const createEmployee = plainToInstance(CreateEmployeeDto, req.body);

            const errors = await validate(createEmployee);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                logger.error('Validation Error')
                throw new ValidateException(errors);

            }

            const employee = await this.employeeService.createEmployee(createEmployee);
            if(!employee){
                throw new HttpException(404,"Not Found");
            }
            logger.info("Employees created sucessfully  ")
            res.status(201).send({data:employee,error:null,message:"OK",meta:{length:"1",took:Date.now()-reqStart,total:"1"}});
        } catch (error) {
            logger.error('Create Employee failed')
            next(error);

        }
    }
    deleteEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const employeeId: number = Number(req.params.id);
            const employee = await this.employeeService.deleteEmployee(employeeId);
            logger.info(`Employee id :${employeeId} deleted sucessfully`)
            if(!employee){
                throw new HttpException(404,"Not Found");
            }
            res.status(204).send()
        } catch (error) {
            logger.error('Employee deletion failed')
            next(error)
        }

    }
    updateEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {const reqStart=Date.now();
            const employeeId: number = Number(req.params.id);
            const { name, email, address } = req.body;
            const updateEmployee = plainToInstance(CreateEmployeeDto, req.body);

            const errors = await validate(updateEmployee);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                logger.error('Validation Error')
                throw new ValidateException(errors);

            }
            const employee = await this.employeeService.updateEmployee(employeeId, updateEmployee)
            if(!employee){
                throw new HttpException(404,"Not Found");
            }
            logger.info(`Employee id :${employeeId} updated sucessfully`)
            res.status(200).send({data:employee,error:null,message:"OK",meta:{length:"1",took:Date.now()-reqStart,total:"1"}});
        }
        catch (error) {
            logger.error('Employee updation failed')
            next(error)
        }
    }
    public loginEmployee=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        const reqStart=Date.now();
        const { email , password } =req.body;
        try{
            const {token,employee} = await this.employeeService.loginEmployee(email,password);
            if(!employee){
                throw new HttpException(404,"Not Found");
            }

            res.status(200).send({data:{token:token,employeeDetails:employee},error:null,message:"OK",meta:{length:"1",took:Date.now()-reqStart,total:"1"}})
        }catch(error)
        {   logger.error('Login failed')
            next(error)
        }

    }
}
export default EmployeeController;