import type { NextPage } from 'next';
import MainContent from '../components/MainContent/MainContent';
import { VStack, Text, Card, CardBody } from '@chakra-ui/react';
import { useWalletConnectionContext } from '../context/WalletConnectionContext';
import { AiOutlineDeploymentUnit, AiOutlineSetting } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import { CgUserRemove } from 'react-icons/cg';
import { LiaCopySolid } from 'react-icons/lia';
import Button from '../components/UI/CustomButton/CustomButton';
import { HEADER_ACTIONS } from '../context/SelectedActionContext';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { isConnected, isWrongNetwork, isReadyToUse } =
    useWalletConnectionContext();
  const router = useRouter();

  const onClickHandler = (action: HEADER_ACTIONS) => {
    router.replace(`/${action.toLowerCase()}`);
  };

  return (
    <MainContent
      headerOne={
        <VStack justifyContent='flex-end' height='100%' alignItems='flex-start'>
          <Text as='b'>Welcome to the Hats Signer Gate Frontend</Text>
          <Text>
            You can leverage the capabilities of this dashboard for the
            following functions:
          </Text>
        </VStack>
      }
      headerTwo={<></>}
      headerThree={
        <>
          {!isConnected && (
            <VStack
              justifyContent='flex-end'
              height='100%'
              alignItems='flex-start'
            >
              <Text as='b'>Please Connect Your Wallet</Text>
            </VStack>
          )}
          {isWrongNetwork && (
            <VStack
              justifyContent='flex-end'
              height='100%'
              alignItems='flex-start'
            >
              <Text as='b'>Wrong Network</Text>
            </VStack>
          )}
          {isReadyToUse && (
            <VStack
              justifyContent='flex-end'
              height='100%'
              alignItems='flex-start'
            >
              <Text as='b'>Wallet Connected</Text>
            </VStack>
          )}
        </>
      }
      contentOne={
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.DEPLOY)}
                  leftIcon={<AiOutlineDeploymentUnit />}
                >
                  Deploy
                </Button>
                <Text>
                  <Text as='b'>Deploy a Hats Signer Gate</Text> (HSG), or
                  Multiple Hats Signer Gate (MHSG) smart contract via the Hats
                  Signer Gate Factory contract.
                </Text>
                <Text>
                  An HSG or MHSG can be deployed for an existing safe or in
                  conjunction with a new safe that will be generated.
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.CLAIM)}
                  leftIcon={<LuEdit />}
                >
                  Claim
                </Button>
                <Text>
                  <Text as='b'>Claim Signing Authority</Text> on a multisig safe
                  that is controlled by an HSG or MSHG for which you wear the
                  signing Hat.
                </Text>
                <Text>
                  After the contract owner assigns the signer hat to your wallet
                  address, you can be included in the safe.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      }
      contentTwo={
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.MODIFY)}
                  leftIcon={<AiOutlineSetting />}
                >
                  Modify
                </Button>

                <Text>
                  <Text as='b'>Modify Parameters</Text> of a multisig safe
                  governed by an HSG or MHSG contract.
                </Text>
                <Text>
                  The contract owner can transfer ownership, or adjust
                  thresholds on an HSG, and add signer hats to an MHSG.
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.RENOUNCE)}
                  leftIcon={<CgUserRemove />}
                >
                  Renounce
                </Button>
                <Text>
                  <Text as='b'>Renounce Signing Authority</Text> by giving up
                  the signer hat on the Hats app.
                </Text>
                <Text>
                  If you decide that you no longer wish to be a signer on the
                  safe, you have the option to relinquish your signing
                  authority.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      }
      contentThree={
        <VStack gap='43px'>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.VIEW)}
                  leftIcon={<LiaCopySolid />}
                >
                  View
                </Button>

                <Text>
                  <Text as='b'>View Parameters</Text> of a multisig safe
                  governed by an HSG or MHSG contract.
                </Text>
                <Text>
                  Any wallet can fetch the contract to view thresholds, Signer
                  Hat IDs, the safe address, and number of valid signers.
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card minHeight='250px'>
            <CardBody>
              <VStack gap='25px' alignItems={'flex-start'}>
                <Button
                  isDisabled={!isReadyToUse}
                  onClick={() => onClickHandler(HEADER_ACTIONS.REMOVE)}
                  leftIcon={<CgUserRemove />}
                >
                  Remove
                </Button>
                <Text>
                  <Text as='b'>Remove an Inactive Signer</Text> that is no
                  longer wearing the signer hat.
                </Text>
                <Text>
                  Once a signer has renounced signer authority on the Hats app,
                  this maintenance step can be performed by any wallet, in order
                  to sync the multisig safe.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      }
    />
  );
};

export default Home;
