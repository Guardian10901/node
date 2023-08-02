import express from "express";
import { Employee } from "./employee";
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
employeeRouter.get('/', (req, res) => {
    console.log(req.url);
    res.status(200).send(employee);
})
employeeRouter.get('/:id', (req, res) => {
    console.log(req.url);
    const id = Number(req.params.id);

    const emp = employee.find(element => element.id == id)
    res.status(200).send(emp);
})
employeeRouter.post('/', (req, res) => {
    console.log(req.url);
    const newemployee = new Employee();
    newemployee.id= ++count;
    newemployee.name = req.body.name;
    newemployee.email = req.body.email;
    newemployee.createdAt = new Date();
    newemployee.updatedAt = new Date();
    
    employee.push(newemployee);

        res.status(201).send(newemployee);
})
employeeRouter.put('/:id', (req, res) => {
    console.log(req.url);
    const id = Number(req.params.id);

    const emp = employee.find(element => element.id == id)
    emp.name=req.body.name;
    emp.email=req.body.email;
    emp.updatedAt=new Date();


    res.status(200).send(emp);
})
employeeRouter.delete('/:id', (req, res) => {
    console.log(req.url);
    const id = Number(req.params.id);

    const emp = employee.findIndex(element => element.id == id)
    employee.splice(emp,1);
    res.status(204);
})
export default employeeRouter;