import React, { useEffect } from 'react';
import './InteractiveGallery.css'; // Import CSS for styling

const InteractiveGallery = () => {
    useEffect(() => {
        const boxItems = document.querySelectorAll('.box-item');
        boxItems.forEach((box, index) => {
            box.style.animation = `animateBox${index + 1} 5s infinite alternate`;
        });
    }, []);

    return (
        <div className="container">
            <div className='gallery'>
                <div className='box-item box-1'>
                    <img src="/src/assets/images/Texting-pana.png" alt="" />
                </div>
                <div className='box-item box-2'>
                    <img src="/src/assets/images/signup.png" alt="" />
                </div>
                {/* Add more box items as needed */}
            </div>
            <div className='gallery2'>
                <div className='content'>
                    <h2 className='headText text-green-300'>Create and customize your other account</h2>
                    <p className='desc'>Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
                    <button className='bg-green-300'>Get started for free</button>
                </div>
            </div>
        </div>
    );
};

export default InteractiveGallery;
