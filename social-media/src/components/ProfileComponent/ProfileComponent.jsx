// ProfileComponent.jsx
import React from 'react';
import './ProfileComponent.css';

import useLoginUser from '../../hooks/useLoginUser';

const ProfileComponent = () => {
    const { loginUser, refetch, isLoading } = useLoginUser()
    if (isLoading) {
        refetch()
    }

    return (
        <div className="profile-container">
            <div className="cover-photo-container">
                <div className="cover-photo" style={{
                    backgroundImage: `url(${loginUser?.coverPhoto})`,

                }} />
            </div>
          
                <div className="profile-info">
                    <div className="avatar" style={{
                        backgroundImage: `url(${loginUser?.profilePhoto})`,
                    }} />
                    <div className="name">
                        <h1>{loginUser?.name}</h1>
                    </div>

                </div>
            


        </div>
    );
};

export default ProfileComponent;
