import { Instagram, } from "lucide-react";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <section className='py-12 text-gray-400 md:p-20 bg-linear-to-b from-gray-800 to-black px-6 lg:px-12'>
        {/* Top section */}
        <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
          <div className=''>
            <img src="/logo(png).png" alt="" className='w-40 mb-4 transition-transform duration-300 hover:scale-105' />
            <p className='text-sm leading-relaxed max-w-sm transition-all duration-300'>Crafting refreshing moments with authentic flavors. Experience the taste of tradition in every sip.</p>
          </div>
          {/* Quick links */}
            <div className="links">
              <h3 className='font-semibold mb-4 text-white '>Quick Links</h3>
              <ul className='space-y-2'>
                <li className='cursor-pointer text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1'><Link to="/#Home" >Home</Link></li>
                <li className='cursor-pointer text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1'><Link to="/#aboutus" >About us</Link></li>
                <li className='cursor-pointer text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1'><Link to="/#Collection" >Products</Link></li>
                <li className='cursor-pointer text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1'><Link to="/#contact" >Contact</Link></li>
              </ul>
            </div>
          {/* Follow us */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Follow Us</h3>
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer group hover:-translate-y-1 duration-300">
                <a href="https://www.instagram.com/kashmiri_beverages?igsh=M3ZndjAzY3I4MHdr"><Instagram size={18} className='group-hover:text-white transition-all duration-300' /></a>
            </div>
          </div>
      </div>
        {/* Divider */}
        <div className="border-t border-zinc-800 mt-14 py-6 flex-row justify-between items-center text-sm">
        <p>© 2024 Kashmiri Beverages. All rights reserved.</p>
        </div>
      </section>
    </>
  )
}

export default Footer