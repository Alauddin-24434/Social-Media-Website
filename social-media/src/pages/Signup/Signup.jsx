import React, { useState, useContext } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import app from '../../firebase/firebase.config';
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    // State variables
    const { signUp, currentUser, } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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
    const [profileUploadPercentage, setProfileUploadPercentage] = useState(0);
    const [coverUploadPercentage, setCoverUploadPercentage] = useState(0);
    const [error, setError] = useState('');

    // Function to handle form data changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle file changes and upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileType = e.target.name;

        // Set the appropriate upload percentage state variable based on the file type
        const setUploadPercentage = fileType === 'profilePhoto' ? setProfileUploadPercentage : setCoverUploadPercentage;

        setFormData({ ...formData, [fileType]: URL.createObjectURL(file) });

        const storage = getStorage(app);
        const storageRef = ref(storage, `${fileType}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercentage(progress);
            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, [fileType]: downloadURL });
                });
            }
        );
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any input field is empty
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.phoneNumber ||
            !formData.gender ||
            !formData.country ||
            !formData.profilePhoto ||
            !formData.coverPhoto
        ) {
            setError('Please fill in all fields');
            return;
        }

        // Check if any upload percentage is less than 100
        if (profileUploadPercentage < 100 || coverUploadPercentage < 100) {
            setError('Please wait for photo uploading to complete');
            return;
        }

        try {
            await signUp(formData.email, formData.password);

            // Start loading if currentUser is null
            setLoading(currentUser === null);

            const result = await axios.post('https://social-media-backend-gold.vercel.app/createUser', {
                uid: currentUser?.uid,
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                gender: formData.gender,
                country: formData.country,
                profilePhoto: formData.profilePhoto,
                coverPhoto: formData.coverPhoto,
            });
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
            navigate('/profile');
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message);
            toast.error(error.message);
        }
    };
    // const handleSignInWithGoogle = () => {
    //    signInWithGoogle()

    //     navigate('/profile')

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
        <div className='max-w-full h-auto mx-auto bg-slate-300'>
            <div className='flex flex-col lg:flex-row justify-center'>
                <div className='flex flex-col  items-center'>
                    <form onSubmit={handleSubmit} className='rounded-l-lg flex lg:w-[500px] justify-center flex-col gap-y-4 p-4'>
                        <h2 className='text-2xl font-bold text-center mb-4 uppercase'>Register social account</h2>
                        {error && <p className='text-red-500'>{error}</p>}

                        {/* Profile and cover photo inputs */}
                        <div className='flex justify-between bg-slate-400 relative'>
                            <input type='file' name='profilePhoto' onChange={handleFileChange} className='hidden' id='profilePhotoInput' />
                            <label htmlFor='profilePhotoInput' className='cursor-pointer relative'>
                                {formData.profilePhoto ? (
                                    <div className='w-32 h-14 flex items-center justify-center border border-gray-300 mx-auto overflow-hidden relative'>
                                        <img src={formData.profilePhoto} alt='Profile' className='w-full h-full object-cover' />
                                        <span className='absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs'>
                                            {profileUploadPercentage.toFixed(0) == 100 ? (
                                                <p className='text-blue-500'>Upload Success</p>
                                            ) : (
                                                <p className='text-blue-500'>Uploading {profileUploadPercentage.toFixed(0)}%</p>
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <div className='w-32 h-14 flex items-center justify-center border border-gray-300 mx-auto overflow-hidden relative'>
                                        <img src='/images/pavater.jpg' alt='Profile' className='w-full h-full object-cover' />
                                        <span className='absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs'>Upload Photo</span>
                                    </div>
                                )}
                            </label>
                            <input type='file' name='coverPhoto' onChange={handleFileChange} className='hidden' id='coverPhotoInput' />
                            <label htmlFor='coverPhotoInput' className='cursor-pointer relative'>
                                {formData.coverPhoto ? (
                                    <div className='w-full h-14 flex items-center justify-center border border-gray-300 overflow-hidden relative'>
                                        <img src={formData?.coverPhoto} alt='Cover' className='w-96 h-14 object-cover' />
                                        <span className='absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs'>
                                            {profileUploadPercentage.toFixed(0) == 100 ? (
                                                <p className='text-blue-500'>Upload Success</p>
                                            ) : (
                                                <p className='text-blue-500'>Uploading {coverUploadPercentage.toFixed(0)}%</p>
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <div className='w-full h-14 flex items-center justify-center border border-gray-300 overflow-hidden  relative'>
                                        <img src='/images/pavater.jpg' alt='Cover' className='w-96 h-14 object-cover' />
                                        <span className='absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs'>
                                            Upload Cover
                                        </span>
                                    </div>
                                )}
                            </label>
                        </div>
                        {/* Name, email, phone number, country, gender inputs */}
                        <div className='flex flex-col'>

                            <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            <input type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder='Phone Number' className='w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 mb-4 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            <div className='flex gap-4 items-center'>
                                <label htmlFor='country' className='block mb-2'>
                                    Country:
                                </label>
                                <select id='country' name='country' value={formData.country} onChange={handleChange} className='w-full p-2 hover:border bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'>
                                    <option value=''>Select</option>
                                    <option value='USA'>USA</option>
                                    <option value='Canada'>Bangladesh</option>
                                    <option value='UK'>India</option>
                                </select>
                            </div>
                            <div className='flex gap-4 items-center my-2'>
                                <label className='block mb-2'>Gender:</label>
                                <label htmlFor='male' className='mr-4'>
                                    <input type='radio' id='male' name='gender' value='male' onChange={handleChange} className='mr-1' />
                                    Male
                                </label>
                                <label htmlFor='female'>
                                    <input type='radio' id='female' name='gender' value='female' onChange={handleChange} className='mr-1' />
                                    Female
                                </label>
                            </div>
                            {/* Submit button */}
                            <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
                                Create account
                            </button>

                        </div>
                    </form>
                    {/* <span className='text-center my-1'>OR</span> */}
                    <div className='w-full flex flex-col items-center gap-4 p-3 '>

                        {/* <button
                            className='px-6 w-full flex items-center justify-center gap-4 py-2 bg-slate-50 text-white rounded-lg focus:outline-none'
                            onClick={handleSignInWithGoogle}
                        >
                            <FcGoogle />
                            <span className='text-black'>Sign in with Google</span>
                        </button> */}

                        <div className='already-have-account text-center my-4'>
                            Already have an account?
                            <Link to='/login'>
                                <button className="signin">Sign In</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center relative p-4 rounded-r-lg'>
                    <div className='w-full lg:w-[400px] lg:h-[600px] object-contain overflow-hidden relative' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <img src='/images/signup.png' alt='Social Media Logo' className='w-full h-full object-cover animate-spin-slow' style={{ transform: `translate(${transform.transformX}px, ${transform.transformY}px)` }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
