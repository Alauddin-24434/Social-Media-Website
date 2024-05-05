import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Slider.css';

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [qrCodes, setQrCodes] = useState([]);
    const slidesToShow = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('hhttp://localhost:5000/allUsers');
                setImages(response.data);
                const qrCodeUrls = response.data.map(user => {
                    return `https://api.qrserver.com/v1/create-qr-code/?size=250x150&data=${encodeURIComponent(`https://social-media-b74b2.web.app/SearchProfile/${user._id}`)}`;
                });
                setQrCodes(qrCodeUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            setSlideIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setSlideIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setSlideIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="slider-container">
            <div className="slider" style={{ transform: `translateX(-${slideIndex * (100 / slidesToShow)}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="slide">
                        <img src={image?.profilePhoto} alt={`Image ${index + 1}`} className="profile-image" />
                        <span className='text-black'>{image?.name}</span>
                        <div className="QrCode">
                            <div className="qr-code">
                                <img src={qrCodes[index]} alt={`QR Code ${index + 1}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="prev" onClick={prevSlide}>&#10094;</div>
            <div className="next" onClick={nextSlide}>&#10095;</div>
        </div>
    );
};

export default Slider;
