import { VStack, Text } from '@chakra-ui/react';

interface SafeInfoProps {
  text: string;
  color: string;
  safeData: string;
}

export const SafeAttachMessage: React.FC<SafeInfoProps> = ({
  text,
  color,
  safeData,
}) => {
  return (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b" color={color}>
        {text}
      </Text>
      <Text wordBreak="break-word">{safeData}</Text>
    </VStack>
  );
};
