import { fetchSession } from "@/utils/auth";
import { Navbar } from "./navbar";

export default function Header({
  userid,
  role,
}: Pick<
  NonNullable<Awaited<ReturnType<typeof fetchSession>>>,
  "role" | "userid"
>) {
  return (
    <header>
      <Navbar userid={userid} role={role} />
    </header>
  );
}
