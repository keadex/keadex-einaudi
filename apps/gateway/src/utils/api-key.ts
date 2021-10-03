import { randomBytes } from 'crypto';

export function generateApiKey() {
  const rand = randomBytes(20);
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let apiKey = '';

  for (let i = 0; i < rand.length; i++) {
    const index = rand[i] % chars.length;
    apiKey += chars[index];
  }
  return apiKey;
}
