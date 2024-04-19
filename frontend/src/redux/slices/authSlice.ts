import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";

import { LoginUserPlaylod,RegisterUserPlaylod, User, } from "../../models/user";
import axios  from "axios";

interface AuthSliceState{
     user:User|undefined,
     profileUser:User|undefined,
     isError:boolean,
     isLoading:boolean,
     isSuccess:boolean,
     message?:string
}
 

const initialState:AuthSliceState={
    user:localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")as string)
    : undefined,
    profileUser:undefined,
    isError:false,
    isLoading:false,
    isSuccess:false
}

const login=createAsyncThunk("auth/login",async(user:LoginUserPlaylod,thunkAPI)=>{
    try { 
        axios.defaults.withCredentials=true
        const response= await axios.post("http://localhost:9090/api/auth/login",user) 
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data.user))
        }
        return response.data.user
    } catch (error) {
        
        return thunkAPI.rejectWithValue(" invalid email or password")
    }
})

const register=createAsyncThunk("auth/register",async(user:RegisterUserPlaylod,thunkAPI)=>{
    try {
        axios.defaults.withCredentials=true
        const response= await axios.post('http://localhost:9090/api/auth/register',user)
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data.user))
            return response.data.user
    }
        } catch (error) {
            return thunkAPI.rejectWithValue(" invalid email or password")
        }
})

const fetchUser=createAsyncThunk('auth/fechuser',async(id:string|undefined,thunkAPI)=>{
    try {
        axios.defaults.withCredentials=true
        const response= await axios.get(`http://localhost:9090/api/user/${id}`)
        const user=response.data.user

        return {_id:user._id,name:user.name,email:user.email,role:user.role,password:user.password}
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const updateUser=createAsyncThunk('auth/updateUser',async(user:User,thunkAPI)=>{
    try {
        axios.defaults.withCredentials=true
        const response= await axios.put(`http://localhost:9090/api/user/`,user)
        return response.data.user
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const AuthSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.user = undefined
            state.profileUser=undefined
            localStorage.removeItem("user")
            console.log('logout',state.user)
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true
            state.isError=false
        }),
        builder.addCase(login.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=actions.payload
        }),
        builder.addCase(login.rejected,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.user=undefined
            state.message=actions.payload as string
        })

        builder.addCase(register.pending,(state)=>{
            state.isLoading=true
            state.isError=false
        })
        builder.addCase(register.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=actions.payload
            state.message='user registered success fuly'
        })
        builder.addCase(register.rejected,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.user=undefined
            state.message=actions.payload as string
        }),

        builder.addCase(fetchUser.pending,(state)=>{
            state.isLoading=true
            state.isError=false
        }),
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
          state={
            ...state,
            isError:false,
            isLoading:false,
            isSuccess:true,
            profileUser:action.payload,
          }
          return state
        })
        builder.addCase(fetchUser.rejected,(state)=>{
            state={
                ...state,
                isError:true,
                isLoading:false,
                isSuccess:false,
               
            }
            return state
        })
        builder.addCase(updateUser.pending,(state)=>{
            state.isLoading=true
            state.isError=false
        }),
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=action.payload
        }),
        builder.addCase(updateUser.rejected,(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
        })
    }
})

export {login,register,fetchUser,updateUser}
export const  {logout}=AuthSlice.actions
export default AuthSlice.reducer