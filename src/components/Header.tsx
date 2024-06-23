import React from 'react';
import { useUserContext } from '../contexts/UserContext';

const Header = () => {
  const { userName, correctAnswers, gameOver, gameEndReason } = useUserContext();
  return (
    <div className="text-center text-lg md:text-xl lg:text-2xl p-4">
      {gameOver === true ? (
        <>
          Hi {userName}, <br />
          {gameEndReason === 'completed' ? (
            <>You completed the game! You got {correctAnswers} questions right!</>
          ) : (
            <>You ended the game with 3 wrong answers. You got {correctAnswers} questions right!</>
          )}
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
