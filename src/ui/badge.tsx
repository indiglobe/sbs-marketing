"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserBadge } from "@/integrations/server-function/badge";

export default function UserBadge({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-badge", userId],
    queryFn: () => getUserBadge({ data: { userId } }),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div className="p-4">Loading badge...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Failed to load badge</div>;
  }

  if (!data) return null;

  return (
    <div className="flex w-80 flex-col items-center justify-center rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
      <h2 className="mb-2 text-xl font-bold">🏆 {data.rank}</h2>
      <div className="text-sm opacity-90">
        <p>Direct Referrals: {data.direct}</p>
        <p>Total Team: {data.team}</p>
      </div>
    </div>
  );
}
