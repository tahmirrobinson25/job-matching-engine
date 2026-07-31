const DEFAULT_CONNECT_RETRIES = 5;
const DEFAULT_RETRY_DELAY_MS = 500;
const MAX_RETRY_DELAY_MS = 8_000;

export function normalizeDatabaseUrl(value: string | undefined): string {
  if (!value) {
    throw new Error('DATABASE_URL must be set. Use the Neon pooled connection string for production.');
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection URL.');
  }

  if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
    throw new Error('DATABASE_URL must use the postgres:// or postgresql:// protocol.');
  }

  if (!url.hostname) {
    throw new Error('DATABASE_URL must include a database host.');
  }

  // Neon requires TLS. Its dashboard URLs normally contain sslmode=require,
  // but adding it here prevents an accidental insecure production deployment.
  if (url.hostname.endsWith('.neon.tech') && !url.searchParams.has('sslmode')) {
    url.searchParams.set('sslmode', 'require');
  }

  return url.toString();
}

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

export function databaseConnectRetries(value = process.env.DATABASE_CONNECT_RETRIES): number {
  return positiveInteger(value, DEFAULT_CONNECT_RETRIES);
}

export function databaseRetryDelay(attempt: number, value = process.env.DATABASE_RETRY_DELAY_MS): number {
  const baseDelay = positiveInteger(value, DEFAULT_RETRY_DELAY_MS);
  return Math.min(baseDelay * 2 ** Math.max(0, attempt), MAX_RETRY_DELAY_MS);
}

export function isRetryableDatabaseError(error: unknown): boolean {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String(error.code)
    : '';
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return [
    'ECONNRESET',
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENETUNREACH',
    'EHOSTUNREACH',
  ].includes(code) || /timeout|connection.*(?:closed|terminated|refused|reset)|server has closed/.test(message);
}

export const sleep = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
