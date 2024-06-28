"use client";

import toast from "react-hot-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React, { useReducer, useEffect, useCallback } from "react";
import { useUserContext, UserContextType } from "../../contexts/UserContext";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// Initial state type
type State = {
  chancesLeft: number;
  questionsRemaining: number;
  currentLetter: string;
  letters: string[];
  isGameOver: boolean;
  wrongAnswers: number;
};

// Initial state
const initialState: State = {
  chancesLeft: 3,
  questionsRemaining: 15,
  currentLetter: "",
  letters: [],
  isGameOver: false,
  wrongAnswers: 0,
};

// Action types
const actionTypes = {
  SET_LETTER: "SET_LETTER",
  DECREMENT_COUNT: "DECREMENT_COUNT",
  SET_GAME_OVER: "SET_GAME_OVER",
  RESET_GAME: "RESET_GAME",
  INCREMENT_WRONG_ANSWERS: "INCREMENT_WRONG_ANSWERS",
} as const;

// Action type definitions
type Action =
  | { type: typeof actionTypes.SET_LETTER; payload: string }
  | { type: typeof actionTypes.DECREMENT_COUNT; payload?: boolean }
  | { type: typeof actionTypes.SET_GAME_OVER }
  | { type: typeof actionTypes.RESET_GAME }
  | { type: typeof actionTypes.INCREMENT_WRONG_ANSWERS };

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.SET_LETTER:
      return {
        ...state,
        currentLetter: action.payload,
        letters: [...state.letters, action.payload],
      };
    case actionTypes.DECREMENT_COUNT:
      return {
        ...state,
        questionsRemaining: state.questionsRemaining - 1,
        chancesLeft: action.payload ? state.chancesLeft - 1 : state.chancesLeft,
      };
    case actionTypes.SET_GAME_OVER:
      return {
        ...state,
        isGameOver: true,
      };
    case actionTypes.RESET_GAME:
      return initialState;
    case actionTypes.INCREMENT_WRONG_ANSWERS:
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
      };
    default:
      return state;
  }
};

const Game: React.FC = () => {
  const {
    setCorrectAnswers,
    restartGame,
    setGameOver,
    setGameEndReason,
    logout,
  } = useUserContext() as UserContextType; // Asserting the correct type for context

  const [state, dispatch] = useReducer(reducer, initialState);

  const allowedLetters: string[] = ["A", "B", "C"];

  const generateNewLetter = useCallback(() => {
    const letter: string =
      allowedLetters[Math.floor(Math.random() * allowedLetters.length)];
      dispatch({ type: actionTypes.SET_LETTER, payload: letter });
  }, [allowedLetters]);

  useEffect(() => {
    if (!state.isGameOver && state.questionsRemaining > 0) {
      const interval = setInterval(() => {
        dispatch({ type: actionTypes.DECREMENT_COUNT });
        generateNewLetter();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [state.isGameOver, state.questionsRemaining, generateNewLetter]);

  const handleSeenIt = () => {
    if (state.letters.length < 2) {
      toast.error("Not enough letters to compare");
      return;
    }

    const letter2Back: string | undefined = state.letters[state.letters.length - 2];
    if (letter2Back === state.currentLetter) {
      toast.success("Event Logged: Correct Answer");
      setCorrectAnswers((prev) => prev + 1);
    } else {
      toast.error("Event Logged: Incorrect Answer");
      dispatch({ type: actionTypes.INCREMENT_WRONG_ANSWERS });
      dispatch({ type: actionTypes.DECREMENT_COUNT, payload: true });
    }

    if (state.wrongAnswers + 1 >= 3 || state.questionsRemaining - 1 <= 0) {
      dispatch({ type: actionTypes.SET_GAME_OVER });
      setGameEndReason(state.wrongAnswers + 1 >= 3 ? "wrongAnswers" : "completed");
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    dispatch({ type: actionTypes.RESET_GAME });
    setGameOver(false);
    setGameEndReason("");
    restartGame();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center mb-5">
            <Header />
          </CardTitle>
          <div className="flex justify-between mb-5">
            <CardDescription>Chances Left: {state.chancesLeft}</CardDescription>
            <CardDescription>
              Questions Remaining: {state.questionsRemaining}
            </CardDescription>
          </div>
          <div className="text-center mt-5">
            <CardDescription>
              <div className="mt-5 text-9xl text-black dark:text-white">
                {state.currentLetter}
              </div>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-row mt-5">
        {state.isGameOver ? (
          <Button onClick={handleRestart}>Start</Button>
        ) : (
          <Button onClick={handleSeenIt}>Seen It</Button>
        )}
        <Button className="ml-5" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="flex items-center mt-10 mb-4">
        <span>
          Practice helps your memory get better. The more you play the better
          you get.
        </span>
      </div>
    </main>
  );
};

export default Game;
