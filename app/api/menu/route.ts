import { NextResponse } from 'next/server'
export const dynamic = 'force-static'

export async function GET() {
    try {
        const menuData = [
        {
            category: 'Food',
            subcategory: 'bread',
            title: 'Bread Oil',
            price: 7.2,
            img: '/menu/bread/Bread_BreadOil.png'
        },
        {
            category: 'Food',
            subcategory: 'bread',
            title: 'Calzones',
            price: 4.5,
            img: '/menu/bread/Bread_Calzones.png'
        },
        {
            category: 'Food',
            subcategory: 'bread',
            title: 'Cinnamon Roll',
            price: 6.9,
            img: '/menu/bread/Bread_CinnamonRoll.png'
        },
        {
            category: 'Food',
            subcategory: 'bread',
            title: 'Pumpkin Bread',
            price: 2.8,
            img: '/menu/bread/Bread_PumpkinBread.png'
        },
        {
            category: 'Food',
            subcategory: 'bread',
            title: 'Monkey Bread',
            price: 7.2,
            img: '/menu/bread/Bread_MonkeyBread.png'
        },
        {
            category: 'Food',
            subcategory: 'bread',
            title: 'Fruit Bread',
            price: 4.5,
            img: '/menu/bread/Bread_FruitBread.png'
        }
        ];

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