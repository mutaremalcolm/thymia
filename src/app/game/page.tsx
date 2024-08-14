"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React, { useReducer, useEffect, useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sendAnalyticsEvent } from "@/lib/analytics";

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
    state: userState,
    dispatch: userDispatch,
    restartGame,
    logout,
    showAnalytics,
  } = useUserContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const allowedEmojis: string[] = ["🚀", "🌍", "🚜"];

  // Weighted random selection
  const generateNewEmoji = useCallback(() => {
    const emojiWeights: any = {
      "🚀": 0.4, // 40% chance
      "🌍": 0.4, // 40% chance
      "🚜": 0.2, // 20% chance
    };

    const random = Math.random();
    let cumulativeWeight = 0;
    let selectedEmoji = allowedEmojis[0];

    for (const emoji of allowedEmojis) {
      cumulativeWeight += emojiWeights[emoji];
      if (random < cumulativeWeight) {
        selectedEmoji = emoji;
        break;
      }
    }

    dispatch({ type: actionTypes.SET_LETTER, payload: selectedEmoji });
  }, [allowedEmojis]);

  useEffect(() => {
    if (!state.isGameOver) {
      if (state.questionsRemaining <= 0) {
        dispatch({ type: actionTypes.SET_GAME_OVER });
        userDispatch({ type: "SET_GAME_OVER", payload: true });
        userDispatch({ type: "SET_GAME_END_REASON", payload: "completed" });
      } else {
        const interval = setInterval(() => {
          dispatch({ type: actionTypes.DECREMENT_COUNT });
          generateNewEmoji();
        }, 2000);
        return () => clearInterval(interval);
      }
    }
  }, [state.isGameOver, state.questionsRemaining, generateNewEmoji, userDispatch]);

  const handleSeenIt = () => {
    if (state.letters.length < 2) {
      sendAnalyticsEvent(showAnalytics, "Not enough emojis to compare", "error");
      return;
    }

    const Emoji_2_Positions_Back: string | undefined = state.letters[state.letters.length - 2];
    if (Emoji_2_Positions_Back === state.currentLetter) {
      sendAnalyticsEvent(showAnalytics, "Correct Answer", "success");
      userDispatch({ type: "SET_CORRECT_ANSWERS", payload: userState.correctAnswers + 1 });
    } else {
      sendAnalyticsEvent(showAnalytics, "Incorrect Answer", "error");
      dispatch({ type: actionTypes.INCREMENT_WRONG_ANSWERS });
      dispatch({ type: actionTypes.DECREMENT_COUNT, payload: true });
    }

    if (state.wrongAnswers + 1 >= 3 || state.questionsRemaining - 1 <= 0) {
      dispatch({ type: actionTypes.SET_GAME_OVER });
      userDispatch({ type: "SET_GAME_OVER", payload: true });
      userDispatch({ type: "SET_GAME_END_REASON", payload: state.wrongAnswers + 1 >= 3 ? "wrongAnswers" : "completed" });
    }
  };

  const handleRestart = () => {
    dispatch({ type: actionTypes.RESET_GAME });
    userDispatch({ type: "RESET_GAME" });
    restartGame();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center mb-5">
            <Header />
          </CardTitle>
          <div className="flex justify-evenly mb-5 text-sm md:text-base">
            <CardDescription>Chances Left: {state.chancesLeft}</CardDescription>
            <CardDescription>
              Questions Remaining: {state.questionsRemaining}
            </CardDescription>
          </div>
          <div className="text-center mt-5">
            <CardDescription>
              <div className="mt-5 text-6xl md:text-9xl text-black dark:text-white">
                {state.currentLetter}
              </div>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-col md:flex-row mt-5 space-y-4 md:space-y-0 md:space-x-5">
        {state.isGameOver ? (
          <Button onClick={handleRestart}>Start</Button>
        ) : (
          <Button onClick={handleSeenIt}>Seen It</Button>
        )}
        <Button onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="flex items-center mt-10 mb-4 text-sm md:text-base">
        <span>
          Practice helps your memory get better. The more you play the better
          you get.
        </span>
      </div>
    </main>
  );
};

export default Game;
