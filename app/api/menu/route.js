import { connectDB } from '@/lib/db';
import Menu from '@/models/Menu';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const menuItems = await Menu.find({});
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu data' }, { status: 500 });
  }
}