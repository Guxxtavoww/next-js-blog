'use client';

import React from 'react';
import {
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from '@radix-ui/react-icons';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { iCreatePostFormProps } from '../types/props.types';
import { useCreatePostForm } from '../hooks/create-post-form.hook';

export default function CreatePostForm(props: iCreatePostFormProps) {
  const { form, isPending, handleSubmit, handlePreviewChange, isPreview } =
    useCreatePostForm(props.onSubmit);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full border pb-5 rounded-md"
      >
        <div className="border-b p-5 flex items-center sm:justify-between flex-wrap sm:flex-row gap-2">
          <Button
            type="button"
            onClick={handlePreviewChange}
            variant="ghost"
            className="inline-flex items-center gap-2"
          >
            {!isPreview ? (
              <>
                <EyeOpenIcon />
                Preview
              </>
            ) : (
              <>
                <Pencil1Icon />
                Edit
              </>
            )}
          </Button>
          <FormField
            control={form.control}
            name="is_premium"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-1 border p-2 rounded-md bg-zinc-800">
                    <StarIcon />
                    <span className="text-sm">Premium</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-1 border p-2 rounded-md bg-zinc-800">
                    <RocketIcon />
                    <span className="text-sm">Publicado ?</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
