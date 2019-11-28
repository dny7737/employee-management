export class Employee {
    id:number;
    firstname:string;
    lastname:string;
    age:number;
    designation:string;
    organizationId:number;
    departmentId:number;

    constructor(id:number,
        firstname:string,
        lastname:string,
        age:number,
        designation:string,
        organizationId:number,
        departmentId:number){
            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
            this.designation = designation;
            this.organizationId = organizationId;
            this.departmentId = departmentId;
        }
}