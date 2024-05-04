import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useContext, useState } from 'react';


import app from '../../firebase/firebase.config';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Signup = () => {
    const { signUp } = useContext(AuthContext) // Access signUp function from useAuth hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        country: '',
        profilePhoto: null,
        coverPhoto: null,
    });
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, [e.target.name]: URL.createObjectURL(file) });

        const storage = getStorage(app);
        const storageRef = ref(storage, `${e.target.name}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercentage(progress);
            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, [e.target.name]: downloadURL });
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(formData.email, formData.password);
            const result = await axios.post("/");
            console.log(result);
            setFormData({
                name: '',
                email: '',
                password: '',
                phoneNumber: '',
                gender: '',
                country: '',
                profilePhoto: null,
                coverPhoto: null,
            });
            toast.success('User signed up successfully!');
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message); // Set error message
            toast.error(error.message); // Display error message with toast
        }
    };
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

            <div className=" flex flex-col lg:flex-row justify-center ">


                <form onSubmit={handleSubmit} className=" rounded-l-lg flex lg:w-[500px] justify-center flex-col gap-y-4 p-4">
                    <h2 className="text-2xl font-bold text-center mb-4 uppercase">Register social account</h2>
                    {/* Display error message for existing account */}
                    {error && <p className="text-red-500">{error}</p>}
                    {/* name, email, phonenumber */}
                    <div className='flex flex-col '>
                        <div className="">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        {/* country */}
                        <div className='flex gap-4 items-center '>
                            <label htmlFor="country" className="block mb-2">Country:</label>
                            <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                                <option value="">Select</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Bangladesh</option>
                                <option value="UK">India</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        {/* gender */}
                        <div className='flex gap-4 items-center my-2'>
                            <label className="block mb-2">Gender:</label>
                            <label htmlFor="male" className="mr-4">
                                <input type="radio" id="male" name="gender" value="male" onChange={handleChange} className="mr-1" />
                                Male
                            </label>
                            <label htmlFor="female">
                                <input type="radio" id="female" name="gender" value="female" onChange={handleChange} className="mr-1" />
                                Female
                            </label>
                        </div>

                        {/* profile and cover photo */}

                        <div className="flex justify-between bg-slate-400 relative ">
                            <input type="file" name="profilePhoto" onChange={handleFileChange} className="hidden" id="profilePhotoInput" />
                            <label htmlFor="profilePhotoInput" className="cursor-pointer relative">
                                {formData.profilePhoto ? (
                                    <img src={formData.profilePhoto} alt="Profile" className="w-32 border border-gray-300  h-14 object-cover  mx-auto " />
                                ) : (
                                    <div className=" w-32  h-14 flex items-center justify-center border border-gray-300 mx-auto  overflow-hidden relative">
                                        <img src='/src/assets/images/pavater.jpg' alt="Profile" className="w-full h-full object-cover" />
                                        <span className="absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs">Upload Photo</span>
                                    </div>
                                )}
                            </label>

                            <input type="file" name="coverPhoto" onChange={handleFileChange} className="hidden" id="coverPhotoInput" />
                            <label htmlFor="coverPhotoInput" className="cursor-pointer relative">
                                {formData.coverPhoto ? (
                                    <img src={formData.coverPhoto} alt="Cover" className="w-96 border border-gray-300  h-14 object-cover  " />
                                ) : (
                                    <div className="w-full h-14 flex items-center justify-center border border-gray-300  overflow-hidden relative">
                                        <img src='/src/assets/images/pavater.jpg' alt="Cover" className="w-96 h-14  object-cover" />
                                        <span className="absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs">Upload Cover Photo</span>
                                    </div>
                                )}
                            </label>
                        </div>
                        {/* {uploadPercentage && <p>uploadPercentage</p>} */}
                        {/* submit button */}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create account</button>
                        <span className='text-center my-1'>
                            OR
                        </span>
                        <button className=" px-6 py-2 bg-red-600 text-white rounded-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6 mr-2">
                                <path fill="#fff" d="M24 2C12.954 2 4 10.954 4 22s8.954 20 20 20 20-8.954 20-20S35.046 2 24 2zm11.492 16H27v-4h8.225c-.65-2.344-2.318-4.306-4.726-5.248v4.364h-2.958v-4.378c-1.578.91-2.935 2.406-3.786 4.378h-4.41v3.932h4.45c.342 1.034.99 1.954 1.85 2.646v2.132h2.99v-2.14c1.272-.77 2.198-1.978 2.606-3.372h3.578z" />
                            </svg>
                            Sign in with Google
                        </button>
                        <div className="already-have-account text-center my-4">
                            Already have an account?
                            <button className="login-btn">Login</button>
                        </div>

                    </div>
                </form>
                <div className="flex flex-col justify-center items-center relative p-4 rounded-r-lg">
                    <div className="w-full lg:w-[400px] lg:h-[600px] object-contain overflow-hidden relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <img src="/src/assets/images/signup.png" alt="Social Media Logo" className="w-full h-full object-cover animate-spin-slow" style={{ transform: `translate(${transform.transformX}px, ${transform.transformY}px)` }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
