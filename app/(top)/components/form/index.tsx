'use client';

import CategoryField from '@/app/(top)/components/form/fields/category';
import NameField from '@/app/(top)/components/form/fields/name';
import { FormData, schema } from '@/app/(top)/schema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ExampleForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      categories: [],
    },
  });

  const submit = async (value: FormData) => {
    // TODO: Post
  };

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <div className="grid grid-cols-2 p-6 gap-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <NameField />
          <CategoryField />
          <Button disabled={isSubmitting || !isValid}>送信</Button>
        </form>
      </Form>
      <div>
        <div className="whitespace-pre-wrap text-sm border bg-muted rounded-lg p-6">
          {JSON.stringify(watch(), null, 2)}
        </div>
      </div>
    </div>
  );
}
