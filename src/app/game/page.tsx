"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { useUserContext, UserContextType } from "../../contexts/UserContext";

const Game: React.FC = () => {
  const {
    correctAnswers,
    setCorrectAnswers,
    wrongAnswers,
    setWrongAnswers,
    restartGame,
    gameOver,
    setGameOver,
    gameEndReason,
    setGameEndReason,
    logout,
  } = useUserContext() as UserContextType; // Asserting the correct type for context

  const [chancesLeft, setChancesLeft] = useState<number>(3);
  const [questionsRemaining, setQuestionsRemaining] = useState<number>(15);
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);
  const router = useRouter();

  const allowedLetters: string[] = ["A", "B", "C", ];

  useEffect(() => {
    if (!gameOver && questionsRemaining > 0) {
      const interval = setInterval(() => {
        setQuestionsRemaining((prev) => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            endGame('completed');
          }
          return newCount;
        });
        generateNewLetter();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameOver, questionsRemaining]);

  useEffect(() => {
    if (!gameOver && questionsRemaining > 0) {
      generateNewLetter();
    }
  }, [gameOver, questionsRemaining]);

  const generateNewLetter = () => {
    const letter: string =
      allowedLetters[Math.floor(Math.random() * allowedLetters.length)];
    setLetters((prevLetters) => {
      const newLetters = [...prevLetters, letter];
      setCurrentLetter(letter);
      return newLetters;
    });
  };

  const handleSeenIt = () => {
    if (letters.length < 3) {
      toast.error("Not enough letters to compare");
      return;
    }

    const letter2Back: string | undefined = letters[letters.length - 2];
    if (letter2Back === currentLetter) {
      toast.success("Event Logged: Correct Answer");
      setCorrectAnswers((prev) => prev + 1);
    } else {
      toast.error("Event Logged: Incorrect Answer");
      setWrongAnswers((prev) => prev + 1);
      setChancesLeft((prev) => prev - 1);
    }
    progressGame();
  };

  const progressGame = () => {
    if (wrongAnswers + 1 >= 3) {
      endGame('wrongAnswers');
      return;
    }
  };

  const endGame = (reason: string) => {
    setGameOver(true);
    setGameEndReason(reason);
  };

  const handleRestart = () => {
    setChancesLeft(3);
    setQuestionsRemaining(15);
    setWrongAnswers(0);
    setCorrectAnswers(0);
    setLetters([]);
    setCurrentLetter("");
    setGameOver(false);
    setGameEndReason('');
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
            <CardDescription>Chances Left: {chancesLeft}</CardDescription>
            <CardDescription>
              Questions Remaining: {questionsRemaining}
            </CardDescription>
          </div>
          <div className="text-center mt-5">
            <CardDescription>
              <div className="mt-5 text-9xl text-black dark:text-white">
                {currentLetter}
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div className="flex flex-row mt-5">
        {gameOver ? (
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
