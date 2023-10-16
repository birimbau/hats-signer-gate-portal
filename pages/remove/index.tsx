import { VStack, Text } from '@chakra-ui/react';
import MainContent from '../../components/MainContent/MainContent';
import CheckHatsContract from '../claim/components/CheckHatsContract/CheckHatsContract';
import { useState } from 'react';
import Button from '../../components/UI/CustomButton/CustomButton';
import { useNetwork } from 'wagmi';
import { getBlockExplorerUrl } from '../../utils/utils';
import { FiCopy } from 'react-icons/fi';
import { BsCardList } from 'react-icons/bs';
import HSGRemoveForm from './components/HSGRemoveForm/HSGRemoveForm';
import MHSGRemoveForm from './components/MHSGRemoveForm/MHSGRemoveForm';
import SafeButton from '../claim/components/SafeButton/SafeButton';
import MHSGMaxSigners from '../view/components/MHSGView/components/MaxSigners/MaxSigners';
import MHSGMaxThreshold from '../view/components/MHSGView/components/MaxThreshold/MaxThreshold';
import MHSGMinThreshold from '../view/components/MHSGView/components/MinThreshold/MinThreshold';
import HSGMaxSigners from '../view/components/HSGView/components/MaxSigners/MaxSigners';
import HSGMaxThreshold from '../view/components/HSGView/components/MaxThreshold/MaxThreshold';
import HSGMinThreshold from '../view/components/HSGView/components/MinThreshold/MinThreshold';
import { EthereumAddress } from '../../components/Deployers/forms/utils/ReadForm';
import { SafeAttachMessage } from '../../components/Deployers/forms/utils/SafeAttachMessage';

// Add standardised "isNotConnected" to all button logics. WHOLE APP
// -- WRONG NETWORK MESSAGE / NOT CONNECTED MESSAGE

