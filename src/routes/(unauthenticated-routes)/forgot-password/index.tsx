import { changePassword } from "@/integrations/server-function/querry/users";
import { Button } from "@/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitEvent } from "react";

export const Route = createFileRoute(
  "/(unauthenticated-routes)/forgot-password/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const { password, userid } = Object.fromEntries(new FormData(e.target)) as {
      userid: string;
      password: string;
    };

    await changePassword({ data: { password, userid } });

    navigate({ to: "/" });
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
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
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
              />
            </div>

            <Button type="submit" className="w-full">
              Setup new password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
