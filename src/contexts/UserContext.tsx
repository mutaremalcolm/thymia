"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";

export interface UserContextType {
  userName: string;
  correctAnswers: number;
  wrongAnswers: number;
  gameOver: boolean;
  gameEndReason: string;
  dispatch: React.Dispatch<UserAction>;
  restartGame: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserState = {
  userName: string;
  correctAnswers: number;
  wrongAnswers: number;
  gameOver: boolean;
  gameEndReason: string;
};

type UserAction =
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_CORRECT_ANSWERS'; payload: number }
  | { type: 'SET_WRONG_ANSWERS'; payload: number }
  | { type: 'SET_GAME_OVER'; payload: boolean }
  | { type: 'SET_GAME_END_REASON'; payload: string }
  | { type: 'RESET_GAME' };

const initialState: UserState = {
  userName: "",
  correctAnswers: 0,
  wrongAnswers: 0,
  gameOver: false,
  gameEndReason: "",
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_CORRECT_ANSWERS':
      return { ...state, correctAnswers: action.payload };
    case 'SET_WRONG_ANSWERS':
      return { ...state, wrongAnswers: action.payload };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.payload };
    case 'SET_GAME_END_REASON':
      return { ...state, gameEndReason: action.payload };
    case 'RESET_GAME':
      return { ...state, correctAnswers: 0, wrongAnswers: 0, gameOver: false, gameEndReason: "" };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(userReducer, initialState);

  const restartGame = () => {
    dispatch({ type: 'RESET_GAME' });
    toast.success("Event Logged: Game Restarted");
  };

  const logout = () => {
    dispatch({ type: 'SET_USER_NAME', payload: '' });
    router.push("./");
    toast.success("Event Logged: Log Out Successful");
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
        restartGame,
        logout,
      }}
    >
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
