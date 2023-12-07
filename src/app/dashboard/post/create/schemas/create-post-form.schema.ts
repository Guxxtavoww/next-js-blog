import { z } from 'zod';

export const createPostFormSchema = z
  .object({
    title: z.string({ required_error: 'Título é obrigatório' }).min(10, {
      message: 'Título é muito pequeno',
    }),
    content: z.string({ required_error: 'Conteúdo é obrigatório' }).min(50, {
      message: 'Conteúdo é muito pequeno',
    }),
    image_url: z.string({ required_error: 'URL da imagem é obrigatória' }).url({
      message: 'Url inválida',
    }),
    is_premium: z.boolean().optional().default(false),
    is_published: z.boolean().optional().default(false),
  })
  .refine(
    (data) => {
      const image_url = data.image_url;

      try {
        const url = new URL(image_url);

        return url.hostname === 'images.unsplash.com';
      } catch {
        return false;
      }
    },
    {
      message: 'Atualmete só aceitamos imagens do do site unsplash',
      path: ['image_url'],
    }
  );
