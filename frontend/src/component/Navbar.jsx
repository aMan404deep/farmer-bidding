import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="bg-transparent py-4 shadow-md">
      <NavigationBar />
    </div>
  );
};

const NavigationBar = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav className="flex items-center justify-between px-6 md:px-12">
      {/* Logo */}
      {/* <div className="text-xl font-bold text-black">LOGO</div> */}
      
      {/* Navigation */}
      <ul
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        className="relative flex w-fit rounded-full border-2 border-white  p-2"
      >
         <Link to="/dashboard">
            <NavItem setPosition={setPosition}>Home</NavItem>
          </Link>
          <Link to="/bidding">
        <NavItem setPosition={setPosition}>Bidding</NavItem>
          </Link>
        <NavItem setPosition={setPosition}>Profile</NavItem>
        <NavItem setPosition={setPosition}>Analytics</NavItem>
        <Cursor position={position} />
      </ul>
    </nav>
  );
};

const NavItem = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="relative z-10 block cursor-pointer px-4 py-2 text-sm uppercase text-white  md:px-6 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 h-8 rounded-full bg-zinc-600 md:h-10"
    />
  );
};

export default Navbar;
