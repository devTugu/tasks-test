'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    let value = formData.get('q') as string;
    let params = new URLSearchParams({ q: value });
    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <form action={searchAction} className="flex gap-4 mt-2 sm:mt-0">
      <Select name="q">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="true">Completed</SelectItem>
            <SelectItem value="false">Incompleted</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
      {isPending && <Spinner />}
    </form>
  );
}
