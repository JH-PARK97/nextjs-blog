import { NextRequest, NextResponse } from 'next/server';
import { fetchSupabase } from '@/utils/fetchSupabase';
import { Database } from '@/supabase';

type User = Database['public']['Tables']['user']['Row'];

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response = await fetchSupabase<LoginResponse | { error: string }>(
      '/auth/v1/token?grant_type=password',
      'POST',
      {
        email,
        password,
      }
    );

    if ('error' in response) {
      return NextResponse.json({ response });
    }

    const data = NextResponse.json({ data: response, result_code: 0 });

    data.cookies.set('access_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 1,
      path: '/',
    });

    return data;
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        { message: error.message, result_code: 1 },
        { status: 400 }
      );
  }
}
