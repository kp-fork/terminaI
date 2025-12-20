/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'vitest';
import express from 'express';
import request from 'supertest';
import { createAuthMiddleware, type AuthVerifier } from './auth.js';

describe('createAuthMiddleware', () => {
  const verifier: AuthVerifier = {
    verifyToken: (token: string) => token === 'good-token',
    source: 'env',
  };

  it('rejects missing or invalid tokens', async () => {
    const app = express();
    app.use(createAuthMiddleware(verifier));
    app.get('/protected', (_req, res) => res.status(200).send('ok'));

    await request(app).get('/protected').expect(401);
    await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer bad-token')
      .expect(401);
  });

  it('allows valid tokens', async () => {
    const app = express();
    app.use(createAuthMiddleware(verifier));
    app.get('/protected', (_req, res) => res.status(200).send('ok'));

    await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer good-token')
      .expect(200);
  });

  it('bypasses configured paths', async () => {
    const app = express();
    app.use(
      createAuthMiddleware(verifier, {
        bypassPaths: new Set(['/healthz']),
      }),
    );
    app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }));

    await request(app).get('/healthz').expect(200);
  });
});
