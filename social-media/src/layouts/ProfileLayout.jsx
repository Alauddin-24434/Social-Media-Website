import Sidebar from "../components/sidebar/Sidebar";

const ProfileLayout = ({ children }) => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen); // Toggle the state to open/close the sidebar
    // };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {/* Sidebar */}
                <div className="hidden lg:block" style={{ width: '20%', position: 'fixed', top: 0, bottom: 0, left: 0 }}>
                    <Sidebar />
                </div>

                {/* Content Area */}
                <div  className='ml-0 lg:ml-[205px]  w-full h-full bg-slate-100' >
                    {/* Toggle Button */}
                    {/* <button onClick={toggleSidebar}>{isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}</button> */}

                    {/* Main Content */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
