import { VStack, Text } from '@chakra-ui/react';

interface SafeInfoProps {
  text: string;
  color: string;
  safeData?: string;
  justifyStart?: boolean;
  children?: React.ReactNode; // Add children as an optional prop
}

export const SafeAttachMessage: React.FC<SafeInfoProps> = ({
  text,
  color,
  safeData,
  justifyStart = false,
  children, // Destructure children from props
}) => {
  return (
    <VStack
      justifyContent={`${justifyStart ? 'flex-start' : 'flex-end'}`}
      height="100%"
      alignItems="flex-start"
    >
      <Text as="b" color={color}>
        {text}
      </Text>
      {safeData && <Text wordBreak="break-word">{safeData}</Text>}
      {children} {/* Render children if passed */}
    </VStack>
  );
};
