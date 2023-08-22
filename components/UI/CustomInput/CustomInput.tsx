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
  const { label, width, ...rest } = p;

  return (
    <Box display={'flex'} flexDirection='column' width={width || undefined}>
      {label && (
        <Text
          fontStyle='normal'
          fontWeight={500}
          lineHeight='24px'
          as='label'
          id={p.name || undefined}
        >
          {label}
        </Text>
      )}
      <HStack gap='8px'>
        <ChakraUiInput
          {...rest}
          _placeholder={{
            fontSize: '14px',
          }}
          borderRadius='0px'
          borderColor='button.black'
          padding='0 16px'
          placeholdercolor='button.gray'
          background={'gray.50'}
          height={'40px'}
        ></ChakraUiInput>
        {p.extra && <>{p.extra}</>}
      </HStack>
    </Box>
  );
};

export default Input;
