/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'vitest';
import express from 'express';
import request from 'supertest';
import crypto from 'node:crypto';
import {
  createReplayProtection,
  buildSignaturePayload,
  computeBodyHash,
} from './replay.js';
import type { AuthenticatedRequest } from './auth.js';

const TOKEN = 'test-token';

function signRequest(
  method: string,
  path: string,
  body: unknown,
  nonce: string,
) {
  const rawBody = body ? JSON.stringify(body) : '';
  const bodyHash = computeBodyHash(rawBody);
  const payload = buildSignaturePayload({ method, path, bodyHash, nonce });
  return crypto.createHmac('sha256', TOKEN).update(payload).digest('hex');
}

describe('createReplayProtection', () => {
  it('accepts valid signatures and rejects replays', async () => {
    const app = express();
    app.use(
      express.json({
        verify: (req, _res, buf) => {
          (req as AuthenticatedRequest).rawBody = buf;
        },
      }),
    );
    app.use((req, _res, next) => {
      (req as AuthenticatedRequest).remoteAuthToken = TOKEN;
      next();
    });
    app.use(createReplayProtection({ ttlMs: 5000, maxEntries: 10 }));
    app.post('/test', (_req, res) => res.status(200).json({ ok: true }));

    const body = { message: 'hi' };
    const nonce = 'nonce-1';
    const signature = signRequest('POST', '/test', body, nonce);

    await request(app)
      .post('/test')
      .set('X-Gemini-Nonce', nonce)
      .set('X-Gemini-Signature', signature)
      .send(body)
      .expect(200);

    await request(app)
      .post('/test')
      .set('X-Gemini-Nonce', nonce)
      .set('X-Gemini-Signature', signature)
      .send(body)
      .expect(401);
  });

  it('rejects invalid signatures', async () => {
    const app = express();
    app.use(
      express.json({
        verify: (req, _res, buf) => {
          (req as AuthenticatedRequest).rawBody = buf;
        },
      }),
    );
    app.use((req, _res, next) => {
      (req as AuthenticatedRequest).remoteAuthToken = TOKEN;
      next();
    });
    app.use(createReplayProtection({ ttlMs: 5000, maxEntries: 10 }));
    app.post('/test', (_req, res) => res.status(200).json({ ok: true }));

    const body = { message: 'hi' };
    await request(app)
      .post('/test')
      .set('X-Gemini-Nonce', 'nonce-2')
      .set('X-Gemini-Signature', 'bad-signature')
      .send(body)
      .expect(401);
  });
});
