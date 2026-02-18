import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import { Button } from "@/ui/shadcn/button";
import { SubmitEvent, useState } from "react";
import { isValidUser } from "@/integrations/server-function/querry/users";
import { cn } from "@/utils/cn";
import {
  setCookieDetails,
  UserDetails,
} from "@/integrations/server-function/cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/dialog";

export const Route = createFileRoute("/(unauthenticated-routes)/login/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    const userDetails = await isValidUser({
      data: {
        id: formData.userid as string,
        password: formData.password as string,
      },
    });

    if (!userDetails) return;

    if (userDetails.status === "not-approved") {
      setIsDialogOpen(true);
      return;
    }

    await setCookieDetails({
      data: {
        cokieName: "user",
        cookieValue: JSON.stringify({
          id: userDetails.id,
        } satisfies UserDetails),
      },
    });

    navigate({ to: "/" });
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {/* User ID */}
            <div className="space-y-2">
              <Label htmlFor="userid">User ID</Label>
              <Input
                id="userid"
                name="userid"
                type="text"
                placeholder="Enter your user ID"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className={cn(`flex items-center justify-between`)}>
                <Label htmlFor="password">Password</Label>
                <Link
                  className={cn(`text-sm text-blue-500`)}
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div>
            <p className={cn(`mt-4`)}>
              New user?{" "}
              <Link to="/signup" className={cn("text-blue-500")}>
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen}>
        <DialogContent
          onEscapeKeyDown={() => null}
          onPointerDownOutside={() => null}
          onInteractOutside={() => null}
        >
          <DialogHeader>
            <DialogTitle>Uh-uh.</DialogTitle>
            <DialogDescription>
              You haven't been approved till now.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
