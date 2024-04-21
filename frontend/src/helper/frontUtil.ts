import { book } from "../models/book"

export function generateRandomGeners():string[]{
    const genres=['Fiction','Non-Fiction','Science Fiction','Childrens','Romance','History','Biography','Fantasy','Young Adult']
    const chosen:string[]=[]

    while (chosen.length!==5){
        const random=Math.floor(Math.random()*7)
        if(!chosen.includes(genres[random])){
            chosen.push(genres[random])
        }
    }
    return chosen
       
   
}

export function getRandomBookbyGenere(books: book[], genre: string): book[] {
    const filteredBooks=books.filter(book=>book.genre===genre)

    const chosenBooks:book[]=[]

    if(filteredBooks.length<10)return filteredBooks;

    while(chosenBooks.length!==10){
        const random=Math.floor(Math.random()*filteredBooks.length)
        if(!chosenBooks.some(book=>book['barcode']===filteredBooks[random].barcode)){
            chosenBooks.push(filteredBooks[random])
        }
    }

    return chosenBooks
}