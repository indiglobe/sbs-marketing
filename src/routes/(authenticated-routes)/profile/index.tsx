import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { kycDetails } from "@/integrations/server-function/querry/kyc";
import { getExistingUser } from "@/integrations/server-function/querry/users";
import { updateProfileDetails } from "@/integrations/server-function/update-profile";
import { Button } from "@/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import { SubmitEvent } from "react";

export const Route = createFileRoute("/(authenticated-routes)/profile/")({
  component: RouteComponent,
  loader: async () => {
    const cookie = await fetchCookieDetails({ data: "user" });
    if (!cookie) throw redirect({ to: "/" });

    const { id } = cookie;

    const userDetails = await getExistingUser({ data: { id } });

    const kycDetailsFromDb = await kycDetails({ data: { id } });

    return { userDetails, kycDetails: kycDetailsFromDb };
  },
});

function RouteComponent() {
  const { userDetails, kycDetails } = useLoaderData({
    from: "/(authenticated-routes)/profile/",
  });

  // const { id, city, name, phone, role } = userDetails;
  // const {
  //   aadhar,
  //   pan,
  //   ifsc,
  //   accountHolderName,
  //   branchName,
  //   bankAccount,
  //   bankName,
  // } = kycDetails;

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target)) as {
      aadhar: string;
      accountHolderName: string;
      bankAccount: string;
      bankName: string;
      branchName: string;
      city: string;
      ifsc: string;
      mobile: string;
      name: string;
      pan: string;
    };

    await updateProfileDetails({ data: { ...formData } });
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">My Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">User ID</Label>
              <Input
                id="userid"
                name="userid"
                type="text"
                placeholder="Your userid"
                disabled
                defaultValue={userDetails?.id}
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                defaultValue={userDetails?.name}
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
                defaultValue={userDetails?.phone}
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
                defaultValue={userDetails?.city}
              />
            </div>

            {/* Aadhar */}
            <div className="space-y-2">
              <Label htmlFor="city">Aadhar</Label>
              <Input
                id="aadhar"
                name="aadhar"
                type="text"
                placeholder="Your aadhar no"
                defaultValue={kycDetails?.aadhar}
              />
            </div>

            {/* Account holder name */}
            <div className="space-y-2">
              <Label htmlFor="city">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                name="accountHolderName"
                type="text"
                placeholder="Account holder name"
                defaultValue={kycDetails?.accountHolderName}
              />
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="city">Bank Account</Label>
              <Input
                id="bankAccount"
                name="bankAccount"
                type="text"
                placeholder="Bank Account"
                defaultValue={kycDetails?.bankAccount}
              />
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="city">Bank Name</Label>
              <Input
                id="bankName"
                name="bankName"
                type="text"
                placeholder="Bank Account"
                defaultValue={kycDetails?.bankName}
              />
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="city">Branch Name</Label>
              <Input
                id="branchName"
                name="branchName"
                type="text"
                placeholder="Bank Account"
                defaultValue={kycDetails?.branchName}
              />
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="city">IFSC</Label>
              <Input
                id="ifsc"
                name="ifsc"
                type="text"
                placeholder="Bank Account"
                defaultValue={kycDetails?.ifsc}
              />
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="city">PAN</Label>
              <Input
                id="pan"
                name="pan"
                type="text"
                placeholder="Bank Account"
                defaultValue={kycDetails?.pan}
              />
            </div>

            <Button type="submit" className="w-full">
              Update profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
