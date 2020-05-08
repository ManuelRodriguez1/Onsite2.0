
export interface Roles{
    Pro:boolean;
    Hire:boolean;
}
export interface User{
    uid:string;
    email:string;
    roles:Roles;
}