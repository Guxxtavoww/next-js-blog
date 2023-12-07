import { z } from 'zod';

import { createPostFormSchema } from '../schemas/create-post-form.schema';

export type CreatePostFormType = z.infer<typeof createPostFormSchema>;
