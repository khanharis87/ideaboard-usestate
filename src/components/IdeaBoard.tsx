export default function IdeaBoard({
  children,
}: {
  children: React.ReactNode[];
}) {
  return <ul className="flex flex-col gap-9 mt-6">{children}</ul>;
}
