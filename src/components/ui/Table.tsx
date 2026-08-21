interface TableProps {
  children: React.ReactNode;
}

export default function Table({
  children,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <table className="w-full text-left">
        {children}
      </table>
    </div>
  );
}
