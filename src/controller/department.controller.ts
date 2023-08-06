import DepartmentRepository from "../repository/department.repository";
import express from "express"
import DepartmentService from "../service/department.service";
import { plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import { validate } from "class-validator";
import ValidateException from "../exception/validate.exception";
class DepartmentController {
    public router: express.Router
    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();
        this.router.get("/", this.getAllDepartments);
        this.router.get("/:id", this.getDepartmentId);
        this.router.post("/", this.createDepartment);
        this.router.put("/:id", this.updateDepartment);
        this.router.put("/:id", this.deleteDepartment);
        
    }
    getAllDepartments = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const department = await this.departmentService.getAllDepartments();
        res.status(200).send(department)

    }
    getDepartmentId = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const departmentId: number = Number(req.params.id);
            const department = await this.departmentService.getDepartmentId(departmentId);
            res.status(200).send(department);
        }
        catch (error) {
            next(error);

        }
    }
    createDepartment = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {

            const createDepartment = plainToInstance(CreateDepartmentDto, req.body);

            const errors = await validate(createDepartment);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new ValidateException(404, "Vaildation error", errors);

            }
            const department = await this.departmentService.createDepartment(createDepartment)
            res.status(201).send(department);
        } catch (error) {
            next(error);
        }
    }
    updateDepartment =async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try{
            const departmentId :number =Number(req.body.id);
            const updateDepartment =plainToInstance(CreateDepartmentDto,req.body)
            const errors = await validate(updateDepartment);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new ValidateException(404,"Vaildation error",errors);

            }
            const department = await this.departmentService.upadateDepartment(departmentId, updateDepartment)
            res.status(200).send(department);
        }
        catch (error) {
            next(error)
        }
        }
        deleteDepartment = async (
            req: express.Request,
             res: express.Response, 
             next: express.NextFunction
             ) => {
            try {
                const departmentId :number =Number(req.body.id);
                const department = await this.departmentService.deleteDepartment(departmentId);
                res.status(204).send(department)
            } catch (error) {
                next(error)
            }
    
        }
    

}
export default DepartmentController;