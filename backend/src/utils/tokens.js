import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const createAccessToken = (user) => jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
export const createRefreshToken = (user) => jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
export const randomToken = () => crypto.randomBytes(32).toString('hex');
