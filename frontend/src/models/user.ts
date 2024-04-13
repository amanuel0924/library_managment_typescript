export type User = {
    _id: string;
    role: 'admin' | 'employee' | 'member';
    name: string;
    email: string;
    password: string;
    };

export interface LoginUserPlaylod{
    email:string,
    password:string
}