import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {Menu, X} from 'lucide-react'


export const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);


  }, []);
  return (
    <nav className={`
        ${isScrolled ? 'bg-black/20 backdrop-blur-md py-4' : 'py-6'}
        fixed top-0 right-0 left-0 z-10 transition-all duration-400`}>
          
      <div className='max-w-7xl mx-auto px-6 lg:px-12'>
        <div className='flex items-center justify-center'>

          <div className='hidden md:flex items-center gap-12'>
            <span className='cursor-pointer nav-link'><Link to="/#Home" >Home</Link></span>
            <span className='cursor-pointer nav-link'><Link to="/#Collection" >Products</Link></span>

          
            <Link to="/#Home"><img src="/logo(png).png" alt="Logo" className="h-14 w-auto px-10 object-contain cursor-pointer hover:scale-105 transition-all duration-300" /></Link>

          
            <span className='cursor-pointer nav-link'><Link to="/#aboutus">About us</Link></span>
            <span className='cursor-pointer nav-link'><Link to="/#contact" >Contact</Link></span>
          </div>

           <a href="#home" className="md:hidden logo-hover">
            <img 
              src="/logo(png).png" 
              alt="Kashmiri Beverages" 
              className="h-12 w-auto object-contain"
            />
          </a>

          <button className='md:hidden absolute right-6 text-white p-2' onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className='w-6 h-6'/>}</button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4': 'max-h-0 opacity-0'}`}>
          <div className='flex flex-col gap-4 py-4 border-t border-white/10'>
            <span className='text-white transition-all duration-300 text-center py-2'onClick={() => setIsMobileMenuOpen(false)}><Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link></span>
            <span className='text-white transition-all duration-300 text-center py-2'onClick={() => setIsMobileMenuOpen(false)}><Link to="/Products" onClick={() => window.scrollTo(0, 0)}>Products</Link></span>
            <span className='text-white transition-all duration-300 text-center py-2'onClick={() => setIsMobileMenuOpen(false)}><Link to="/about_us" onClick={() => window.scrollTo(0, 0)}>About us</Link></span>
            <span className='text-white transition-all duration-300 text-center py-2'onClick={() => setIsMobileMenuOpen(false)}><Link to="/Contact" onClick={() => window.scrollTo(0, 0)}>Contact</Link></span>
          </div>
        </div>
      </div>

    </nav>
  )
}
