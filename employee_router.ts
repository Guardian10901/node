import express from "express";
import client from "pg"
import { Employee } from "./employee";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource, Like ,FindOptionsWhere} from "typeorm";
import dataSourse from "./data-sourse";
const employeeRouter = express.Router();

let count = 2;

employeeRouter.get('/',async (req, res) => {
    console.log(req.url);
    const nameFilter = req.query.name;
    const filters : FindOptionsWhere<Employee> ={};
    if(nameFilter){
        filters.name =Like(`${nameFilter}`)
    }

    const employeeRepository = dataSourse.getRepository(Employee);
    const employee = await employeeRepository.find({
        // where:{
        //     name:Like(nameFilter as string +"%"),
        //     email:Like("%gmail.com")
        // }}
        where:filters}
    );
    res.status(200).send(employee);
})
employeeRouter.get('/:id', async (req, res) => {
    console.log(req.url);
    
    
    const employeeRepository = dataSourse.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    res.status(200).send(employee);

})
employeeRouter.post('/', async(req, res) => {
    console.log(req.url);
    const newemployee = new Employee();
    
    newemployee.name = req.body.name;
    newemployee.email = req.body.email;

    const employeeRepository = dataSourse.getRepository(Employee);
    const employee = await employeeRepository.save(newemployee);

    res.status(201).send(newemployee);
})
employeeRouter.put('/:id', async(req, res) => {
    console.log(req.url);
    
    const employeeRepository = dataSourse.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id: Number(req.params.id),
    });

    employee.name=req.body.name;
    employee.email=req.body.email;
    await employeeRepository.save(employee);

    res.status(200).send();
})
employeeRouter.delete('/:id', async (req, res) => {
    console.log(req.url);
    const employeeRepository = dataSourse.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    await employeeRepository.softRemove(employee);
    res.status(204).send();
})
export default employeeRouter;