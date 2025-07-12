import { NextResponse } from 'next/server';

const commonHeaders = {
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const notFoundResponse = NextResponse.json(
    { error: 'Not found', status: 404 },
    { status: 404, headers: commonHeaders }
);

export function GET() {
    return notFoundResponse;
}

export const POST = GET;
export const PUT = GET;
export const DELETE = GET;
export const PATCH = GET;
export const HEAD = GET;

export function OPTIONS() {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: commonHeaders,
        }
    );
}
