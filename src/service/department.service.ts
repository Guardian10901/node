import CreateDepartmentDto from "../dto/create-department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {

    constructor(private departmentRepository: DepartmentRepository) {

    }
    getAllDepartments = async (): Promise<Department[]> => {
        return this.departmentRepository.find()

    }
    getDepartmentId = async (id: number): Promise<Department> => {
        const department = this.departmentRepository.findOneBy(id);
        if (!department) {
            throw new HttpException(404, `Department not found for id :${id}`);
        }
        return department;
    }
    createDepartment = async (departmentdto: CreateDepartmentDto): Promise<Department> => {
        const newDepartment = new Department();
        newDepartment.name = departmentdto.name;
        const department = await this.departmentRepository.createDepartment(newDepartment)
        return department
    }
    upadateDepartment = async (id: number, departmentdto: CreateDepartmentDto): Promise<Department> => {
        const department = await this.getDepartmentId(id);
        department.name = departmentdto.name;
        await this.departmentRepository.updateDepartment(department)
        return department
        }
    deleteDepartment =async (id:number) => {
        const department = await this.getDepartmentId(id);
        await this.departmentRepository.deleteDepartment(department)
       
        
    }
}
export default DepartmentService