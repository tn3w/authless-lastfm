import { getEnv } from './env';

const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';

const USER_AGENTS = [
    'Clementine/1.3.1 (Linux; x86_64) AppleWebKit/537.36',
    'Amarok/2.9.0 (Linux; x86_64) KDE/5.12.0',
    'Audacious/4.0 (Linux; x86_64) Gecko/20100101 Firefox/60.0',
    'Gmusicbrowser/1.1.99 (Linux; x86_64)',
    'Pithos/1.2.0 (Linux; x86_64)',
    'MPD/0.21.0 (Linux; x86_64)',
];

export async function fetchFromLastfm(method, params = {}) {
    const apiKeys = getEnv('LASTFM_API_KEYS', '').split(',').filter(Boolean);

    if (apiKeys.length === 0) {
        throw new Error('No valid Last.fm API keys configured');
    }

    const apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    const searchParams = new URLSearchParams({
        method,
        api_key: apiKey,
        format: 'json',
        autocorrect: '1',
        limit: '100',
        ...params,
    });

    const url = `${LASTFM_API_URL}?${searchParams.toString()}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
            },
            next: {
                revalidate: 60 * 60 * 24 * 7,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`LASTFM API error: ${response.status} - ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Last.fm API error for method ${method}:`, error);
        throw error;
    }
}

export async function fetchSimilarArtists(artist) {
    return fetchFromLastfm('artist.getSimilar', { artist });
}

export async function fetchSimilarTracks(artist, track) {
    return fetchFromLastfm('track.getSimilar', { artist, track });
}
