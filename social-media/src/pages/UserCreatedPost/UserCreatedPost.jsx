import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileLayout from "../../layouts/ProfileLayout";
import './UserCreatedPost.css'; // Import CSS for styling
import useLoginUser from '../../hooks/useLoginUser';


const UserCreatedPost = () => {
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState([]);

    const { loginUser, refetch, isLoading } = useLoginUser()
    if (isLoading) {
        refetch()
    }

    
    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, [userData,postData]);

    const fetchData = async () => {
        try {
            // Make GET request to fetch post data
            const response = await axios.get(`hhttp://localhost:5000/combinedData?userId=${loginUser._id}`);
            // Update state with fetched data
            // Extract userData and userPosts from the response data
            const { userData, userPosts } = response.data;

            // Update state with fetched data
            setUserData(userData);
            setPostData(userPosts);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust the format as needed
    };

    return (
        <ProfileLayout>
            <div className="user-post-container">
                {/* Render post data if available */}
                {postData && postData.map(post => (
                    <div key={post?._id} className="user-info">
                        <div className='userProfule_name_createdDate'>
                            <div className='user-details'>
                                <img src={userData?.profilePhoto} alt="User Avatar" className="user-avatar" />
                                <span className="user-name">{userData?.name}</span>
                            </div>
                            <div >
                                

                                <p>{formatTimestamp(post?.createdAt)}</p>

                            </div>
                        </div>
                      
                        <div className="post-content">
                            <p className="post-text">{post?.postText}</p>
                            <img src={post?.postImage} alt="Uploaded" className="post-image" />

                        </div>
                        <hr />
                    </div>

                ))}
            </div>
        </ProfileLayout>
    );
};

export default UserCreatedPost;
