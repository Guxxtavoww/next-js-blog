import { EnvType } from '@/config/env.config';

declare global {
  export type Maybe<T> = T | null | undefined;

  namespace NodeJS {
    export interface ProcessEnv extends EnvType {}
  }
}
