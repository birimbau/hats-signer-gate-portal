import * as Yup from 'yup';
// READ ME!
// Additional validation schemas can be added here to check for the correct inputs in HSG

// DECLARATIONs OF
declare module 'yup' {
  interface StringSchema {
    lessThanTarget(): this;
    betweenMinAndMax(): this;
    greaterThanTarget(): this;
    ethereumAddress(message?: string): StringSchema;
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
Yup.addMethod(
  Yup.string,
  'ethereumAddress',
  function (errorMessage = 'Invalid Ethereum address') {
    return this.matches(/^0x[a-fA-F0-9]{40}$/, errorMessage);
  }
);

// Helper function to compare BigInt values in string format
// export const compareBigInts = (
//   a: string | undefined,
//   b: string | undefined,
//   comparator: (x: BigInt, y: BigInt) => boolean
// ): boolean => {
//   if (typeof a === 'string' && typeof b === 'string') {
//     return comparator(BigInt(a), BigInt(b));
//   }
//   return false;
// };

export const compareBigInts = (
  comparator: (x: BigInt, y: BigInt) => boolean,
  a?: string,
  b?: string
): boolean => {
  if (a && b && isBigInt(a) && isBigInt(b)) {
    return comparator(BigInt(a), BigInt(b));
  }
  return false;
};

// CUSTOM VALIDATION FOR FORMIK INPUTS

// Define a standard ethAddressSchema schema to reuse for multiple fields
export const ethAddressSchema = Yup.string()
  .required('Required')
  .ethereumAddress();

// Define a standard hatIntSchema schema to reuse for multiple fields
export const hatIntSchema = Yup.string()
  .required('Required')
  .max(77, 'Must be 77 characters or less')
  .bigInt();

// Define the validation schema for an array of BigInt strings
export const arrayOfHatStrings = Yup.array()
  .of(
    Yup.string()
      .required('ID is required')
      .max(77, 'Must be 77 characters or less')
      .bigInt()
  )
  .min(1, 'At least one ID is required')
  .required('This field is required');

export function minThresholdValidation(hatIntSchema: any) {
  return hatIntSchema.when('_targetThreshold', {
    is: (value: any) => Boolean(value && value !== ''), // Checks if _targetThreshold has a value
    then: (schema: any) => schema.lessThanTarget(),
    otherwise: (schema: any) => schema, // Fallback to the default schema if _targetThreshold doesn't have a value
  });
}

export function targetThresholdValidation(hatIntSchema: any) {
  return hatIntSchema.when('_maxSigners', {
    is: (value: any) => Boolean(value && value !== ''),
    then: (schema: any) => schema.betweenMinAndMax(),
    otherwise: (schema: any) => schema,
  });
}

function isValidBigInt(value: any) {
  // You can enhance this check based on your needs.
  return typeof value === 'string';
}

Yup.addMethod(Yup.string, 'lessThanTarget', function () {
  return this.test(
    'less-than-target',
    'Min Threshold must be less than or equal to Max Threshold',
    function (value) {
      if (!isValidBigInt(value)) {
        return this.createError({ message: 'Invalid input type' });
      }
      const targetThreshold = this.parent._targetThreshold;
      return compareBigInts((a, b) => a <= b, value, targetThreshold);
    }
  );
});

Yup.addMethod(Yup.string, 'betweenMinAndMax', function () {
  return this.test(
    'between-min-and-max',
    'Max Threshold must be between Min Threshold and Max Signers',
    function (value) {
      if (!isValidBigInt(value)) {
        return this.createError({ message: 'Invalid input type' });
      }
      const minThreshold = this.parent._minThreshold;
      const maxSigners = this.parent._maxSigners;
      return (
        compareBigInts((a, b) => a >= b, value, minThreshold) &&
        compareBigInts((a, b) => a <= b, value, maxSigners)
      );
    }
  );
});

Yup.addMethod(Yup.string, 'greaterThanTarget', function () {
  return this.test(
    'greater-than-target',
    'Max Signers must be greater than or equal to Max Threshold',
    function (value) {
      if (!isValidBigInt(value)) {
        return this.createError({ message: 'Invalid input type' });
      }
      const targetThreshold = this.parent._targetThreshold;
      return compareBigInts((a, b) => a >= b, value, targetThreshold);
    }
  );
});

export {};
