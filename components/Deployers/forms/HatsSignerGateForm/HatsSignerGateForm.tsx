import { Input, VStack, Text, Flex } from "@chakra-ui/react";
import Button from "../../../UI/CustomButton/CustomButton";
import { AbiTypeToPrimitiveType } from "abitype";
import { useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { useDeployHSG } from "../../../../utils/hooks/HatsSignerGateFactory";

interface useDeployHSGargs {
  _ownerHatId: AbiTypeToPrimitiveType<"uint256">;
  _signerHatId: AbiTypeToPrimitiveType<"uint256">;
  _safe: AbiTypeToPrimitiveType<"address">;
  _minThreshold: AbiTypeToPrimitiveType<"uint256">;
  _targetThreshold: AbiTypeToPrimitiveType<"uint256">;
  _maxSigners: AbiTypeToPrimitiveType<"uint256">;
}

export default function HatsSignerGateForm() {
  const { address, isConnected } = useAccount();

  const [args, SetArgs] = useState<useDeployHSGargs>({} as useDeployHSGargs);

  const { config } = useDeployHSG(args as useDeployHSGargs);
  const { data, isLoading, isSuccess, isError, write } =
    useContractWrite(config);

  {
    /* Safe address to be added and set from first step */
  }

  return (
    <VStack
      width="100%"
      py={10}
      alignItems={"flex-start"}
      fontSize={14}
      gap={5}
    >
      <Flex flexDirection={"column"} gap={0} w={"80%"}>
        {" "}
        <Text fontStyle="normal" fontWeight={500} lineHeight="24px">
          Owner Hat ID
        </Text>
        <Input
          placeholder="_ownerHatId (uint256)"
          borderRadius="0"
          border="1px solid black"
          bg="white"
          onChange={(e) =>
            SetArgs({ ...args, _ownerHatId: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"80%"}>
        {" "}
        <Text fontStyle="normal" fontWeight={500} lineHeight="24px">
          Signer Hat ID
        </Text>
        <Input
          placeholder="_signersHatId (uint256)"
          borderRadius="0"
          border="1px solid black"
          bg="white"
          onChange={(e) =>
            SetArgs({ ...args, _signerHatId: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"60%"}>
        {" "}
        <Text fontStyle="normal" fontWeight={500} lineHeight="24px">
          Signers Minimum
        </Text>
        <Input
          placeholder="_minThreshold (uint256)"
          borderRadius="0"
          border="1px solid black"
          bg="white"
          onChange={(e) =>
            SetArgs({ ...args, _minThreshold: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"60%"}>
        {" "}
        <Text fontStyle="normal" fontWeight={500} lineHeight="24px">
          Signers Target
        </Text>
        <Input
          placeholder="_targetThreshold (uint256)"
          borderRadius="0"
          border="1px solid black"
          bg="white"
          onChange={(e) =>
            SetArgs({ ...args, _targetThreshold: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"60%"}>
        {" "}
        <Text fontStyle="normal" fontWeight={500} lineHeight="24px">
          Signers Maximum
        </Text>
        <Input
          placeholder="_maxSigners (uint256)"
          borderRadius="0"
          border="1px solid black"
          bg="white"
          onChange={(e) =>
            SetArgs({ ...args, _maxSigners: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Button
        disabled={!isConnected || !write}
        onClick={() => write?.()}
        width={"140px"}
      >
        Deploy
      </Button>
    </VStack>
  );
}
