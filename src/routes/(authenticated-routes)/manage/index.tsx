import { cn } from "@/utils/cn";
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";
import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import {
  getAllUsers,
  getExistingUser,
  toggleUserActivation,
} from "@/integrations/server-function/querry/users";
import { allKycDetails } from "@/integrations/server-function/querry/kyc";
import {
  addNewEvent,
  allEvents,
  deleteEvent,
} from "@/integrations/server-function/querry/events";
import { Button } from "@/ui/shadcn/button";
import { useLatestEvent } from "@/hooks/use-latest-event";
import { Trash } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(authenticated-routes)/manage/")({
  component: RouteComponent,

  beforeLoad: async () => {
    const cookieDetails = await fetchCookieDetails({ data: "user" });

    if (!cookieDetails) throw redirect({ to: "/" });

    const userDetails = await getExistingUser({
      data: { id: cookieDetails.id },
    });

    if (!userDetails) throw redirect({ to: "/" });

    if (userDetails.role === "basic") {
      throw redirect({ to: "/" });
    }
  },

  loader: async () => {
    const kycDetails = await allKycDetails();
    const events = await allEvents();
    const allUsers = await getAllUsers();

    return { kycDetails, events, allUsers };
  },
});

function RouteComponent() {
  return (
    <main className={cn(`container m-auto space-y-4`)}>
      <UsersList />
      <KYCList />
      <EventsList />
    </main>
  );
}

function KYCList() {
  const { kycDetails } = useLoaderData({
    from: "/(authenticated-routes)/manage/",
  });

  return (
    <div>
      <div className={cn(`pb-4 text-xl font-semibold`)}>KYC Details</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Aadhar</TableHead>
            <TableHead>Account Holder Name</TableHead>
            <TableHead>Bank Account</TableHead>
            <TableHead className="text-right">Bank Name</TableHead>
            <TableHead className="text-right">Branch Name</TableHead>
            <TableHead className="text-right">IFSC</TableHead>
            <TableHead className="text-right">PAN</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kycDetails.map((kyc) => (
            <TableRow key={kyc.id}>
              <TableCell className="font-medium">{kyc.aadhar}</TableCell>
              <TableCell>{kyc.accountHolderName}</TableCell>
              <TableCell>{kyc.bankAccount}</TableCell>
              <TableCell className="text-right">{kyc.bankName}</TableCell>
              <TableCell className="text-right">{kyc.branchName}</TableCell>
              <TableCell className="text-right">{kyc.ifsc}</TableCell>
              <TableCell className="text-right">{kyc.pan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UsersList() {
  const { allUsers } = useLoaderData({
    from: "/(authenticated-routes)/manage/",
  });

  return (
    <div>
      <div className={cn(`pb-4 text-xl font-semibold`)}>User Details</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">User ID</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Phone</TableHead>
            <TableHead className="text-left">City</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.phone}</TableCell>
              <TableCell className="font-medium">{user.city}</TableCell>
              <TableCell className="text-center font-medium">
                <Button
                  onClick={() =>
                    toggleUserActivation({
                      data: {
                        newActivationStatus: !user.isActive,
                        userid: user.id,
                      },
                    })
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EventsList() {
  const { events } = useLoaderData({
    from: "/(authenticated-routes)/manage/",
  });
  const loaderData = useLoaderData({ from: "/(authenticated-routes)" });
  const { data } = useLatestEvent();
  const [shouldDisableAddEventButton, setShouldDisableAddEventButton] =
    useState(false);

  async function addNewEventToDB() {
    if (!data) return;
    const oneMonthLater = new Date(data.toISOString());

    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    await addNewEvent({
      data: { eventDate: new Date(oneMonthLater).toDateString() },
    });
    setShouldDisableAddEventButton(true);

    await new Promise((res) => setTimeout(res, 15 * 1000));

    setShouldDisableAddEventButton(false);
  }

  return (
    <div>
      <div className={cn(`flex justify-between`)}>
        <div className={cn(`pb-4 text-xl font-semibold`)}>Events Details</div>
        {loaderData?.role === "admin" && (
          <Button
            type="button"
            disabled={shouldDisableAddEventButton}
            onClick={addNewEventToDB}
          >
            Add new Event
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Sl no.</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead className={cn(`text-right`)}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, idx) => (
            <TableRow key={event.id}>
              <TableCell className="text-left">{idx + 1}</TableCell>
              <TableCell className="font-medium">
                {new Date(event.eventDate).toUTCString()}
              </TableCell>
              <TableCell className="text-right font-medium">
                <Button
                  variant={"destructive"}
                  onClick={async () => deleteEvent({ data: { id: event.id } })}
                >
                  <Trash className={cn(`size-5`)} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
