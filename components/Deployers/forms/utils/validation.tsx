import * as Yup from 'yup';
// READ ME!
// Additional validation schemas can be added here to check for the correct inputs in HSG

// DECLARATION OF: bigInt
declare module 'yup' {
  interface StringSchema {
    bigInt(message?: string): StringSchema;
  }
}
function isBigInt(value?: string): boolean {
  if (!value) return false;
  try {
    BigInt(value);
    return true;
  } catch {
    return false;
  }
}
// Make sure Yup is imported elsewhere in the project before this extension is used.
Yup.addMethod(
  Yup.string,
  'bigInt',
  function (errorMessage = 'Must be a valid BigInt!') {
    return this.test('isBigInt', errorMessage, (val) => isBigInt(val));
  }
);

// DECLARATION OF: ethereumAddress
declare module 'yup' {
  interface StringSchema {
    ethereumAddress(message?: string): StringSchema;
  }
}
Yup.addMethod(
  Yup.string,
  'ethereumAddress',
  function (errorMessage = 'Invalid Ethereum address') {
    return this.matches(/^0x[a-fA-F0-9]{40}$/, errorMessage);
  }
);

// Helper function to compare BigInt values in string format
export const compareBigInts = (
  a: string | undefined,
  b: string | undefined,
  comparator: (x: BigInt, y: BigInt) => boolean
): boolean => {
  if (typeof a === 'string' && typeof b === 'string') {
    return comparator(BigInt(a), BigInt(b));
  }
  return false;
};

export {};
