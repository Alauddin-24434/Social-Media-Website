import React, { useState, } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import './CreateUserPost.css';
import ProfileLayout from '../../layouts/ProfileLayout';
import useLoginUser from '../../hooks/useLoginUser';
import app from '../../firebase/firebase.config';

const CreateUserPost = () => {
    const { loginUser, isLoading, refetch } = useLoginUser();
    if (isLoading) {
        refetch()

    }

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size <= 100 * 1024 * 1024) {
                setImage(file);
                handleFileUpload(file);
            } else {
                alert('Image size exceeds 100MB. Please upload a smaller image.');
            }
        }
    };

    const handleCancel = () => {
        setText('');
        setImage(null);
    };

    const handleFileUpload = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${file.name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Calculate upload progress percentage
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading:', error);
                },
                async () => {
                    // Upload complete
                    console.log('File uploaded successfully');
                    const downloadURL = await getDownloadURL(storageRef);
                    setImageUrl(downloadURL);
                }
            );
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (uploadProgress < 100) {
                alert('Please wait for the image to upload completely.');
                return;
            }

            const postData = {
                postText: text,
                postImage: imageUrl,
                userProfileId: loginUser?._id,

            };

            const response = await axios.post('hhttp://localhost:5000/createUserPost', postData);
            console.log('Post successful:', response.data);
            setText('');
            setImage(null);
        } catch (error) {
            console.error('Error posting:', error);
        }
    };

    return (
        <ProfileLayout>
            <div className="create-post-container">
                <h2>Create Post</h2>
                <textarea
                    className="post-textarea"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={handleTextChange}
                    rows={4}
                    cols={50}
                />

                {image ? (
                    <div className="image-container">
                        <img className="uploaded-image" src={URL.createObjectURL(image)} alt="Uploaded" />
                        <span className='absolute inset-0  flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs'>
                            {uploadProgress.toFixed(0) == 100 ? (
                                <p className='text-green-800 rounded-xl text-2xl font-bold'>Upload Success</p>
                            ) : (
                                <p className='text-blue-800 text-2xl font-bold'>Please wait Uploading time {uploadProgress.toFixed(0)}%</p>
                            )}
                        </span>
                    </div>
                ) : (
                    <div className="h-24">
                        <input type="file" name="image" onChange={handleImageChange} className="hidden" id="imagest" />
                        <label htmlFor="imagest" className="cursor-pointer relative">
                            <div className="w-full h-24 flex items-center justify-center border border-gray-300 mx-auto overflow-hidden relative">
                                <img src="/images/pavater.jpg" alt="Profile" className="w-full overflow-hidden h-full object-cover" />
                                <span className="absolute inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 text-white text-xs">Upload Image</span>
                            </div>
                        </label>
                    </div>
                )}

                <div className='btn-container'>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button className={`post-button ${uploadProgress < 100 && 'disabled'}`} onClick={handleSubmit} disabled={uploadProgress < 100}>Post</button>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default CreateUserPost;
