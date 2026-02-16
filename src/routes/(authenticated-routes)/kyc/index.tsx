"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import { Button } from "@/ui/shadcn/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { cn } from "@/utils/cn";
import { SubmitEvent } from "react";
import { upsertKycDetails } from "@/integrations/server-function/querry/kyc";

export const Route = createFileRoute("/(authenticated-routes)/kyc/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className={cn(`container m-auto`)}>
      <KycPage />
    </main>
  );
}

export default function KycPage() {
  const navigate = useNavigate();

  async function submitKyc(e: SubmitEvent) {
    e.preventDefault();

    type UserFormData = {
      accountHolderName: string;
      bankAccount: string;
      branchName: string;
      bankName: string;
      aadhar: string;
      ifsc: string;
      pan: string;
    };

    const formData = Object.fromEntries(new FormData(e.target)) as UserFormData;

    const {
      accountHolderName,
      bankAccount,
      branchName,
      bankName,
      aadhar,
      ifsc,
      pan,
    } = formData;

    await upsertKycDetails({
      data: {
        accountHolderName,
        bankAccount,
        branchName,
        bankName,
        aadhar,
        ifsc,
        pan,
      },
    });

    navigate({ to: "/" });
  }

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">KYC Details</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={submitKyc}>
            {/* Aadhar */}
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                name="aadhar"
                type="text"
                placeholder="Enter your Aadhar number"
              />
            </div>

            {/* PAN */}
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                name="pan"
                type="text"
                placeholder="Enter your PAN number"
              />
            </div>

            {/* Bank Name */}
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                name="bankName"
                type="text"
                placeholder="Enter your bank name"
              />
            </div>

            {/* Account Holder Name */}
            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                name="accountHolderName"
                type="text"
                placeholder="Enter account holder name"
              />
            </div>

            {/* Bank Account */}
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input
                id="bankAccount"
                name="bankAccount"
                type="text"
                placeholder="Enter your bank account number"
              />
            </div>

            {/* Branch Name */}
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name</Label>
              <Input
                id="branchName"
                name="branchName"
                type="text"
                placeholder="Enter your bank branch name"
              />
            </div>

            {/* IFSC */}
            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                name="ifsc"
                type="text"
                placeholder="Enter IFSC code"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit KYC
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
