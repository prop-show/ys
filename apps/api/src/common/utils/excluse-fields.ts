export function excludeFields<T, K extends keyof T>(
  obj: T,
  keys: K | K[],
): Omit<T, K> {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }

  return result;
}
