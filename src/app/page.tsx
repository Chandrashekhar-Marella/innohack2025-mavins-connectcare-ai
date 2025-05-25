"use client"


import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import { SetStateAction, useState } from 'react';

export default function Home ()
{

  const [ isLoggedIn, setIsLoggedIn ] = useState( false );
  const [ user, setUser ] = useState( null );

  const handleLogin = ( userData: SetStateAction<null> ) =>
  {
    setUser( userData );
    setIsLoggedIn( true );
  };

  const handleLogout = () =>
  {
    setIsLoggedIn( false );
    setUser( null );
  };

  return (
    <div>
      { !isLoggedIn ? (
        <LoginPage onLogin={ handleLogin } />
      ) : (
        <ChatPage user={ user } onLogout={ handleLogout } />
      ) }


    </div>

  );
}
