import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { buildReactFlowFromUsers } from "@/utils/build-react-flow-data";
import { cn } from "@/utils/cn";
import { useUsersDataForTree } from "@/hooks/use-tree-data";

// sample data

const data = [
  { id: "U1", name: "A", referredBy: null },
  { id: "U2", name: "B", referredBy: "U1" },
  { id: "U3", name: "C", referredBy: "U1" },
  { id: "U4", name: "D", referredBy: "U2" },
  { id: "U5", name: "E", referredBy: "U2" },
  { id: "U6", name: "F", referredBy: "U1" },
  { id: "U7", name: "G", referredBy: "U3" },
  { id: "U8", name: "H", referredBy: "U5" },
  { id: "U9", name: "I", referredBy: "U10" },
  { id: "U10", name: "J", referredBy: "U4" },
  { id: "U11", name: "K", referredBy: "U2" },
  { id: "U12", name: "L", referredBy: "U1" },
  { id: "U13", name: "M", referredBy: "U2" },
];

export default function ReferralTree() {
  // const { data } = useUsersDataForTree();

  // if (!data) {
  //   return null;
  // }

  const { nodes, edges } = buildReactFlowFromUsers(data);

  return (
    <div className={cn(`aspect-video rounded-lg bg-blue-200`)}>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </div>
    </div>
  );
}
