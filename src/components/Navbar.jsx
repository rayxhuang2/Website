import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom"
import NameLogo from '../assets/images/NameLogo.svg';
import menuLogo from '../assets/icons/menu.svg';
import closeLogo from '../assets/icons/close.svg';

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          if (scrollTop > 100) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);    

    return (
        <header className="header">
            <nav 
                className={`fixed top-0 z-20 w-full flex items-center py-5 ${
                    scrolled ? "bg-blue-200" : "bg-transparent"} text-lg gap-7 font-medium left-0 right-0`}
            >
                <div className='w-full flex justify-between items-center max-w-5xl mx-auto max-container nav-div'>
                    <NavLink to="/" className ="flex items-center justify-center">
                        <img src={NameLogo} alt="Logo" className="h-10 w-auto " />
                    </NavLink>

                    <ul className='list-none hidden sm:flex flex-row gap-8'>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black' }>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/works" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black' }>
                                Works
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black' }>
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    <div className='sm:hidden flex flex-1 justify-end items-center'>
                        <img
                            src={toggle ? closeLogo : menuLogo}
                            alt='menu'
                            className='w-[28px] h-[28px] object-contain'
                            onClick={() => setToggle(!toggle)}
                        />

                        <div className={`${ !toggle ? "hidden" : "flex" } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                                <li>
                                    <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black' }>
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/works" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black' }>
                                        Works
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black' }>
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>

                        </div>

                    </div>

                </div>
                
            </nav>
        </header>
    ) 
}

export default Navbar