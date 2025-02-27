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
    const data = NextResponse.json({ data: response, result_code: 0 });

    // 올바른 계정을 입력하면 cookie에 access_token을 저장
    if ('access_token' in response) {
      data.cookies.set('access_token', response.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 1,
        path: '/',
      });

      return data;
    } else {
      // 존재하지 않는 계정일 경우 data값만 return
      return data;
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, result_code: 1 });
  }
}
