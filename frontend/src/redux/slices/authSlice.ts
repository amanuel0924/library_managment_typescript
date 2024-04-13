import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";

import { LoginUserPlaylod, User } from "../../models/user";
import axios  from "axios";

interface AuthSliceState{
     user:User|undefined,
     isError:boolean,
     isLoading:boolean,
     isSuccess:boolean,
     message?:string
}


const initialState:AuthSliceState={
    user:undefined,
    isError:false,
    isLoading:false,
    isSuccess:false
}

const login=createAsyncThunk("auth/login",async(user:LoginUserPlaylod,thunkAPI)=>{
    try {
        const response= await axios.post("http://localhost:9090/api/auth/login",user) 
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data.user))
        }
        return response.data.user
    } catch (error) {
        
        return thunkAPI.rejectWithValue(" invalid email or password")
    }
})

const AuthSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true
        }),
        builder.addCase(login.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=actions.payload
        }),
        builder.addCase(login.rejected,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.user=undefined
            state.message=actions.payload as string
            
    
            
        })
    }
})
//export login actions
export {login}
export default AuthSlice.reducer