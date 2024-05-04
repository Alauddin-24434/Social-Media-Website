import React from 'react';
import './InteractiveImage.css';

const InteractiveImage = () => {
    return (
        <div className='flex bg-slate-300 p-8 py-32 h-screen'>
            <div className='flex-1 flex justify-center'>
                <div className="grid-container ">
                    <div className="grid-item item1">
                        <div className="card">
                            <div className="front">
                                <img src="/src/assets/images/card1f.jpg" alt="" className='cardImage' />
                            </div>
                            <div className="back">
                                <img src="/src/assets/images/card1b.jpg" alt="" className='cardImage' />
                            </div>
                        </div>
                    </div>
                    <div className="grid-item item2">
                        <div className="card">
                            <div className="front">
                                <img src="/src/assets/images/card2f.jpg" alt="" className='cardImage' />
                            </div>
                            <div className="back">
                                <img src="/src/assets/images/card2b.jpg" alt="" className='cardImage' />
                            </div>
                        </div>
                    </div>
                    <div className="grid-item item3">
                        <div className="card">
                            <div className="front">
                                <img src="/src/assets/images/card3f.jpg" alt="" className='cardImage' />
                            </div>
                            <div className="back">
                                <img src="/src/assets/images/card3b.jpg" alt="" className='cardImage' />
                            </div>
                        </div>
                    </div>
                    <div className="grid-item item4">
                        <div className="card">
                            <div className="front">
                                <img src="/src/assets/images/card4f.jpg" alt="" className='cardImage' />
                            </div>
                            <div className="back">
                                <img src="/src/assets/images/card4b.jpg" alt="" className='cardImage' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex-1'>
                <div className='flex flex-col gap-y-8'>
                    <h2 className='text-5xl font-bold'>
                        Analyze your audience and keep your followers engaged
                    </h2>
                    <p className='font-medium'>Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.</p>

                    <button className='bg-green-200 rounded-2xl w-1/3 py-2'>Get started for free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InteractiveImage;
