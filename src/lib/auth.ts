import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function generateApiKey(): string {
  return `trg_${uuidv4().replace(/-/g, '')}`;
}

export function generateAccessToken(userId: string): string {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1d' });
}

export function verifyAccessToken(token: string): any {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}
