import express from "express";
import EmployeeService from "../service/employee.service";
class EmployeeController {
    public router: express.Router;
    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeId);
        this.router.post("/", this.createEmployee)
    }
    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employee = await this.employeeService.getAllEmployees();
        res.status(200).send(employee);
    }
    getEmployeeId = async (req: express.Request, res: express.Response) => {
        const employeeId: number = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeId(employeeId);
        res.status(200).send(employee);
    }
    createEmployee = async (req: express.Request, res: express.Response) => {
        const employee = await this.employeeService.createEmployee(req.body.name, req.body.email);
        res.status(201).send(employee);
    }
    // updateEmployee = async (req: express.Request, res: express.Response) => {
    //     const employeeId: number = Number(req.params.id);
    //     const employee = await this.employeeService.createEmployee(employeeId);
    //     res.status(200).send(employee);
    // }
}
export default EmployeeController;