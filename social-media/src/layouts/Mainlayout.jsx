import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Mainlayout = () => {
    return (
        <div>
            {/* navbar */}
            <div>
                <Navbar />
            </div>
            {/* out let */}
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Mainlayout;