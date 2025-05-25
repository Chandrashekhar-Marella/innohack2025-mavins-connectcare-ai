"use client"

import Image from 'next/image';
import { LogOut, User } from 'lucide-react';

const Header = ( { user, onLogout } ) =>
{
   
   
    return (
        <header className="shadow-2xl bg-[#f3f4f4] text-white p-4 font-inter">
            <nav className="container mx-auto flex justify-between items-center">

                <div className="flex items-center">
                    <Image
                        src="/assets/CignaLogo.png"
                        width={ 100 }
                        height={ 100 }
                        alt="Picture of the author"
                    />
                    <span className='mr-2 text-[#0931dc]'>|</span> <span className="text-xl font-medium text-[#7c73b3] font-semibold"> ConnectCare AI</span>
                </div>

                <div className="hidden md:flex space-x-6">                   
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">                           
                            <User className="h-6 w-6 text-gray-800" />
                            <span className="text-[#0931dc] font-medium">{ user?.name }</span>
                        </div>
                        <button
                            onClick={ onLogout }
                            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                            style={ { backgroundColor: '#0ca0c8' } }
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>


                </div>

                {/* Mobile Menu Button - Visible only on small screens */ }

                <div className="md:hidden">
                    <button className="text-white focus:outline-none p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                        {/* SVG icon for a hamburger menu */ }
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header