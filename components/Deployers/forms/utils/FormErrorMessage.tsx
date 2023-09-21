import { Text } from '@chakra-ui/react';

interface FormErrorMessageProps {
  touched: boolean | undefined;
  error?: string | null;
}

const FormErrorMessage = ({ touched, error }: FormErrorMessageProps) => {
  if (!touched || !error) return null;

  return <Text color="red">{error}</Text>;
};

export default FormErrorMessage;
