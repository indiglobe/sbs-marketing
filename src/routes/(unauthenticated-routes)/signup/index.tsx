"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import { Button } from "@/ui/shadcn/button";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { SubmitEvent } from "react";
import { creteNewUser } from "@/integrations/server-function/querry/users";
import { cn } from "@/utils/cn";
import {
  setCookieDetails,
  UserDetails,
} from "@/integrations/server-function/cookie";
import { createNewTeam } from "@/integrations/server-function/querry/teams";
import {
  addMemberIntoAllTeams,
  addMemberIntoTeam,
  getAllTeamsForUserWithId,
} from "@/integrations/server-function/querry/user-in-team";

export const Route = createFileRoute("/(unauthenticated-routes)/signup/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const search: { referrer_id: string; referrer_name: string } = useSearch({
    from: "/(unauthenticated-routes)",
  });
  const navigate = useNavigate();
  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    const { id } = await creteNewUser({
      data: {
        city: data.city as string,
        name: data.name as string,
        password: data.password as string,
        phone: data.mobile as string,
        referredBy:
          (data.referredBy as string) === ""
            ? null
            : (search.referrer_id as string),
      },
    });

    const { id: newTeamId } = await createNewTeam();

    const allTeamsJoinedByReferrer = await getAllTeamsForUserWithId({
      data: { userid: search.referrer_id },
    });

    await addMemberIntoTeam({ data: { memberId: id, teamId: newTeamId } });

    await addMemberIntoAllTeams({
      data: {
        teamsId: allTeamsJoinedByReferrer.map((t) => t.teamId),
        userId: id,
      },
    });

    await setCookieDetails({
      data: {
        cokieName: "user",
        cookieValue: JSON.stringify({
          id: id,
        } satisfies UserDetails),
      },
    });

    navigate({ to: "/" });
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="Enter your city"
              />
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                name="mobile"
                type="text"
                placeholder="Enter your mobile number"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
              />
            </div>

            {/* referrer */}
            <div className="space-y-2">
              <Label htmlFor="">Referred By</Label>
              <Input
                type="text"
                placeholder="Referrer name"
                disabled
                defaultValue={search.referrer_name}
              />
            </div>

            {/* referrer */}
            <div className="space-y-2">
              <Label htmlFor="referrer">Referrer code</Label>
              <Input
                id="referrer"
                name="referrer"
                type="text"
                disabled
                placeholder="Referrer id"
                defaultValue={search.referrer_id}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <p className={cn(`mt-4`)}>
            Already an user?{" "}
            <Link to="/login" className={cn("text-blue-500")}>
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
