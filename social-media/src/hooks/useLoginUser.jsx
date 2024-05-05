
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../Provider/AuthProvider';
import { useContext} from 'react';
const useLoginUser = () => {
  const { currentUser } = useContext(AuthContext); 
    const {data, isFetching,error,refetch,isLoading}=useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const data= await fetch(`https://social-media-backend-gold.vercel.app/loginUser?email=${currentUser}`)
            return await data.json()
        }
       })
       return {loginUser:data, isFetching,error,refetch,isLoading}
};

export default useLoginUser;