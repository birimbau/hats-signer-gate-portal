import { FormErrorMessage, FormControl } from '@chakra-ui/react';
import Input from '../../../UI/CustomInput/CustomInput';
import { Field, FieldProps } from 'formik';
import './validation'; // Adjust the path to where yupExtensions.ts is located.

type CustomFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

const CustomInputWrapper: React.FC<CustomFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!(form.errors[name] && form.touched[name])}>
          <Input label={label} placeholder={placeholder} field={field} />
          {/* Make sure all errors are created as strings in YupValidation */}
          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
export default CustomInputWrapper;
