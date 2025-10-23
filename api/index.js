// Vercel serverless function wrapper for Angular SSR server
// Uses dynamic import to support ES modules in Vercel's CommonJS environment
export default async function handler(req, res) {
  const { reqHandler } = await import('../dist/silviobaratto/server/server.mjs');
  return reqHandler(req, res);
}
