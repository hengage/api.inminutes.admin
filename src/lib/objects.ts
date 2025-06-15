export function excludeObjectKeys<T extends object, Key extends string>(
  obj: T,
  keys: Key[],
): Omit<T, Key> {
  // Handle Mongoose documents by converting to plain object if toObject method exists
  const plainObj =
    'toObject' in obj && typeof obj.toObject === 'function'
      ? obj.toObject()
      : obj;

  return Object.fromEntries(
    Object.entries(plainObj).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}
