import { Navbar } from "./navbar";

export default function Header({ userid }: { userid: string }) {
  return (
    <header>
      <Navbar userid={userid} />
    </header>
  );
}
