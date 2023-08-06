import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
    constructor(private departmentRepository: Repository<Department>) {

    }
    find(): Promise<Department[]> {
        return this.departmentRepository.find();
    }
    findOneBy(id: number): Promise<Department> {
        return this.departmentRepository.findOne({ where: { id: id }, relations: { employees: true } })

    }
    createDepartment(newDepartment: Department): Promise<Department> {
        return this.departmentRepository.save(newDepartment)
    }
    updateDepartment(department: Department) {
        return this.departmentRepository.save(department)
    }
    deleteDepartment(department: Department) {
        return this.departmentRepository.softDelete(department)
    }


}
export default DepartmentRepository;