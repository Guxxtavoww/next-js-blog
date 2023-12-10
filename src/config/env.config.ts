import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SERVICE_ROLE: z.string(),
});

export type EnvType = z.infer<typeof envSchema>;

// export const ENV_VARIABLES = envSchema.parse(process.env);
