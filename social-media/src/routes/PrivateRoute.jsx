/* eslint-disable react/prop-types */



import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation()
  
  
    if (currentUser) return children
    return <Navigate to='/login' state={{ from: location }} replace />


};

export default PrivateRoute;