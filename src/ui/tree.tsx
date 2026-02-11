import { cn } from "@/utils/cn";
import {
  ReactFlow,
  Node,
  Edge,
  // BaseEdge,
  // getStraightPath,
  // EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// export function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
//   const [edgePath] = getStraightPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });

//   return (
//     <>
//       <BaseEdge id={id} path={edgePath} />
//     </>
//   );
// }

// const edgeTypes = {
//   "custom-edge": CustomEdge,
// } as EdgeTypes;

export default function Tree({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  return (
    <div style={{ width: "100%", aspectRatio: "4/3" }} className={cn(``)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // edgeTypes={edgeTypes}
        fitView
        //
      />
    </div>
  );
}
