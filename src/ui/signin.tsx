import { cn } from "@/utils/cn";
import { GoogleSigninButton } from "./signin-buttons";
import { ComponentProps } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card";

export default function Signin({ ...props }: ComponentProps<"main">) {
  return (
    <main
      {...props}
      className={cn(`flex items-center justify-center`, props.className)}
    >
      <Card className={cn(`w-full max-w-100`)}>
        <CardHeader>
          <CardTitle>Hold up for a second</CardTitle>
          <CardDescription>
            You need to be signed in to continue with this action. It only takes
            a moment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSigninButton />
        </CardContent>
        <CardFooter>
          <p className={cn(`text-xs opacity-70`)}>
            We'll never post anything without your permission.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
