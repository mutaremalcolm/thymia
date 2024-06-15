"use client"

import { Brain } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center mb-5">
            Welcome to the Two-Back Application
          </CardTitle>
          <div className="text-center mb-5">
            <CardDescription>
              A gamified version of a classical experimental psychology task
              which measures working memory.
            </CardDescription>
          </div>
          <div className="flex justify-center">
            <Brain height={60} width={60} />
          </div>
          <div className="text-center mt-5">
            <CardDescription>
              <CardDescription className="text-center">
                <div className="mt-5 text-black dark:text-white">
                    You&apos;ll see a sequence of stimuli, with letters displayed
                    every 3000 milliseconds. Your task is to determine if the
                    current letter matches the one shown two steps earlier. The
                    game ends either when the sequence is complete or after 3
                    incorrect answers.
                </div>
              </CardDescription>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mt-10 mb-4">
            <span>Please enter your name below & press start button</span>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-center mb-4">
            <Input className="w-full md:w-1/2" placeholder="Enter your name" />
            <Button onClick={() => router.push('/game/')} className="mt-4 md:mt-0 md:ml-4">
              Start
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}