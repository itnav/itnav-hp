import type { APIContext } from 'astro';

export async function defineJsonEndpoint(
  endpoint: (context: APIContext) => Promise<unknown>,
  context: APIContext,
  responseInit?: ResponseInit | undefined,
) {
  const data = await endpoint(context);
  return new Response(JSON.stringify(data), responseInit);
}
