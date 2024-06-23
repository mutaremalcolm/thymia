"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export interface UserContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  correctAnswers: number;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  wrongAnswers: number;
  setWrongAnswers: React.Dispatch<React.SetStateAction<number>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameEndReason: string;
  setGameEndReason: React.Dispatch<React.SetStateAction<string>>;
  restartGame: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>('');
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameEndReason, setGameEndReason] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [userName]);

  const restartGame = () => {
    toast.success('Event Logged: Game Restarted')
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameOver(false);
    setGameEndReason('');
  };

  const goToHome = () => {
     toast.success('Event Logged: Back to Home')
     router.push("./")
  }

  const logout = () => {
    toast.success('Event Logged: Log Out Successful')
    setUserName('');
    localStorage.removeItem('userName');
    goToHome();
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, correctAnswers, setCorrectAnswers, wrongAnswers, setWrongAnswers, gameOver, setGameOver, gameEndReason, setGameEndReason, restartGame, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
