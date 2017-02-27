export class Teacher{
    private firstname:string;
    private lastname: string;
    private email: string;
    private phonenumber: string;
    private skills: Array<string>;

    constructor(firstname: string, lastname: string, email: string, phonenumber:string, skills: Array<string>){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.skills = skills;
    }
    
}