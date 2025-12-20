/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { createCorsAllowlist } from './cors.js';

describe('createCorsAllowlist', () => {
  it('allows requests without Origin', async () => {
    const app = express();
    app.use(createCorsAllowlist(['https://example.com']));
    app.get('/', (_req, res) => res.status(200).send('ok'));

    const res = await request(app).get('/').expect(200);
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('allows allowlisted origins', async () => {
    const app = express();
    app.use(createCorsAllowlist(['https://example.com']));
    app.get('/', (_req, res) => res.status(200).send('ok'));

    const res = await request(app)
      .get('/')
      .set('Origin', 'https://example.com')
      .expect(200);
    expect(res.headers['access-control-allow-origin']).toBe(
      'https://example.com',
    );
  });

  it('rejects non-allowlisted origins', async () => {
    const app = express();
    app.use(createCorsAllowlist(['https://example.com']));
    app.get('/', (_req, res) => res.status(200).send('ok'));

    const res = await request(app)
      .get('/')
      .set('Origin', 'https://not-allowed.test')
      .expect(403);
    expect(res.body.error).toBe('Origin not allowed');
  });

  it('handles preflight requests', async () => {
    const app = express();
    app.use(createCorsAllowlist(['https://example.com']));
    app.post('/', (_req, res) => res.status(200).send('ok'));

    const res = await request(app)
      .options('/')
      .set('Origin', 'https://example.com')
      .set('Access-Control-Request-Method', 'POST')
      .expect(204);
    expect(res.headers['access-control-allow-origin']).toBe(
      'https://example.com',
    );
  });
});
