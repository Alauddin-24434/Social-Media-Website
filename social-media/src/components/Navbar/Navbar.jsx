// Navbar.jsx

import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Navbar = () => {
  return (
    <nav className="  fixed z-10 my-4  w-full p-2 lg:p-0">
      <div className="max-w-7xl mx-auto bg-[#ef5777] rounded-full p-2 px-10 lg:p-4 ">
        <div className="flex justify-between items-center">
          <div className="text-white text-lg font-bold hidden md:block lg:block">
            <Link to="/">Social Media</Link>
          </div>

          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/signup" className="text-white">Signup</Link></li>
            <li><Link to="/login" className="text-white">Login</Link></li>
            <li><Link to="/profile" className="text-white">Profile</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
