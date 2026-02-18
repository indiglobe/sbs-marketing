import { treeDataForUsers } from "@/integrations/server-function/fetch-tree";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export function useUsersDataForTree(userId: string) {
  const fetchTreeData = useServerFn(treeDataForUsers);

  return useQuery({
    queryKey: ["fetch-tree-data", userId],
    queryFn: () => fetchTreeData({ data: userId }),
    enabled: !!userId, // prevents running when undefined
  });
}
