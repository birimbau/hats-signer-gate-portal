import { FormErrorMessage, FormControl } from '@chakra-ui/react';
import Input from '../../../UI/CustomInput/CustomInput';
import { Field } from 'formik';
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
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <Input label={label} placeholder={placeholder} field={field} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
export default CustomInputWrapper;
