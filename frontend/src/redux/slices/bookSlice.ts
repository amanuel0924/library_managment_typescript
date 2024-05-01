import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";
import { PageInfo, book } from "./../../models/book";

interface bookState{
    loading:boolean;
    books:book[];
    error:boolean;
    pagingInformation:PageInfo|null
}

const initialState:bookState={
    loading:false,
    books:[],
    error:false,
    pagingInformation:null
}


export const fetchAllBooks=createAsyncThunk(
    'books/all',
    async(_payload,thunkAPI)=>{
        try {
            const response=await axios.get('http://localhost:9090/api/book');
            return response.data.books;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
        
    }
)

export const queryBooks=createAsyncThunk(
    'books/query',
    async(payload:string,thunkAPI)=>{
        try {
            const response=await axios.get(`http://localhost:9090/api/book/query${payload}`);
            return response.data.page;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
        
    }
)


export const bookSlice=createSlice({
    name:"book",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllBooks.pending,(state)=>{
            state.loading=true;
        }),
        builder.addCase(fetchAllBooks.fulfilled,(state,action)=>{
            state.loading=false;
            state.books=action.payload;
        })
        builder.addCase(fetchAllBooks.rejected,(state)=>{
            state.loading=false;
            state.error=true;
        })
        builder.addCase(queryBooks.pending,(state)=>{
            state.loading=true;
        }),
        builder.addCase(queryBooks.fulfilled,(state,action)=>{
            state.loading=false;
            state.books=action.payload.items;
            state.pagingInformation={
                totalCount:action.payload.totalCount,
                totalPages:action.payload.totalPages,
                currentPage:action.payload.currentPage,
                pageCount:action.payload.pageCount,
                limit:action.payload.limit

            };
        })
        builder.addCase(queryBooks.rejected,(state)=>{
            state.loading=false;
            state.error=true;
        })
    }
})

export default bookSlice.reducer;
