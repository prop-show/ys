import argon2 from 'argon2';

export async function hashPassword(
  password: string,
): Promise<string | undefined> {
  if (!password) {
    throw new Error('Password cannot be empty');
  }

  try {
    return await argon2.hash(password);
  } catch (e) {
    console.error('Error hashing password:', e);
  }
}

export async function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  if (!hash || !password) {
    return false;
  }

  try {
    return await argon2.verify(hash, password);
  } catch (e) {
    console.error('Error verifying password:', e);
    return false;
  }
}
