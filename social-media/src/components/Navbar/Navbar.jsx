// Navbar.jsx

import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Navbar = () => {
  return (
    <nav className="  fixed z-10 my-4 w-full">
      <div className="max-w-7xl mx-auto bg-[#ef5777] rounded-full p-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            <Link to="/">Your Logo</Link>
          </div>
          <ul className="flex space-x-4">
            <li><Link to="/signup" className="text-white">Signup</Link></li>
            <li><Link to="/login" className="text-white">Login</Link></li>
            <li><Link to="/" className="text-white">Home</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
