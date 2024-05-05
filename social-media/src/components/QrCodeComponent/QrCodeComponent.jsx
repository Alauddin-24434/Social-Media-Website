import React, { useState } from 'react';
import './QrCodeComponent.css'; // Import CSS file for styling

const QrCodeComponent = () => {
    const [inputFileText, setInputFileText] = useState('Example text'); // State to store input field value

    // Function to handle input field change
    const handleInputChange = (e) => {
        setInputFileText(e.target.value);
    };

    // Function to handle cancel button click
    const handleCancel = () => {
        setInputFileText('example text');
    };

    // QR code URL based on input field value
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(inputFileText)}`;

    return (
        <div className="qr-code-container">
            <div className="card-box">
                {/* Display QR code image */}
                {
                    inputFileText ? <img src={qrCodeUrl} alt="QR Code" className="qr-code" /> :
                    <p className='qr-code'>Please add text</p>
                }
                <div className="input-container">
                    {/* Input field for entering text or URL */}
                    <input
                        type="text"
                        placeholder="Enter text or URL"
                        value={inputFileText}
                        onChange={handleInputChange}
                    />
                    {/* Cancel button to clear input field */}
                    <button className='cancelbtn' onClick={handleCancel}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default QrCodeComponent;
