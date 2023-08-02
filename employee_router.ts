import express from "express";
import client from "pg"
import { Employee } from "./employee";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import dataSourse from "./data-sourse";
const employeeRouter = express.Router();
let count = 2;
const employee: Employee[] = [{
    id: 1,
    name: "veena",
    email: "veena@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 2,
    name: "vidya",
    email: "vidya@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date()
}]
employeeRouter.get('/',async (req, res) => {
    console.log(req.url);
    const employeeRepository = dataSourse.getRepository(Employee);
    const employee = await employeeRepository.find();
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
    newemployee.id = ++count;
    newemployee.name = req.body.name;
    newemployee.email = req.body.email;
    newemployee.createdAt = new Date();
    newemployee.updatedAt = new Date();

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
    await employeeRepository.remove(employee);
    res.status(204).send();
})
export default employeeRouter;