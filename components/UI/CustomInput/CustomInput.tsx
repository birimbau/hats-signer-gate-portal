import {
  Box,
  HStack,
  Input as ChakraUiInput,
  InputProps,
  Text,
} from '@chakra-ui/react';

type P = {
  label?: string;
  extra?: React.ReactNode;
} & InputProps;

const Input: React.FC<P> = (p) => {
  const { label, ...rest } = p;

  return (
    <Box display={'flex'} flexDirection='column'>
      {label && (
        <Text as='label' id={p.name || undefined}>
          {label}
        </Text>
      )}
      <HStack gap='8px'>
        <ChakraUiInput
          {...rest}
          borderRadius='0px'
          borderColor='button.black'
          padding='0 16px'
          placeholdercolor='button.gray'
          height={'40px'}
        ></ChakraUiInput>
        {p.extra && <>{p.extra}</>}
      </HStack>
    </Box>
  );
};

export default Input;
