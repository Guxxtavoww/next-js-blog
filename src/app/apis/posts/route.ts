import { createSupbaseAdmin } from '@/lib/supabase/server-client';

export async function GET(request: Request) {
  const supabase = await createSupbaseAdmin();

  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');

  if (id === '*') {
    const result = await supabase.from('posts').select('id').limit(10);

    return Response.json({ ...result.data });
  }
}
