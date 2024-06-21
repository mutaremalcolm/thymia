import React from 'react';
import { useUserContext } from '../contexts/UserContext';

const Header = () => {
  const { userName, correctAnswers, gameOver } = useUserContext();
  return (
    <div className="text-center text-lg md:text-xl lg:text-2xl p-4">
      {gameOver ? (
        <>
          Hi {userName}, <br />
          You got {correctAnswers} questions right!
        </>
      ) : (
        <>
          Hi {userName}, <br />
          Test is starting right now
        </>
      )}
    </div>
  );
}

export default Header;
