import { Skeleton } from '../../ui/Skeleton';

export default function DataTableShimmer({ columns }: { columns: number }) {
  return (
    <article className="mt-2 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-8 w-[77px]" />
      </div>
      <div className="rounded-md border">
        <table className="w-full">
          <thead className="[&_tr]:border-b">
            <tr className="h-10 border-b">
              <th className="pl-2">
                <Skeleton className="h-4 w-4" />
              </th>
              {[...Array(columns)].map((_, i) => (
                <th key={i}>
                  <Skeleton className="h-4 w-28" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {[...Array(10)].map((_, i) => (
              <tr className="h-[49px] border-b" key={i}>
                <td className="pl-2">
                  <Skeleton className="h-4 w-4" />
                </td>
                {[...Array(columns)].map((_, i) => (
                  <td key={i}>
                    <Skeleton className="h-3 w-28" />
                  </td>
                ))}
                <td>
                  <Skeleton className="h-2 w-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
