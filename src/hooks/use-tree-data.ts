import { treeDataForUsers } from "@/integrations/server-function/fetch-tree";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export function useUsersDataForTree() {
  const fetchTreeDataQuerry = useServerFn(treeDataForUsers);

  return useQuery({
    queryKey: ["fetch-tree-data"],
    queryFn: fetchTreeDataQuerry,
  });
}
