export default function NameWithRank({
  name,
  referencedPersons,
}: {
  name: string;
  referencedPersons: number;
}) {
  return (
    <div>
      <Name name={name} />
      <Rank referencedPersons={referencedPersons} />
    </div>
  );
}

function Rank({ referencedPersons }: { referencedPersons: number }) {
  return <></>;
}

function Name({ name }: { name: string }) {
  return <></>;
}
