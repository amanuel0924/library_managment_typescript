export interface IUser {
    role:'admin' | 'employee'|'member';
    name:string;
    email:string;
    password:string;
}

export interface IBook{
    barcode:string;
    title:string;
    cover:string;
    authors:string[];
    subjects:string[];
    publisher:string;
    publicationDate:Date;
    pages:number;
    genre:string;
    description:string;
    records:[]
}
