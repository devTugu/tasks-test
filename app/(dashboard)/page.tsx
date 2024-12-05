import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TasksTable } from './task/list/tasks-table';
import { getTasks } from '@/lib/db';
import Link from 'next/link';

export default async function TasksPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { tasks, newOffset, totalTasks } = await getTasks(
    search,
    Number(offset)
  );

  return (
    <div>
      <div className="grid justify-items-end">
        <Link href="/task/create">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Task
            </span>
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <TasksTable
          tasks={tasks}
          offset={newOffset ?? 0}
          totalTasks={totalTasks}
        />
      </div>
    </div>
  );
}
