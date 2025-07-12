# authless-lastfm
Authless-LastFM is a serverless API proxy built with Next.js that provides efficient, anonymous access to Last.fm music data through optimized endpoints. The application:

- Implements RESTful endpoints for fetching similar artists and tracks using Last.fm's public API
- Features intelligent request distribution across multiple API keys for improved reliability and rate limit management
- Employs Vercel Edge caching with a 7-day revalidation strategy to reduce API calls and latency
- Includes robust error handling with detailed error messages and proper HTTP status codes
- Uses environment variable memoization to minimize redundant operations in a serverless context
- Implements CORS headers for cross-origin access from any domain
- Rotates user-agent strings to prevent API blocking
- Optimizes bundle size by reducing code redundancy and reusing common response patterns
- Provides comprehensive input validation to prevent unnecessary upstream API calls
- Includes graceful fallbacks for missing parameters and configuration errors

The architecture is designed specifically for Vercel's serverless functions, minimizing cold starts and resource usage while maximizing cache efficiency.
