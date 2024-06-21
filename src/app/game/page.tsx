"use client";

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
import { useUserContext } from "../../contexts/UserContext";

const Game = () => {
  const {
    correctAnswers,
    setCorrectAnswers,
    wrongAnswers,
    setWrongAnswers,
    restartGame,
    gameOver,
    setGameOver,
    logout,
  } = useUserContext();
  const [chancesLeft, setChancesLeft] = useState(3);
  const [questionsRemaining, setQuestionsRemaining] = useState(15);
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);
  const router = useRouter();

  const allowedLetters = ["A", "B", "C", "D", "E", "F"];

  useEffect(() => {
    if (!gameOver) {
      generateNewLetter();

      const interval = setInterval(generateNewLetter, 2000);
      return () => clearInterval(interval);
    }
  }, [gameOver, questionsRemaining]);

  const generateNewLetter = () => {
    const letter = allowedLetters[Math.floor(Math.random() * allowedLetters.length)];
    setLetters((prevLetters) => [...prevLetters, letter]);
    setCurrentLetter(letter); 
    // progressGame()
  };

  const handleSeenIt = () => {
    const letter2Back = letters[letters.length - 3];
    if (letter2Back === currentLetter) {
      toast("Correct Answer");
      setCorrectAnswers((prev) => prev + 1);
    } else {
      toast("InCorrect Answer");
      setWrongAnswers((prev) => prev + 1);
      setChancesLeft((prev) => prev - 1);
    }

  };

  const progressGame = () => {
    if (wrongAnswers >= 3 || questionsRemaining <= 0) {
      endGame();
      return;
    }

    setQuestionsRemaining((prev) => prev - 1); 
    if (questionsRemaining === 0) {
      endGame();
    }
  };

  const endGame = () => {
    setGameOver(true);
  };


  const handleRestart = () => {
    setChancesLeft(3);
    setQuestionsRemaining(15);
    setWrongAnswers(0);
    setCorrectAnswers(0);
    setLetters([]);
    setCurrentLetter("");
    setGameOver(false);
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
            <CardDescription>Questions Remaining: {questionsRemaining}</CardDescription>
          </div>
          <div className="text-center mt-5">
            <CardDescription>
              <div className="mt-5 text-9xl text-black dark:text-white">{currentLetter}</div>
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
        <Button className='ml-5' onClick={logout}>Logout</Button>
      </div>
      <div className="flex items-center mt-10 mb-4">
        <span>
          Practice helps your memory get better. The more you play the better you get.
        </span>
      </div>
    </main>
  );
};

export default Game;
