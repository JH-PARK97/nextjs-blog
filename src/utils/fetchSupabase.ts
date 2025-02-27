export async function fetchSupabase<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
): Promise<T | { error: string }> {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data as T;
}
