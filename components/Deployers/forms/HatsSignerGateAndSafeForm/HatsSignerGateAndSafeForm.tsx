import { VStack, Text, Flex } from "@chakra-ui/react";
import Button from "../../../UI/CustomButton/CustomButton";
import { AbiTypeToPrimitiveType } from "abitype";
import { useState, useRef } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { useDeployHSGwSafe } from "../../../../utils/hooks/HatsSignerGateFactory";
import Input from "../../../UI/CustomInput/CustomInput";
import { useDeployMultiHatSGwSafe } from "../../../../utils/hooks/HatsSignerGateFactory";

interface useDeployHSGwSargs {
  _ownerHatId: AbiTypeToPrimitiveType<"uint256">;
  _signerHatId: AbiTypeToPrimitiveType<"uint256">;
  _minThreshold: AbiTypeToPrimitiveType<"uint256">;
  _targetThreshold: AbiTypeToPrimitiveType<"uint256">;
  _maxSigners: AbiTypeToPrimitiveType<"uint256">;
}

interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: any; // Assuming formData is an object with initial values
  setFormData: (formData: any) => void;
}

export default function HatsSignerGateAndSafeForm(props: Props) {
  // Destructure Props for ease of use & visibility within this function
  const { setIsPending, setData, setTransactionData, formData, setFormData } =
    props;

  // Used to prevent the user Deploying
  const { isConnected } = useAccount();

  // useRef - to store values until user writes to the contract
  const args = useRef({
    _ownerHatId: BigInt(0),
    _signerHatId: BigInt(0),
    _minThreshold: BigInt(0),
    _targetThreshold: BigInt(0),
    _maxSigners: BigInt(0),
  });

  // The args are passed into "usePrepareContractWrite" returning a "prepared configuration" to be sent through to useContractWrite.
  const { config } = useDeployHSGwSafe(args.current);
  const { data, isLoading, isSuccess, isError, write } =
    useContractWrite(config);
  // No need to spread config ^^, it's an object

  return (
    <VStack width="100%" alignItems={"flex-start"} fontSize={14} gap={5}>
      <Flex flexDirection={"column"} gap={0} w={"80%"}>
        {" "}
        <Input
          label="Owner Hat ID (integer)"
          placeholder="26950000000000000000000000004196..."
          onChange={(e) =>
            SetArgs({ ...args, _ownerHatId: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"80%"}>
        {" "}
        <Input
          label="Signer Hat ID (integer)"
          placeholder="26960000000000000000000000003152..."
          onChange={(e) =>
            SetArgs({ ...args, _signerHatId: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"60%"}>
        {" "}
        <Input
          label="Min Threshold (integer)"
          placeholder="3"
          onChange={(e) =>
            SetArgs({ ...args, _minThreshold: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"60%"}>
        {" "}
        <Input
          label="Max Threshold (integer)"
          placeholder="5"
          onChange={(e) =>
            SetArgs({ ...args, _targetThreshold: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={"column"} gap={0} w={"60%"}>
        {" "}
        <Input
          label="Max Signers (integer)"
          placeholder="9"
          onChange={(e) =>
            SetArgs({ ...args, _maxSigners: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Button
        disabled={!isConnected || isLoading || !write}
        onClick={() => write?.()}
        width={"140px"}
      >
        Deploy
      </Button>
    </VStack>
  );
}
