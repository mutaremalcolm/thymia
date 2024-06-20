"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  correctAnswers: number;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  wrongAnswers: number;
  setWrongAnswers: React.Dispatch<React.SetStateAction<number>>;
  restartGame: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>('');
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  const restartGame = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, correctAnswers, setCorrectAnswers, wrongAnswers, setWrongAnswers, restartGame }}>
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
