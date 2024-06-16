"use client"

import * as z from "zod";
import toast from "react-hot-toast";
import { Brain } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NameSchema = z.object({
  name: z
  .string()
  .trim()
  .min(1, { message: "Name is required to proceed" })
  .min(3, { message: "Name is too short" })
  .max(15, { message: "Username is too long" })
});
type NameSchemaType = z.infer<typeof NameSchema>;

export default function Home() {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<NameSchemaType>({
    resolver: zodResolver(NameSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    // delayError: 400,
  });

  const onSubmit: SubmitHandler<NameSchemaType> = async (data) => {
    try {
      // user.setUsername(data.username);
      router.push("./game");
      
    } catch (err: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mt-10 mb-4">
            <span>Please enter your name below & press start button</span>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-center mb-4">
            <Input className="w-full md:w-1/2" placeholder="Enter your name" />
            <Button onClick={() => router.push('/game/')} className="mt-4 md:mt-0 md:ml-4">
              Start
            </Button>
          </div>
          <div className="flex h-4 md:w-full md:pl-2">
            {errors.name && (
              <span className="relative text-red-500 text-sm font-semibold sm:text-left -translate-y-1.5">
                {errors.name.message}
              </span>
            )}
          </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}