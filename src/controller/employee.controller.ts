import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToClass, plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
class EmployeeController {
    public router: express.Router;
    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeId);
        this.router.post("/", this.createEmployee);
        this.router.put("/", this.updateEmployee)
        this.router.delete("/:id", this.deleteEmployee);
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
            const { name, email, address } = req.body
            const createEmployee =plainToInstance(CreateEmployeeDto,req.body);

            const errors = await validate(createEmployee);
            if(errors.length>0){
                console.log(JSON.stringify(errors));

            }

            const employee = await this.employeeService.createEmployee(name, email, address);
            res.status(201).send(employee);
        } catch (error) { next(error) }
    }
    deleteEmployee = async (req: express.Request, res: express.Response) => {
        const employeeId: number = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployee(employeeId);

        res.status(204).send(employee)

    }
    updateEmployee = async (req: express.Request, res: express.Response) => {
        // const employeeId: number = Number(req.params.id);
        // const employee = await this.employeeService.updateEmployee(req.body.name,req.body.email,req.body.address);
        // res.status(200).send(employee);
    }
}
export default EmployeeController;