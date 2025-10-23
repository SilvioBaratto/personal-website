// Re-export BAML client from root baml_client directory
// This file is prefixed with _ so Vercel won't treat it as a serverless function
export { b } from '../baml_client/async_client';
