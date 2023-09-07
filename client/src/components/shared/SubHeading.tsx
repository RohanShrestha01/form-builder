interface Props {
  title: string;
  className?: string;
}

export default function SubHeading({ title, className }: Props) {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <hr className="mt-1 w-20 rounded-full border-[3px] border-primary" />
    </div>
  );
}
