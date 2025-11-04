import connectDB from '@/lib/db';
import Menu from '@/models/Menu';
import { NextResponse } from 'next/server'
export const dynamic = 'force-static'
// export const revalidate = 60; 

export async function GET() {
    try {
        await connectDB();
        const menuData = await (Menu as any).find({}).lean();
        return NextResponse.json(menuData, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error('GET /api/menu failed:', error);
        return NextResponse.json({ error: 'Failed to fetch menu data' }, { status: 500 });
    }
}