import { PageInfo, book } from "../models/book"

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

export function calculatePaging(pageInfo:PageInfo):string[]{
    const pArr:string[]=[]
   
    if(pageInfo){
        const total=pageInfo?.totalPages
        const current=pageInfo?.currentPage

        if(total <=10){
            for(let i=1;i<=total;i++){
                pArr.push(`${i}`)
            }
        }else if(total >10 && current-7 <=0){
            for(let i=1;i<=8;i++){
                pArr.push(`${i}`)
            }
            pArr.push('...')
            for(let i=total-1;i<=total;i++){
                pArr.push(`${i}`)
            }
        }else if(total >10 && total -7>0&& current-7>5){
            for(let i=1;i<=2;i++){
                pArr.push(`${i}`)
            }
            pArr.push('...')

            for(let i=current;i<=current+4;i++){
                pArr.push(`${i}`)
            }
            pArr.push('...')
            for(let i=total-1;i<=total;i++){
                pArr.push(`${i}`)
            }
        }else{
            for(let i=1;i<=2;i++){
                pArr.push(`${i}`)
               
            }
            pArr.push('...')

            for(let i=total-5;i<=total;i++){
                pArr.push(`${i}`)
            }
            
           
        }
    }
    return pArr
}