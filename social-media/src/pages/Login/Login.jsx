import { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
    const navigate = useNavigate()
    const { signInWithEmail, } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signInWithEmail(email, password)
        navigate('/profile')

    };

    // const handleSignInWithGoogle = () => {
    //     signInWithGoogle()

       

    // };



    const [transform, setTransform] = useState({ transformX: 0, transformY: 0 });

    const handleMouseMove = (e) => {
        const offsetX = e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2;
        const offsetY = e.nativeEvent.offsetY - e.currentTarget.offsetHeight / 2;
        setTransform({ transformX: offsetX / 10, transformY: offsetY / 10 });
    };

    const handleMouseLeave = () => {
        setTransform({ transformX: 0, transformY: 0 });
    };

    return (
        <div className='max-w-full   h-auto mx-auto bg-slate-300'>

            <div className=" flex flex-col lg:flex-row  justify-center ">


                <div>
                    <form onSubmit={handleSubmit} className=" rounded-l-lg flex lg:w-[500px] justify-center flex-col gap-y-4 p-4">
                        <h2 className="text-2xl font-bold text-center mb-1 uppercase">Welcome back to login</h2>
                        {/* Display error message for existing account */}
                        {/* {error && <p className="text-red-500">{error}</p>} */}
                        {/* name, email, phonenumber */}
                        <div className='flex flex-col '>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign In</button>
                         

                           

                        </div>
                    </form>
                    {/* <button
                                className='px-6 w-full flex items-center justify-center gap-4 py-2 bg-slate-50 text-white rounded-lg focus:outline-none'
                                onClick={handleSignInWithGoogle}
                            >
                                <FcGoogle />
                                <span className='text-black'>Sign in with Google</span>
                            </button> */}

                    <div className="already-have-account flex gap-2 items-center justify-center text-center ">
                       <p> Don't have an account?</p>

                        <Link to='/signup'>
                            <button className="Signup">Signup</button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center relative p-4 rounded-r-lg">
                    <div className="w-full lg:w-[400px] lg:h-[600px] object-contain overflow-hidden relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <img src="/images/signup.png" alt="Social Media Logo" className="w-full h-full object-cover animate-spin-slow" style={{ transform: `translate(${transform.transformX}px, ${transform.transformY}px)` }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
