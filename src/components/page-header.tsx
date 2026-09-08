export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {intro && (
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}
