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
import { useContractWrite } from "wagmi";
import { EthereumAddress } from "../../../components/Deployers/forms/utils/ReadForm";

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
  const [formData, setFormData] = useState({
    minThreshold: p.minThreshold?.toString(),
    maxThreshold: p.maxThreshold?.toString(),
    ownerHat: p.ownerHat.toString(),
    hatsContract: p.hatsContract,
  });
  const originalFormData = useRef(formData);

  const validationSchema = Yup.object().shape({
    minThreshold: Yup.string().required("Required"),
    maxThreshold: Yup.string().required("Required"),
  });

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

  const { config, refetch: fetchUseOwnerHat } = useSetOwnerHat(
    {
      _ownerHat: BigInt(formData.maxThreshold || 0),
      _hatsContract: formData.hatsContract,
    },
    p.address
  );

  const { isLoading: setOwnerHatIsLoading, writeAsync: writeOwnerHatAsync, data: useOwnerHatData } =
    useContractWrite(config);

  useEffect(() => {
    if (useOwnerHatData) {
      p.setTransaction({
        ownerHat: useOwnerHatData
      });
    }
  }, [useOwnerHatData]);

  useEffect(() => {
    if (useMaxThresholdData) {
      p.setTransaction({
        maxThreshold: useMaxThresholdData
      });
    }
  }, [useMaxThresholdData]);

  useEffect(() => {
    if (useMinThresholdData) {
      p.setTransaction({
        minThreshold: useMinThresholdData,
      });
    }
  }, [useMinThresholdData]);


  useEffect(() => {
    p.setIsLoading(setOwnerHatIsLoading || setMaxThresholdIsLoading || setMinThresholdIsLoading);
  }, [setOwnerHatIsLoading, setMaxThresholdIsLoading, setMinThresholdIsLoading]);

  return (
    <>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setFormData(values);
          if (originalFormData.current.maxThreshold !== values.minThreshold) {
            const dataMinThreshold = await fetchUseMinThreshold?.();

            if (dataMinThreshold.status === "error") {
              alert(dataMinThreshold.error.message);
            } else {
              writeSetMinThresholdAsync?.();
            }

          }
          
          if (originalFormData.current.maxThreshold !== values.maxThreshold) {
            const dataMaxThreshold = await fetchUseMaxThreshold?.();
            if (dataMaxThreshold.status === "error") {
              alert(dataMaxThreshold.error.message);
            } else {
              writeSetMaxThresholdAsync?.();
            }
          }

          if (originalFormData.current.ownerHat !== values.ownerHat) {
            const dataOwnerHat = await fetchUseOwnerHat?.()
            if (dataOwnerHat.status === "error") {
              alert(dataOwnerHat.error.message);
            } else {
              writeOwnerHatAsync?.();
            }
          }
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
                  setMinThresholdIsLoading ||
                  setMaxThresholdIsLoading || 
                  setOwnerHatIsLoading
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
