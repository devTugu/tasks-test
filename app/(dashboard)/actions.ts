'use server';

import { deleteTaskById, createTaskBy, updateTaskById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteTask(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteTaskById(id);
  revalidatePath('/');
}

export async function createTask(formData: FormData) {
  await createTaskBy(formData);
  revalidatePath('/');
}

export async function updateTask(formData: FormData, id: number) {
  await updateTaskById(formData, id);
  revalidatePath('/');
}