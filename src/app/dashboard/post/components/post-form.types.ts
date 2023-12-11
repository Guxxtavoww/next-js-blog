import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string({ required_error: 'Título é obrigatório' }).min(10, {
    message: 'Título é muito pequeno',
  }),
  content: z.string({ required_error: 'Conteúdo é obrigatório' }).min(50, {
    message: 'Conteúdo é muito pequeno',
  }),
  image_url: z.string({ required_error: 'URL da imagem é obrigatória' }).url({
    message: 'Url inválida',
  }),
  is_published: z.boolean().optional().default(false),
});

export type PostFormType = z.infer<typeof postFormSchema>;
