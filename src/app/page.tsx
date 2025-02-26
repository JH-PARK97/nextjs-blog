import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/serverClient';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from('instruments').select();

  return (
    <>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>
    </>
  );
}
