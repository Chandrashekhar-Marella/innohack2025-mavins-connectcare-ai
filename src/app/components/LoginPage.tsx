"use client"

import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const LoginPage = ( { onLogin } ) =>
{
  const [ showPassword, setShowPassword ] = useState( false );
  const [ userId, setUserId ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );

  const handleSubmit = async () =>
  {
    if ( !userId || !password ) return;

    setIsLoading( true );

    // Simulate API call
    setTimeout( () =>
    {
      setIsLoading( false );
      // Simulate successful login
      const userData = { id: userId, name: `${ userId }` };
      onLogin( userData );
      console.log( 'Login successful:', { userId, password } );
    }, 2000 );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Elements */ }
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-40 " style={ { backgroundColor: '#54bb49' } }></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20  delay-1000" style={ { backgroundColor: '#0c84c4' } }></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 delay-500" style={ { backgroundColor: '#f8941c' } }></div>

      </div>

      {/* Login Form Container */ }
      <div className="relative z-10 w-full max-w-lg">
        {/* Main Card */ }
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-white/50 shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
          {/* Header */ }
          <div className="flex items-center mb-8 justify-center">
            <Image
              src="/assets/CignaLogo.png"
              width={ 150 }
              height={ 150 }
              alt="Picture of the author"
            />
            <span className='mr-2 text-[#0931dc] text-3xl'>|</span> <span className="text-3xl font-medium text-[#7c73b3] font-semibold"> ConnectCare AI</span>
          </div>

          {/* Form */ }
          <div className="space-y-6">
            {/* User ID Field */ }
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-6 w-6 text-gray-800" />
              </div>
              <input
                type="text"
                value={ userId }
                onChange={ ( e ) => setUserId( e.target.value ) }
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-50"
                style={ { focusRingColor: '#0c84c4' } }
                placeholder="Enter your user ID"
                required
              />
            </div>

            {/* Password Field */ }
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-6 w-6 text-gray-800" />
              </div>
              <input
                type={ showPassword ? 'text' : 'password' }
                value={ password }
                onChange={ ( e ) => setPassword( e.target.value ) }
                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-50"
                style={ { focusRingColor: '#0c84c4' } }
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={ () => setShowPassword( !showPassword ) }
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                { showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" /> }
              </button>
            </div>

            {/* Submit Button */ }
            <button
              onClick={ handleSubmit }
              disabled={ isLoading || !userId || !password }
              className="w-full text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              style={ { background: 'linear-gradient(135deg, #54bb49, #0c84c4)' } }
            >
              { isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              ) }
            </button>
          </div>
        </div>

        {/* Floating elements */ }
        <div className=" absolute  -top-4 -right-4 w-14 h-14 rounded-full shadow-lg"
          style={ { backgroundColor: '#95bdd9', animationDelay: '1s' } }></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full  shadow-lg"
          style={ { backgroundColor: '#0931dc', animationDelay: '2s' } }></div>      
      </div>
    </div>

  )
}

export default LoginPage