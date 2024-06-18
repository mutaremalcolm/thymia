"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const { correctAnswers, setCorrectAnswers, wrongAnswers, setWrongAnswers, restartGame } = useUserContext();
  const [chancesLeft, setChancesLeft] = useState(3); 
  const [questionsRemaining, setQuestionsRemaining] = useState(15); 
  const [currentLetter, setCurrentLetter] = useState<string>(""); 
  const [letters, setLetters] = useState<string[]>([]); 
  const [gameOver, setGameOver] = useState(false); 

  useEffect(() => {
    if (!gameOver) {
      generateNewLetter(); 

      const interval = setInterval(() => {
        progressGame();
      }, 3000);

      return () => clearInterval(interval); 
    }
  }, [gameOver]);

  const generateNewLetter = () => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
    setLetters((prevLetters) => [...prevLetters, letter]);
    setCurrentLetter(letter);
  };

  const handleSeenIt = () => {
    const letter2Back = letters[letters.length - 3]; 
    if (letter2Back === currentLetter) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
      setChancesLeft((prev) => prev - 1);
    }

    if (wrongAnswers + 1 >= 3) {
      endGame();
    }
  };

  const progressGame = () => {
    if (wrongAnswers >= 3 || questionsRemaining <= 1) {
      endGame();
      return;
    }

    setQuestionsRemaining((prev) => prev - 1);
    generateNewLetter();
  };

  const endGame = () => {
    setGameOver(true);
    alert(`Game Over! Errors: ${wrongAnswers}, Correct Guesses: ${correctAnswers}`);
  };

  const handleRestart = () => {
    setChancesLeft(3);
    setQuestionsRemaining(15);
    restartGame();
    setLetters([]);
    setCurrentLetter("");
    setGameOver(false);
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
              <CardDescription className="text-center">
                <div className="mt-5 text-9xl text-black dark:text-white">{currentLetter}</div>
              </CardDescription>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div className="mt-5">
        {gameOver ? (
          <Button onClick={handleRestart}>Start</Button>
        ) : (
          <Button onClick={handleSeenIt}>Seen It</Button>
        )}
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
