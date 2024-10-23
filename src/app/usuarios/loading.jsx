import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <NavbarSimple title="">
      <div className="flex justify-between">
        <Skeleton className="h-10 py-2 w-[200px]" />
        <Skeleton className="h-9 py-2 w-[100px]" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="ml-auto h-10 w-[100px]" />
        </div>
        <div className="rounded-md border sm:min-h-[528px] min-h-[528px] w-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {[...Array(4)].map((_, index) => {
                  return (
                    <TableHead key={index}>
                      <Skeleton className="h-6 w-[200px]" />
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(4)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-8 w-[200px]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-4">
          <Skeleton className="h-10 w-[100px]" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </NavbarSimple>
  );
}
