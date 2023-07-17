import { Button as ChackraUIButton, ButtonProps } from '@chakra-ui/react';

const Button: React.FC<ButtonProps> = (p) => {
  return (
    <ChackraUIButton
      {...p}
      height='40px'
      borderRadius='6px'
      fontSize='16px'
      fontWeight='500'
      borderWidth='1px'
      borderStyle='solid'
      borderColor={'button.black'}
      color='button.black'
      _active={{
        backgroundColor: 'cyan.100',
        borderColor: 'cyan.700',
      }}
      _disabled={{
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
