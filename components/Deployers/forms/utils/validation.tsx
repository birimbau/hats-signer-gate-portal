import * as Yup from 'yup';

// Additional validation schemas can be added here to check for the correct inputs in HSG

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

export {};
