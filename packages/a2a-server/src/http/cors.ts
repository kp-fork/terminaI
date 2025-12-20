/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type express from 'express';

const DEFAULT_ALLOWED_HEADERS = [
  'Authorization',
  'Content-Type',
  'X-Gemini-Nonce',
  'X-Gemini-Signature',
];

const DEFAULT_ALLOWED_METHODS = ['GET', 'POST', 'OPTIONS'];

export function createCorsAllowlist(
  allowedOrigins: string[],
): express.RequestHandler {
  const allowlist = new Set(
    allowedOrigins.map((origin) => origin.trim()).filter(Boolean),
  );

  return (req, res, next) => {
    const origin = req.header('origin');
    if (!origin) {
      return next();
    }

    if (!allowlist.has(origin)) {
      return res.status(403).json({ error: 'Origin not allowed' });
    }

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader(
      'Access-Control-Allow-Headers',
      DEFAULT_ALLOWED_HEADERS.join(', '),
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      DEFAULT_ALLOWED_METHODS.join(', '),
    );

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    return next();
  };
}
