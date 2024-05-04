
import InteractiveGallery from '../../components/InteractiveGallery/InteractiveGallery';

import InteractiveImage from '../../components/InteractiveImage/InteractiveImage';

const Home = () => {


    return (
        <div className=''>
       <InteractiveImage/>

            {/* interactive galary section */}
            <div className="section">
                <InteractiveGallery />
            </div>

            {/* slider  section */}
            {/* <div className="section">
                <InteractiveSlider />
            </div> */}
        </div>
    );
};

export default Home;
