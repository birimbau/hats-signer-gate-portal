import { FormErrorMessage, FormControl, Flex } from '@chakra-ui/react';
import Input from '../../../UI/CustomInput/CustomInput';
import { Field, FieldProps } from 'formik';
import './validation'; // Adjust the path to where yupExtensions.ts is located.

type CustomFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  isReadOnly?: boolean;
  width?: number;
};

const CustomInputWrapper: React.FC<CustomFieldProps> = ({
  name,
  label,
  placeholder,
  isReadOnly = false,
  width = 80,
}) => {
  return (
    <Flex flexDirection={'column'} gap={0} width={'100%'}>
      <Field name={name} width={'100%'}>
        {({ field, form }: FieldProps) => (
          <FormControl
            isInvalid={!!(form.errors[name] && form.touched[name])}
            width={'100%'}
          >
            <Input
              width={`${width}%`}
              label={label}
              placeholder={placeholder}
              field={field}
              isReadOnly={isReadOnly}
            />
            {/* Make sure all errors are created as strings in YupValidation */}
            <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};
export default CustomInputWrapper;