const Remove = () => {
  const [result, setResult] = useState<
    undefined | { isHsg: boolean; isMhsg: boolean }
  >(undefined);
  const [address, setAddress] = useState<undefined | EthereumAddress>(
    undefined
  );
  const [isPending, setIsPending] = useState(false);
  const [transaction, setTransaction] = useState(undefined);
  const { chain } = useNetwork();
  const [isErrorCheckHats, setIsErrorCheckHats] = useState(false);
  const [isErrorOne, setIsErrorOne] = useState(false);
  const [isErrorTwo, setIsErrorTwo] = useState(false);

  // console.log('address: ', address);
  let definedContractAddress: EthereumAddress = '0x';
  // console.log('definedContractAddress BEFORE: ', definedContractAddress);
  if (address !== undefined) definedContractAddress = address;
  // console.log('definedContractAddress AFTER: ', definedContractAddress);

  const headerOne = () => (
    <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
      <Text as="b">Remove Signing Authority</Text>
      <Text>Connect wallet with relevant hat, click ‘Fetch’</Text>
    </VStack>
  );

  const contentOne = () => {
    return (
      <CheckHatsContract
        onResult={(result, address) => {
          console.log(result);
          setResult(result);
          setAddress(address);
        }}
        setIsError={setIsErrorCheckHats}
        // Used to clear state to false.
        setIsErrorOne={setIsErrorOne}
        setIsErrorTwo={setIsErrorTwo}
      />
    );
  };

  const headerTwo = () => {
    if (result?.isMhsg || result?.isHsg) {
      return (
        <VStack justifyContent="flex-end" height="100%" alignItems="flex-start">
          <Text as="b">Remove Signer from Safe App</Text>
          <Text>Enter wallet address, Click &rsquo;Remove&rsquo;</Text>
        </VStack>
      );
    }
    return <></>;
  };

  const contentTwo = () => {
    if (result?.isMhsg) {
      return (
        <MHSGRemoveForm
          mhsgAddress={definedContractAddress}
          onLoading={(value) => setIsPending(value)}
          onTransationComplete={(transation) => {
            setTransaction(transation);
          }}
          setIsErrorOne={setIsErrorOne}
          setIsErrorTwo={setIsErrorTwo}
          setIsPending={setIsPending}
        />
      );
    }

    if (result?.isHsg) {
      return (
        <HSGRemoveForm
          hsgAddress={definedContractAddress}
          onTransationComplete={(transation) => {
            setTransaction(transation);
          }}
          setIsErrorOne={setIsErrorOne}
          setIsErrorTwo={setIsErrorTwo}
          setIsPending={setIsPending}
        />
      );
    }
    return <></>;
  };

  const headerThree = () => {
    if (!isPending && isErrorCheckHats) {
      return (
        <SafeAttachMessage
          text="Fetch Failed: Invalid HSG or MHSG address"
          color="red"
          safeData=""
        />
      );
    }

    if (!isPending && isErrorOne) {
      return (
        <SafeAttachMessage
          text="Transaction Failed: 'StillWearsSignerHat'"
          color="red"
          safeData=""
        />
      );
    }
    if (!isPending && isErrorTwo) {
      return (
        <SafeAttachMessage
          text="Transaction Failed: 'FailedExecRemoveSigner'"
          color="red"
          safeData=""
        />
      );
    }
    if (!transaction && isPending) {
      return (
        <SafeAttachMessage
          text="Transaction Pending..."
          color="black"
          safeData=""
        />
      );
    }

    if (!isPending && transaction) {
      return (
        <SafeAttachMessage
          text="Transaction Complete"
          color="black"
          safeData=""
        />
      );
    }

    return <></>;
  };

  const contentThree = () => {
    console.log('isErrorOne', isErrorOne);
    console.log('isErrorTwo', isErrorTwo);
    console.log('isPending', isPending);
    console.log('isErrorCheckHats', isErrorCheckHats);
    if (!isPending && isErrorCheckHats) {
      return (
        <SafeAttachMessage
          text=""
          color="black"
          safeData="Check the entered address, make sure it is a valid HSG or MHSG address"
          justifyStart={true}
        />
      );
    }

    if (!isPending && isErrorOne) {
      return (
        <SafeAttachMessage
          text=""
          color="red"
          safeData="The Signer address must first renounce the associated hat in the app."
          justifyStart={true}
        />
      );
    }
    if (!isPending && isErrorTwo) {
      return (
        <>
          <SafeAttachMessage
            text=""
            color="red"
            safeData="The address is invalid, below are potential reasons why:"
            justifyStart={true}
          >
            <ul style={{ paddingInline: '24px' }}>
              <li>
                <Text>The address you&apos;ve entered is incorrect.</Text>
              </li>
              <li>
                <Text>
                  The address you&apos;ve entered is not wearing the relevant
                  hat.
                </Text>
              </li>
              <li>
                <Text>
                  The signer address has not claimed singing authority.
                </Text>
              </li>
              <li>
                <Text>Singing authority has already been removed.</Text>
              </li>
            </ul>
          </SafeAttachMessage>
        </>
      );
    }
    if (!transaction) {
      return (
        <>
          <Text>
            <b>Remove an Inactive Signer</b> that is no longer wearing the
            signer hat.
          </Text>
          <br></br>
          <Text>
            Once a signer has renounced signer authority on the Hats app, this
            maintenance step can be performed by any wallet, in order to sync
            the multisig safe.
          </Text>
        </>
      );
    }
    if (!isPending && transaction) {
      return (
        <VStack height="100%" alignItems="flex-start" gap={'24px'}>
          <Button
            leftIcon={<FiCopy />}
            onClick={() => {
              window.open(
                `${getBlockExplorerUrl(chain?.id || 1)}/address/${transaction}`
              );
            }}
          >
            View Transaction
          </Button>
          <Button
            leftIcon={<BsCardList />}
            onClick={() => {
              window.open(
                `${getBlockExplorerUrl(chain?.id || 1)}/address/${address}`
              );
            }}
          >
            View {result?.isMhsg ? `MHSG` : `HSG`} Contract
          </Button>

          <SafeButton
            address={address}
            type={result?.isMhsg ? 'MHSG' : 'HSG'}
          ></SafeButton>
          {result?.isMhsg && (
            <>
              <MHSGMaxSigners address={address} />
              <MHSGMaxThreshold address={address} />
              <MHSGMinThreshold address={address} />
            </>
          )}
          {result?.isHsg && (
            <>
              <HSGMaxSigners address={address} />
              <HSGMaxThreshold address={address} />
              <HSGMinThreshold address={address} />
            </>
          )}
        </VStack>
      );
    }

    return <></>;
  };

  return (
    <MainContent
      headerOne={headerOne()}
      headerTwo={headerTwo()}
      headerThree={headerThree()}
      contentOne={contentOne()}
      contentTwo={contentTwo()}
      contentThree={contentThree()}
    />
  );
};

export default Remove;
