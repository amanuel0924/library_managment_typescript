export interface IUser {
    role:'admin' | 'employee'|'member';
    name:string;
    email:string;
    password:string;
}