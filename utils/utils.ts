export const findAction = (value: string | string[] | undefined, pos = 0) => {
  return typeof value === 'string'
    ? value
    : Array.isArray(value)
    ? value[pos]
    : undefined;
};
