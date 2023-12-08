'use client';

import React from 'react';
import Image from 'next/image';
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
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MarkdownPreview from '@/components/markdown/markdown-preview';

import { usePostForm } from './post-form.hook';
import { PostFormType } from './post-form.types';
import Loader from '@/components/ui/loader';

export interface iPostFormProps {
  onSubmit: (data: PostFormType) => void;
  defaultData?: Maybe<PostFormType>;
  isLoading?: boolean;
}

export default function CreatePostForm({
  onSubmit,
  defaultData,
  isLoading,
}: iPostFormProps) {
  const { form, isPending, handleSubmit, handlePreviewChange, isPreview } =
    usePostForm(defaultData, onSubmit);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full border pb-5 rounded-md"
      >
        <div className="border-b p-5 flex justify-between items-center gap-1 flex-wrap">
          <div className="flex items-center flex-wrap gap-5">
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
            disabled={!form.formState.isValid || isLoading}
            className={cn('inline-flex items-center gap-1', {
              'animate-spin': isPending,
            })}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <BsSave className="animate-bounce group-disabled:animate-none" />
                Save
              </>
            )}
          </Button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      'w-full flex break-words p-2 gap-2',
                      isPreview ? 'divide-x-0' : 'divide-x'
                    )}
                  >
                    <Input
                      placeholder="Título do Post"
                      {...field}
                      autoFocus
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                      )}
                    />
                    <div
                      className={cn(
                        'lg:px-10',
                        isPreview
                          ? 'mx-auto w-full lg:w-4/5 '
                          : ' w-1/2 lg:block hidden '
                      )}
                    >
                      <h1 className="text-3xl font-bold dark:text-gray-200">
                        {form.getValues().title || 'Post sem título'}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>
              {form.getFieldState('title').invalid &&
                form.getValues().title && (
                  <div className="px-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'w-full flex divide-x p-2 gap-2 items-center',
                      isPreview ? 'divide-x-0' : 'divide-x'
                    )}
                  >
                    <Input
                      placeholder="Url da imagem 🔗"
                      {...field}
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 ',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                      )}
                      type="url"
                    />
                    <div
                      className={cn(
                        ' relative',
                        isPreview
                          ? 'px-0 mx-auto w-full lg:w-4/5 '
                          : 'px-10 w-1/2 lg:block hidden'
                      )}
                    >
                      {isPreview ? (
                        <div className="w-full h-80 relative mt-10 border rounded-md">
                          <Image
                            src={form.getValues().image_url}
                            alt="preview"
                            fill
                            className="object-cover object-center rounded-md"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400">
                          👆 Clique em {`'Preview'`} para ver a imagem
                        </p>
                      )}
                    </div>
                  </div>
                </FormControl>
                <div className="px-3">
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    'w-full flex p-2 gap-2 ',
                    !isPreview ? 'divide-x h-70vh' : 'divide-x-0'
                  )}
                >
                  <Textarea
                    placeholder="Conteúdo do post..."
                    {...field}
                    className={cn(
                      'border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500  h-72 max-h-full',
                      isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                    )}
                  />
                  <div
                    className={cn(
                      'overflow-auto ',
                      isPreview
                        ? 'mx-auto w-full lg:w-4/5 '
                        : 'w-1/2 lg:block hidden'
                    )}
                  >
                    <MarkdownPreview
                      content={form.getValues().content}
                      className="lg:px-10"
                    />
                  </div>
                </div>
              </FormControl>
              {form.getFieldState('content').invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
