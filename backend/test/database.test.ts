import assert from 'node:assert/strict';
import test from 'node:test';
import {
  databaseConnectRetries,
  databaseRetryDelay,
  isRetryableDatabaseError,
  normalizeDatabaseUrl,
} from '../src/lib/database.js';

test('adds TLS to a Neon URL that omits sslmode', () => {
  const result = normalizeDatabaseUrl('postgresql://user:secret@ep-cool-unit-123.us-east-2.aws.neon.tech/neondb');
  assert.equal(new URL(result).searchParams.get('sslmode'), 'require');
});

test('preserves explicit Neon TLS configuration', () => {
  const result = normalizeDatabaseUrl('postgresql://user:secret@ep-cool-unit-123.us-east-2.aws.neon.tech/neondb?sslmode=verify-full');
  assert.equal(new URL(result).searchParams.get('sslmode'), 'verify-full');
});

test('rejects missing and non-PostgreSQL connection URLs', () => {
  assert.throws(() => normalizeDatabaseUrl(undefined), /DATABASE_URL/);
  assert.throws(() => normalizeDatabaseUrl('mysql://localhost/database'), /postgres/);
});

test('retries transient Neon-style failures but not authentication failures', () => {
  assert.equal(isRetryableDatabaseError({ code: 'ECONNRESET' }), true);
  assert.equal(isRetryableDatabaseError(new Error('Connection terminated unexpectedly')), true);
  assert.equal(isRetryableDatabaseError(new Error('password authentication failed')), false);
});

test('bounds retry configuration and exponential backoff', () => {
  assert.equal(databaseConnectRetries('3'), 3);
  assert.equal(databaseConnectRetries('-1'), 5);
  assert.equal(databaseRetryDelay(0, '100'), 100);
  assert.equal(databaseRetryDelay(20, '100'), 8_000);
});
