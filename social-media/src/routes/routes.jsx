import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import ProfileLayout from "../layouts/ProfileLayout";
import PrivateRoute from "./PrivateRoute";

import CreateUserPost from "../pages/CreateUserPost/CreateUserPost";
import UserCreatedPost from "../pages/UserCreatedPost/UserCreatedPost";
import SearchUserPage from "../pages/SearchUserPage/SearchUserPage";

import ProfileLanding from "../pages/ProfileLandingPage/ProfileLanding";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement:<Error/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/SearchProfile/:id',
            element:<SearchUserPage/>,
            // loader: ({ params }) => fetch(`hhttp://localhost:5000/SearchProfile/${[params.id]}`)
        },
        
      
      ]
    },
    {
        path:'/signup',
        element:<Signup/>
    },
    {
        path:'/login',
        element:<Login/>
    },
  
  
    {
      path:'/profile',
      element:<PrivateRoute><ProfileLanding/></PrivateRoute>,
  },
    {
        path:'/profile/createPostPage',
        element:<PrivateRoute><CreateUserPost/></PrivateRoute>,
    },
    {
        path:'/profile/userPostCreatedPage',
        element:<PrivateRoute><UserCreatedPost/></PrivateRoute>,
    },
  

    
  ]);


  export default router;