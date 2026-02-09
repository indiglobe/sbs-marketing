import Tree from "@/ui/tree";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export default function UserTree({ ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn(``, props.className)}>
      <Tree
        edges={[
          { id: "n1-n2", source: "n1", target: "n2" },
          { id: "n2-n3", source: "n2", target: "n3" },
          { id: "n3-n4", source: "n3", target: "n4" },
          { id: "n1-n5", source: "n1", target: "n5" },
        ]}
        nodes={[
          { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
          { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
          { id: "n3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
          { id: "n4", position: { x: 200, y: 200 }, data: { label: "Node 4" } },
          { id: "n5", position: { x: 400, y: 200 }, data: { label: "Node 5" } },
        ]}
      />
    </div>
  );
}
