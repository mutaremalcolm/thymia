import React from 'react';
import  {useUserContext } from '../contexts/UserContext'

const Header = () => {
  const { userName } = useUserContext();
  return (
    <div className="text-center text-lg md:text-xl lg:text-2xl p-4">
      Hi {userName} <br />
      Test is starting right now
    </div>
  );
}

export default Header;
