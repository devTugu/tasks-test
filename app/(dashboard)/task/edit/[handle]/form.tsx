'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { updateTask } from '../../../actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const accountFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.'
    }),
  description: z
    .string()
    .min(2, {
      message: 'Description must be at least 2 characters.'
    })
    .max(30, {
      message: 'Description must not be longer than 30 characters.'
    }),
  status: z.string({
    required_error: 'Please select an status to display.'
  })
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // title: "Your title",
  // description: "Your description",
  // status: "Your status",
};

export default function TaskCreate({ task }: any) {
  const router = useRouter();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: task
  });

  async function onSubmit(data: AccountFormValues) {
    const formData: any = {
      ...data
    };

    await updateTask(formData, task.id);
    router.back();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Edit</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Your description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                return (
                  <FormItem defaultValue={field.value}>
                    <FormLabel defaultValue={field.value}>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Completed</SelectItem>
                        <SelectItem value="false">Incomplete</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex gap-5">
              <Link href="/">
                <Button variant="ghost">Back</Button>
              </Link>
              <Button type="submit">Update task</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
