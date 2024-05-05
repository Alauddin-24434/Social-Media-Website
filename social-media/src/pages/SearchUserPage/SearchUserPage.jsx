import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './SearchUser.css'

const SearchUserPage = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        // Fetch combined user data and posts when the component mounts or 'id' changes
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            // Make a single request to fetch combined user data and posts
            const response = await axios.get(`hhttp://localhost:5000/combinedData?userId=${id}`);

            // Extract userData and userPosts from the response data
            const { userData, userPosts } = response.data;

            // Update state with fetched data
            setUserData(userData);
            setPostData(userPosts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust the format as needed
    };

    return (
        <div className="main-search-container-profile">
            {userData && (
                <div className="profile-container-profile">
                    <div className="cover-photo-container-profile">
                        <div className="cover-photo-profile" style={{
                            backgroundImage: `url(${userData.coverPhoto})`,
                        }} />
                    </div>
                    <div className="profile-info-profile">
                        <div className="avatar-profile" style={{
                            backgroundImage: `url(${userData.profilePhoto})`,
                        }} />
                        <div className="name-profile">
                            <h1>{userData.name}</h1>
                        </div>
                    </div>
                </div>
            )}
            <div className="user-post-container-profile">
                {/* Render post data if available */}
                {postData.map(post => (
                    <div key={post._id} className="user-info-profile">
                        <div className='userProfile_name_createdDate-profile'>
                            <div className='user-details-profile'>
                                <img src={userData?.profilePhoto} alt="User Avatar" className="user-avatar-profile" />
                                <span className="user-name-profile">{userData?.name}</span>
                            </div>
                            <div>
                                <p>{formatTimestamp(post.createdAt)}</p>
                            </div>
                        </div>
                        <div className="post-content-profile">
                            <p className="post-text-profile">{post.postText}</p>
                            <img src={post.postImage} alt="Uploaded" className="post-image-profile" />
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchUserPage;
