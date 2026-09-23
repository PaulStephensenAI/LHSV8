import app from '../server';

/**
 * Vercel Serverless Function entrypoint.
 * Routes incoming API requests to the Express application instance.
 */
export default function handler(req: any, res: any) {
  // Normalize URL in case Vercel's rewrite strips or omits the /api prefix
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
}
