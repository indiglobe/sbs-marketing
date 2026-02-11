import { db } from "@/db";
import { UsersTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";

export const getTreeData = createServerFn().handler(async () => {
  const users = await db.select().from(UsersTable);

  type User = {
    id: string;
    firstName: string;
    lastName: string;
    referredBy: string | null;
  };

  type GraphNode = {
    id: string;
    position: { x: number; y: number };
    data: { label: string };
  };

  type GraphEdge = {
    id: string;
    source: string;
    target: string;
  };

  buildUserGraph(users);

  function buildUserGraph(users: User[]): {
    nodes: GraphNode[];
    edges: GraphEdge[];
  } {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    // Simple vertical layout
    users.forEach((user, index) => {
      nodes.push({
        id: user.id,
        position: { x: 0, y: index * 120 },
        data: { label: `${user.firstName} ${user.lastName}` },
      });

      if (user.referredBy) {
        edges.push({
          id: `${user.referredBy}-${user.id}`,
          source: user.referredBy,
          target: user.id,
        });
      }
    });

    return { nodes, edges };
  }
});
