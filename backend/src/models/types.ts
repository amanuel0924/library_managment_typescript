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
    records:IloanRecord[]
}

export interface IPagination<T>{
    totalCount:number;
    totalPages:number;
    currentPage:number;
    pageCount:number;
    limit:number;
    items:T[];
}

export interface IlibraryCard{
    user:string;
}

export interface IloanRecord{
    status:'LOANED'|'AVAILABLE';
    item:string;
    borrower:string;
    dueDate:Date;
    loanedDate:Date;
    returnedDate?:Date;
    employeeOut:string;
    employeeIn?:string;
}
