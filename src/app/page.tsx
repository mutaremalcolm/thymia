import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Welcome to the Two-Back Application
          </CardTitle>
          <CardDescription className="text-center">
            A gamified version of a classical experimental psychology task which
            measures working memory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p>
              To begin the game please enter your name below and press the start
              button
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <Input className="w-1/2" placeholder="Enter your name" />
          </div>
          <div className="flex justify-center">
            <Button>Start</Button>
          </div>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </main>
  );
}
