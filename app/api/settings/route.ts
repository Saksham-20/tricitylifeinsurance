import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: 'lic-recruitment',
    env: process.env.NODE_ENV ?? 'development',
    timestamp: new Date().toISOString(),
  });
}
