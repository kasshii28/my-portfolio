import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(`${process.env.QIITA_API_URL}`, {
            headers: {
                'Authorization': `Bearer ${process.env.QIITA_ACCESS_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        
        const blogs = await response.json();
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
} 