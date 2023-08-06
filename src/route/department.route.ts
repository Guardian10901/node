import DepartmentController from "../controller/department.controller";
import dataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "../service/department.service";

const departmentRepository =new DepartmentRepository(dataSource.getRepository(Department));
const departmentServices = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentServices);
const departmentRouter = departmentController.router;

export default departmentRouter;