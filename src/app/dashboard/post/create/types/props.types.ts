import { CreatePostFormType } from './form.types';

export interface iCreatePostFormProps {
  onSubmit: (data: CreatePostFormType) => void;
}
