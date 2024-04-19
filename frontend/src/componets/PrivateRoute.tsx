//implment private route for logedin user
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const PrivateRoute = () => {
    const auth = useSelector((state: RootState) => state.auth)
    return auth.user ? <Outlet /> : <Navigate to="/login" />
}
//