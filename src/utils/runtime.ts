export const isClient = typeof window !== 'undefined';

export function clientOnly() {
  if (!isClient) {
    throw new Error('This function can only be called on the client side');
  }
}

export function serverOnly() {
  if (isClient) {
    throw new Error('This function can only be called on the server side');
  }
}
