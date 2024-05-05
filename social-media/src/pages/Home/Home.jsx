



import InteractiveImage from '../../components/InteractiveImage/InteractiveImage';
import Slider from '../../components/SliderComponent/Slider';



const Home = () => {

    return (
        <div className='bg-slate-300 '>
            <InteractiveImage />

            <div className='p-0 lg:p-[90px]'>
                <Slider />
            </div>

        </div>
    );
};

export default Home;
