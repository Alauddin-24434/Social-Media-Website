import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useLoginUser from "../../hooks/useLoginUser";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const { signUserOut } = useContext(AuthContext)
    const { loginUser, refetch, isLoading } = useLoginUser()

    if (isLoading) {
        refetch()
       
    }


    const handleLogout = () => {
        signUserOut()
    }
    return (
        <section className="flex bg-slate-400  justify-center w-[200px] h-screen">
            <div className="my-10 relative">
                <div className=" flex justify-center w-[100px] h-[100px] bg-slate-700 rounded-full  items-center">



                    {
                        loginUser?.profilePhoto && <img className="w-[100px] p-2 cursor-zoom-in h-[100px] rounded-full" src={loginUser?.profilePhoto} alt="Avatar" />

                    }
                </div>

                <ul className="flex flex-col text-white text-lg items-center my-4 gap-y-4">

                    <li>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </li>

                    <li>
                        <Link to='/profile/userPostCreatedPage'>
                            Your Post
                        </Link>
                    </li>

                    <li>
                        <Link to='/profile/createPostPage'>
                            Create Post
                        </Link>
                    </li>



                </ul>
                <ul className="flex w-full flex-row items-center gap-4 justify-center absolute bottom-0 text-white">
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </ul>
            </div>
        </section>
    );
};

export default Sidebar;
