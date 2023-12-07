'use client';

import React from 'react';
import {
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { BsSave } from 'react-icons/bs';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { iCreatePostFormProps } from '../types/props.types';
import { useCreatePostForm } from '../hooks/create-post-form.hook';
import { cn } from '@/lib/utils';

export default function CreatePostForm(props: iCreatePostFormProps) {
  const { form, isPending, handleSubmit, handlePreviewChange, isPreview } =
    useCreatePostForm(props.onSubmit);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full border pb-5 rounded-md"
      >
        <div className="border-b p-5 flex justify-between items-center gap-1 flex-wrap">
          <Button
            type="button"
            onClick={handlePreviewChange}
            variant="secondary"
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
                Editar
              </>
            )}
          </Button>
          <FormField
            control={form.control}
            name="is_premium"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-3 flex-col">
                    <FormLabel
                      className={cn('inline-flex gap-1', {
                        'text-green-500': field.value === true,
                      })}
                    >
                      <StarIcon />
                      Premium
                    </FormLabel>
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
                  <div className="flex items-start gap-3 flex-col">
                    <FormLabel
                      className={cn('inline-flex gap-1', {
                        'text-green-500': field.value === true,
                      })}
                    >
                      <RocketIcon />
                      Publicado ?
                    </FormLabel>
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
        <Button
          type="submit"
          role="button"
          variant="default"
          disabled={!form.formState.isValid}
          className="inline-flex items-center gap-1"
        >
          <BsSave className="animate-bounce group-disabled:animate-none" />
          Save
        </Button>
      </form>
    </Form>
  );
}
