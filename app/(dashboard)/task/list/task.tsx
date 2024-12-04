import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectTask } from '@/lib/db';
import { deleteTask } from '../action';
import Link from 'next/link';

export function Task({ task }: { task: SelectTask }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{task.title}</TableCell>
      <TableCell className="hidden md:table-cell">{task.description}</TableCell>

      <TableCell>
        <Badge variant="outline" className="capitalize">
          {task.status ? 'Completed' : 'Incomplete'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{task.date}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <Link href={`/task/edit/` + task.id}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <form action={deleteTask}>
                <input type="hidden" name="id" value={task.id} />
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
