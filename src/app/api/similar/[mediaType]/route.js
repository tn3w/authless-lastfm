import { fetchSimilarArtists, fetchSimilarTracks } from '@/utils/lastfmApi';
import { NextResponse } from 'next/server';

function apiResponse(data, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

export async function GET(request, { params }) {
    try {
        const { mediaType } = params;
        const { searchParams } = new URL(request.url);
        const artist = searchParams.get('artist');
        const track = searchParams.get('track');

        if (!artist) {
            return apiResponse({ error: 'Artist parameter is required' }, 400);
        }

        if (mediaType === 'artist') {
            const similarArtists = await fetchSimilarArtists(artist);
            return apiResponse(similarArtists);
        } else if (mediaType === 'track') {
            if (!track) {
                return apiResponse({ error: 'Track parameter is required' }, 400);
            }
            const similarTracks = await fetchSimilarTracks(artist, track);
            return apiResponse(similarTracks);
        }

        return apiResponse({ error: 'Invalid media type' }, 400);
    } catch (error) {
        console.error('Error in similar API:', error);
        return apiResponse({ error: 'Internal server error' }, 500);
    }
}
