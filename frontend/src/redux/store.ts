import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slices/authSlice";
import bookReducers from "./slices/bookSlice";


export const store = configureStore({
    reducer:{
        auth:authReducers,
        book:bookReducers
    }
})
 export type RootState=ReturnType<typeof store.getState>
 export type AppDispach=typeof store.dispatch
