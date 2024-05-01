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

export type PageInfo={
    totalCount:number;
    totalPages:number;
    currentPage:number;
    pageCount:number;
    limit:number;
}