import { Component } from '@angular/core';
import { EmployeeService } from '../services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../entity/Employee';

@Component({
  templateUrl: './addemployee.component.html'
})
export class AddemployeeComponent {

  firstname:string;
  lastname:string;
  age:number;
  designation:string;
  employee: Employee;
  organizationId:number;
  departmentId:number;
  id:number=1;


  // Services injected in constructor
  constructor(private employeeService: EmployeeService, private router: Router) { 
  }

  // Method to save an employee
  saveEmployee(){
    this.employee = new Employee(this.makeRandomID(), this.firstname, this.lastname, 
      this.age, this.designation, this.organizationId, this.departmentId);
    this.employeeService.addEmployee(this.employee);
    this.router.navigate(["Employees"]);
  }

  // Method to cancel the add operation
  cancelEmployee(){
    this.router.navigate(["Employees"]);
  }

  // Creates random id for employee
  makeRandomID(): number {
    
   

    return this.id;
  }
}
