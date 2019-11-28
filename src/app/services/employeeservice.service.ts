import { Injectable } from '@angular/core';
import { Employee } from '../entity/Employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn:'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // In-memory list of employees
  allEmployees:Employee[] = [
    {
      "id": 1,
      "firstname": "Dnyaneshwar",
      "lastname": "Gaikwad",
      "age": 26,
      "designation": "Associate Lead, Technology",
      "organizationId":1,
      "departmentId":1
    }
  ];


  // Returns all the employees
  getAllEmployees():Employee[]{
    this.allEmployees = [];
    this.http.get<Employee[]>('http://employee-management.192.168.99.104.nip.io/backend/findall')
    .subscribe(emp => {
    for( let e of emp){
      this.allEmployees.push(e)
    }
    
    
  })
    return this.allEmployees;
  }

  // Adds an employee to employee list
  addEmployee(employee:Employee){
    
    console.log('chala kya');
     this.http.post<Employee>('http://employee-management.192.168.99.104.nip.io/backend/add',employee,this.httpOptions)
    .subscribe(employee => this.allEmployees.push(employee));
    console.log('chala kya');
    
    /*console.log('hope this worked' + this.http.post<Employee>('http://employee-dny20novjenkinsdemo.192.168.99.103.nip.io/',employee,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    ));*/


  }
   handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Access-Control-Allow-Origin'
    })
  }  

  // Update employee details
  updateEmployee(employee:Employee){
    var updateEmployee = this.allEmployees.find(emp => emp.id == employee.id);
    updateEmployee.firstname = employee.firstname;
    updateEmployee.lastname = employee.lastname;
    updateEmployee.age = employee.age;
    updateEmployee.designation = employee.designation;
    updateEmployee.organizationId = employee.organizationId;
    updateEmployee.departmentId = employee.departmentId;
  }

  // Deletes an employee from employee list
  deleteEmployee(id:number){
    this.allEmployees = this.allEmployees.filter(employee => employee.id != id);
  }

  // Returns an employee with passed employee id from employee list
  getEmployee(id:number):Employee{
    return this.allEmployees.find(emp => emp.id == id);
  }
}
