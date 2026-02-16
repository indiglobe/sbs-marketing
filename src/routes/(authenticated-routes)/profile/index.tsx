import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { kycDetails } from "@/integrations/server-function/querry/kyc";
import { getExistingUser } from "@/integrations/server-function/querry/users";
import { cn } from "@/utils/cn";
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";

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

  return (
    <main>
      {userDetails && (
        <>
          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>ID</div>
            <div className={cn(`opacity-70`)}>{userDetails.id}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Name</div>
            <div className={cn(`opacity-70`)}>{userDetails.name}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Phone</div>
            <div className={cn(`opacity-70`)}>{userDetails.phone}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Role</div>
            <div className={cn(`opacity-70`)}>{userDetails.role}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>City</div>
            <div className={cn(`opacity-70`)}>{userDetails.city}</div>
          </div>
        </>
      )}

      {kycDetails && (
        <>
          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Aadhar</div>
            <div className={cn(`opacity-70`)}>{kycDetails.aadhar}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>PAN</div>
            <div className={cn(`opacity-70`)}>{kycDetails.pan}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Bank Name</div>
            <div className={cn(`opacity-70`)}>{kycDetails.bankName}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Account Holder Name</div>
            <div className={cn(`opacity-70`)}>
              {kycDetails.accountHolderName}
            </div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Bank Account No.</div>
            <div className={cn(`opacity-70`)}>{kycDetails.bankAccount}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>Branch Name</div>
            <div className={cn(`opacity-70`)}>{kycDetails.branchName}</div>
          </div>

          <div className={cn(`flex w-full flex-wrap gap-x-6 gap-y-2 text-2xl`)}>
            <div className={cn(`font-semibold`)}>IFSC</div>
            <div className={cn(`opacity-70`)}>{kycDetails.ifsc}</div>
          </div>
        </>
      )}
    </main>
  );
}
