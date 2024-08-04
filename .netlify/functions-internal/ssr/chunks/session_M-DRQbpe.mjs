import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { c as configVariables } from './configVariables_BD3FriUt.mjs';

if (!globalThis.crypto) globalThis.crypto = crypto;
if (typeof globalThis.crypto.subtle === "undefined") globalThis.crypto.subtle = crypto.webcrypto.subtle;
if (typeof globalThis.crypto.randomUUID === "undefined") globalThis.crypto.randomUUID = crypto.randomUUID;

const JWT_SECRET = configVariables.jwtSecret;
function getSession(token) {
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { authenticated: true, user: decoded };
    } catch (err) {
      console.error(err);
      return { authenticated: false, user: null };
    }
  }
  return { authenticated: false, user: null };
}

export { getSession as g };
