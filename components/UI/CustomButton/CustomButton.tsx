import { Button as ChackraUIButton, ButtonProps } from '@chakra-ui/react';

const Button: React.FC<ButtonProps> = (p) => {
  return (
    <ChackraUIButton
      {...p}
      height="40px"
      borderRadius="6px"
      backgroundColor="button.white"
      justifyContent="flex-start"
      fontSize="16px"
      fontWeight="500"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="button.black"
      color="button.black"
      _hover={{
        backgroundColor: 'gray.50',
      }}
      _active={{
        backgroundColor: 'cyan.100',
        borderColor: 'cyan.900',
        color: 'cyan.900',
      }}
      _disabled={{
        backgroundColor: 'button.white',
        color: 'button.disabled',
        cursor: 'not-allowed',
        borderColor: 'button.disabled',
      }}
    >
      {p.children}
    </ChackraUIButton>
  );
};

export default Button;
