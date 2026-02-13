import { UserTable } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { Node, Edge } from "@xyflow/react";

export type User = Pick<
  InferInsertModel<typeof UserTable>,
  "id" | "referredBy" | "name"
>;

export function buildReactFlowFromUsers(users: User[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const childrenMap: Record<string, User[]> = {};
  const roots: User[] = [];

  // Build children map
  users.forEach((user) => {
    if (user.referredBy && user.referredBy !== user.id) {
      if (!childrenMap[user.referredBy]) childrenMap[user.referredBy] = [];
      childrenMap[user.referredBy].push(user);
    } else {
      roots.push(user);
    }
  });

  const nodeSpacingX = 180; // horizontal spacing
  const nodeSpacingY = 150; // vertical spacing

  // Compute subtree widths recursively
  function computeSubtreeWidth(user: User): number {
    const children = childrenMap[user.id] || [];
    if (children.length === 0) return 1;
    return children.reduce((sum, c) => sum + computeSubtreeWidth(c), 0);
  }

  // Recursive layout
  function layout(user: User, xStart: number, y: number) {
    const children = childrenMap[user.id] || [];
    const subtreeWidth = computeSubtreeWidth(user);

    // Node x is center of its subtree
    const nodeX = xStart + (subtreeWidth * nodeSpacingX) / 2 - nodeSpacingX / 2;
    nodes.push({
      id: user.id,
      position: { x: nodeX, y },
      data: { label: user.name },
    });

    let childXStart = xStart;
    children.forEach((child) => {
      const childSubtreeWidth = computeSubtreeWidth(child);
      edges.push({
        id: `${user.id}-${child.id}`,
        source: user.id,
        target: child.id,
      });
      layout(child, childXStart, y + nodeSpacingY);
      childXStart += childSubtreeWidth * nodeSpacingX;
    });
  }

  // Layout all roots
  let rootX = 0;
  roots.forEach((root) => {
    const width = computeSubtreeWidth(root) * nodeSpacingX;
    layout(root, rootX, 0);
    rootX += width + nodeSpacingX; // spacing between separate trees
  });

  return { nodes, edges };
}
