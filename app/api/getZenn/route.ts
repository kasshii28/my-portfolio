import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(`${process.env.ZENN_API_URL}`);
        
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