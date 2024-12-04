import { getTask } from '@/lib/db';
import Form from './form';

export default async function TaskEdit({ params }: any) {
  const { handle } = params;
  const task = await getTask(handle);

  return <Form task={task} />;
}
