import DepartmentRepository from "../repository/department.repository";
import express from "express"
import DepartmentService from "../service/department.service";
import { plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import { validate } from "class-validator";
import ValidateException from "../exception/validate.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../../utils/role.enum";
import logger from "../../utils/log.winston";
class DepartmentController {
    public router: express.Router
    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();
        this.router.get("/",authenticate,authorize([Role.ADMIN,Role.HR,Role.Delevoper,Role.UI]) , this.getAllDepartments);
        this.router.get("/:id",authenticate,authorize([Role.ADMIN,Role.HR,Role.Delevoper,Role.UI]) ,this.getDepartmentId);
        this.router.post("/",authenticate,authorize([Role.ADMIN,Role.HR]) , this.createDepartment);
        this.router.put("/:id",authenticate,authorize([Role.ADMIN,Role.HR]) , this.updateDepartment);
        this.router.put("/:id", authenticate,authorize([Role.ADMIN,Role.HR]) ,this.deleteDepartment);
        
    }
    getAllDepartments = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const startTime =Date.now();
        const department = await this.departmentService.getAllDepartments();
        logger.info("All Departments sucessfully fetched ")
        res.status(200).send({data:department,error:null,message:"OK",meta:{lenght:department.length,took:Date.now()-startTime,total:department.length}})

    }
    getDepartmentId = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {const startTime =Date.now();
        try {
            const departmentId: number = Number(req.params.id);
            const department = await this.departmentService.getDepartmentId(departmentId);
            logger.info( `Department ${departmentId} sucessfully fetched` )
            res.status(200).send({data:department,error:null,message:"OK",meta:{length:1,took:Date.now()-startTime,total:1}});
        }
        catch (error) {
            logger.error("Department fetch failed")
            next(error);

        }
    }
    createDepartment = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {const startTime =Date.now();
        try {

            const createDepartment = plainToInstance(CreateDepartmentDto, req.body);

            const errors = await validate(createDepartment);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new ValidateException(errors);

            }
            const department = await this.departmentService.createDepartment(createDepartment)
            logger.info("New Department created sucessfully ")
            res.status(201).send({data:department,error:null,message:"OK",meta:{length:1,took:Date.now()-startTime,total:1}});
        } catch (error) {
            logger.error("New department creation failed")
            next(error);
        }
    }
    updateDepartment =async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {const startTime =Date.now();
        try{
            const departmentId :number =Number(req.body.id);
            const updateDepartment =plainToInstance(CreateDepartmentDto,req.body)
            const errors = await validate(updateDepartment);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new ValidateException(errors);

            }
            const department = await this.departmentService.upadateDepartment(departmentId, updateDepartment)
            logger.info("Department sucessfully updated")
            res.status(200).send({data:department,error:null,message:"OK",meta:{length:1,took:Date.now()-startTime,total:1}});
        }
        catch (error) {
            logger.error("department updation failed")
            next(error)
        }
        }
        deleteDepartment = async (
            req: express.Request,
             res: express.Response, 
             next: express.NextFunction
             ) => {
                const startTime =Date.now();
            try {
                const departmentId :number =Number(req.body.id);
                const department = await this.departmentService.deleteDepartment(departmentId);
                logger.info("Department sucessfully deleted ")
                res.status(204).send({data:department,error:null,message:"OK",meta:{length:1,took:Date.now()-startTime,total:1}})
            } catch (error) {
                logger.error("Department deletion failed")
                next(error)
            }
    
        }
    

}
export default DepartmentController;