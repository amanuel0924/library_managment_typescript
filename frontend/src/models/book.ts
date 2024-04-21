export type book={
    _id: string;
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
    records:[];
}