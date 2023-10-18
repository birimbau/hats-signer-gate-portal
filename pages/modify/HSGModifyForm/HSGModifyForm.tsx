import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { use, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import CustomInputWrapper from "../../../components/Deployers/forms/utils/CustomInputWrapper";
import { FiSettings } from "react-icons/fi";
import {
  useGetHatsContract,
  useMinThreshold,
  useOwnerHat,
  useSetMinThreshold,
  useSetOwnerHat,
  useSetTargetThreshold,
  useTargetThreshold,
} from "../../../utils/hooks/HatsSignerGate";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { EthereumAddress } from "../../../components/Deployers/forms/utils/ReadForm";
import { decodeEventLog } from "viem";
import { HatsSignerGateAbi } from "../../../utils/abi/HatsSignerGate/HatsSignerGate";
import {
  hatIntSchema,
  minThresholdValidation,
  targetThresholdValidation,
} from "../../../components/Deployers/forms/utils/validation";
import { set } from "zod";

interface P {
  address?: EthereumAddress;
  setIsLoading: (isLoading: boolean) => void;
  setTransaction: (transaction: {
    ownerHat?: string;
    minThreshold?: string;
    maxThreshold?: string;
  }) => void;
}

const HSGModifyForm: React.FC<P> = (p) => {
  const { data: minThreshold, isLoading: minThresholdIsLoading } =
    useMinThreshold(p.address);
  const { data: maxThreshold, isLoading: maxThresholdIsLoading } =
    useTargetThreshold(p.address);
  const { data: ownerHat, isLoading: ownerHatIsLoading } = useOwnerHat(
    p.address
  );
  const { data: hatsContract, isLoading: hatsContractIsLoading } =
    useGetHatsContract(p.address);

  if (
    minThresholdIsLoading ||
    maxThresholdIsLoading ||
    ownerHatIsLoading ||
    hatsContractIsLoading
  ) {
    return <></>;
  } else {
    return (
      <HSGForm
        address={p.address}
        minThreshold={minThreshold}
        maxThreshold={maxThreshold}
        ownerHat={ownerHat}
        hatsContract={hatsContract}
        setIsLoading={p.setIsLoading}
        setTransaction={p.setTransaction}
      />
    );
  }
};

export default HSGModifyForm;

const HSGForm = (p) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transaction, setTransaction] = useState({
    ownerHat: "",
    minThreshold: "",
    maxThreshold: "",
  });
  const [minThresholdTransationHash, setMinThresholdTransationHash] =
    useState("");
  const [minThresholdData, setMinThresholdData] = useState("");

  const [maxThresholdTransationHash, setMaxThresholdTransationHash] =
    useState("");
  const [maxThresholdData, setMaxThresholdData] = useState("");

  const [ownerHatTransationHash, setOwnerTransationHash] = useState("");
  const [ownerHatData, setOwnerHatData] = useState("");

  const [formData, setFormData] = useState({
    minThreshold: p.minThreshold?.toString(),
    maxThreshold: p.maxThreshold?.toString(),
    ownerHat: p.ownerHat.toString(),
    hatsContract: p.hatsContract,
  });

  const originalFormData = useRef(formData);
  const validationSchema = Yup.object().shape({
    minThreshold: minThresholdValidation(hatIntSchema),
    maxThreshold: targetThresholdValidation(hatIntSchema),
  });

  // MinThreshold hooks
  const { config: configMinThreshold, refetch: fetchUseMinThreshold } =
    useSetMinThreshold(
      { _minThreshold: BigInt(formData.minThreshold || 0) },
      p.address
    );
  const {
    isLoading: setMinThresholdIsLoading,
    writeAsync: writeSetMinThresholdAsync,
    data: useMinThresholdData,
  } = useContractWrite(configMinThreshold);
  const {
    isSuccess: isSetMinThresholdSuccess,
    isLoading: setMinThresholdtransationPending,
  } = useWaitForTransaction({
    hash: useMinThresholdData?.hash,
    onSuccess(data) {
      setMinThresholdData(formData.minThreshold);
      console.log("Transaction Success");
    },
  });

  // MaxThreshold hooks
  const { config: configMaxThreshold, refetch: fetchUseMaxThreshold } =
    useSetTargetThreshold(
      { _targetThreshold: BigInt(formData.maxThreshold || 0) },
      p.address
    );
  const {
    isLoading: setMaxThresholdIsLoading,
    writeAsync: writeSetMaxThresholdAsync,
    data: useMaxThresholdData,
  } = useContractWrite(configMaxThreshold);
  const {
    isSuccess: isSetMaxThresholdSuccess,
    isLoading: setMaxThresholdtransationPending,
  } = useWaitForTransaction({
    hash: useMaxThresholdData?.hash,
    onSuccess(data) {

        setMaxThresholdData(formdate.maxThreshold);
     

      console.log("Transaction Success");
    },
  });

  // OwnerHat hooks
  const { config, refetch: fetchUseOwnerHat } = useSetOwnerHat(
    {
      _ownerHat: BigInt(formData.maxThreshold || 0),
      _hatsContract: formData.hatsContract,
    },
    p.address
  );
  const {
    isLoading: setOwnerHatIsLoading,
    writeAsync: writeOwnerHatAsync,
    data: useOwnerHatData,
  } = useContractWrite(config);
  const { isSuccess: isSetOwnerHatSuccess, isLoading: setOwnerHatPending } =
    useWaitForTransaction({
      hash: useMaxThresholdData?.hash,
      onSuccess(data) {
        setMaxThresholdData(formData.maxThreshold);
        console.log("Transaction Success");
      },
    });

  useEffect(() => {
    p.setIsLoading(
      setOwnerHatIsLoading ||
        setMaxThresholdIsLoading ||
        setMinThresholdIsLoading ||
        setMinThresholdtransationPending ||
        setMaxThresholdtransationPending ||
        setOwnerHatPending
    );
  }, [
    setOwnerHatIsLoading,
    setMaxThresholdIsLoading,
    setMinThresholdIsLoading,
    setMinThresholdtransationPending,
    setMaxThresholdtransationPending,
    setOwnerHatPending,
  ]);

  useEffect(() => {
    if (isSetMinThresholdSuccess) {
      p.setTransaction({
        minThreshold: useMinThresholdData?.hash,
      });
      originalFormData.current.minThreshold = formData.minThreshold;
      setIsSubmitted(false);
    }
  }, [isSetMinThresholdSuccess]);

  useEffect(() => {
    if (isSetMaxThresholdSuccess) {
      p.setTransaction({
        maxThreshold: maxThresholdTransationHash,
      });
      originalFormData.current.maxThreshold = formData.maxThreshold;
      setIsSubmitted(false);
    }
  }, [isSetMaxThresholdSuccess]);

  useEffect(() => {
    if (isSetOwnerHatSuccess) {
      p.setTransaction({
        ownerHat: ownerHatTransationHash,
      });
      originalFormData.current.ownerHat = formData.ownerHat;
      setIsSubmitted(false);
    }
  }, [isSetOwnerHatSuccess]);

  useEffect(() => {
    if (
      isSubmitted &&
      originalFormData.current.minThreshold !== formData.minThreshold &&
      fetchUseMinThreshold &&
      writeSetMinThresholdAsync
    ) {
      fetchUseMinThreshold().then((data) => {
        if (data.status === "error") {
          alert(data.error.message);
        } else {
          writeSetMinThresholdAsync?.();
        }
      });
    }

    if (
      isSubmitted &&
      originalFormData.current.maxThreshold !== formData.maxThreshold &&
      fetchUseMaxThreshold &&
      writeSetMaxThresholdAsync
    ) {
      fetchUseMaxThreshold().then((data) => {
        if (data.status === "error") {
          alert(data.error.message);
        } else {
          writeSetMaxThresholdAsync?.();
        }
      });

      if (
        isSubmitted &&
        originalFormData.current.ownerHat !== formData.ownerHat &&
        fetchUseOwnerHat &&
        writeOwnerHatAsync
      ) {
        fetchUseOwnerHat().then((data) => {
          if (data.status === "error") {
            alert(data.error.message);
          } else {
            writeOwnerHatAsync?.();
          }
        });
      }
    }
  }, [isSubmitted]);

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setFormData(values);
          setIsSubmitted(true);
        }}
      >
        {(props) => (
          <Form>
            <VStack
              width="100%"
              alignItems={"flex-start"}
              fontSize={14}
              gap={5}
            >
              <CustomInputWrapper
                label="New Owner Hat ID (integer)"
                placeholder="26960000000000000000000000003152"
                name="ownerHat"
              />
              <CustomInputWrapper
                label="Min Threshold (integer)"
                placeholder="3"
                name="minThreshold"
              />

              <CustomInputWrapper
                label="Max Threshold (integer)"
                placeholder="3"
                name="maxThreshold"
              />

              <Button
                type="submit"
                isDisabled={
                  !props.dirty ||
                  setOwnerHatIsLoading ||
                  setMaxThresholdIsLoading ||
                  setMinThresholdIsLoading ||
                  setMinThresholdtransationPending ||
                  setMaxThresholdtransationPending ||
                  setOwnerHatPending
                }
                leftIcon={<FiSettings />}
              >
                Modify
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
};
