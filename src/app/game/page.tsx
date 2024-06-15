import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Header from "@/components/Header";

const Game = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center mb-5">
              <Header />
            </CardTitle>
            <div className="flex justify-between mb-5">
              <CardDescription>Chances Left</CardDescription>
              <CardDescription>Questions remaining</CardDescription>
            </div>
            <div className="text-center mt-5">
              <CardDescription>
                <CardDescription className="text-center">
                  <div className="mt-5 text-black dark:text-white">A</div>
                </CardDescription>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <div className="mt-5">
          <Button>Seen It</Button>
        </div>
        <div className="flex items-center mt-10 mb-4">
          <span>
            Practice helps your memory get better. The more you play the better
            you get
          </span>
        </div>
      </main>
    </>
  );
};

export default Game;
