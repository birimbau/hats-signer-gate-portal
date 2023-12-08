import { VStack, Text } from "@chakra-ui/react";
import MainContent from "@/components/MainContent";
import CheckHatsContract from "@/forms/CheckHatsContractForm";
import { useState } from "react";
import Button from "@/components/ui/CustomButton";
import { useNetwork } from "wagmi";
import { getBlockExplorerUrl } from "@/utils";
import { FiCopy } from "react-icons/fi";
import { BsCardList } from "react-icons/bs";
import HSGRemoveForm from "@/forms/HSGRemoveForm";
// import MHSGRemoveForm from "./components/MHSGRemoveForm";
import SafeButton from "@/components/ui/SafeButton";
import MaxSigners from "@/components/ui/MaxSigners";
import MaxThreshold from "@/components/ui/MaxThreshold";
import MinThreshold from "@/components/ui/MinThreshold";
import { SafeAttachMessage } from "@/components/form/SafeAttachMessage";
import { Hex } from "viem";

// Add standardised "isNotConnected" to all button logics. WHOLE APP
// -- WRONG NETWORK MESSAGE / NOT CONNECTED MESSAGE

// FIGURE OUT THE PROCESS FLOW FOR REMOVE. CURRENTLY UNABLE TO REMOVE - WHAT IS THE DESIRED USECASE, WHAT ACTIONS NEED TO OCCUR FOR A USER TO BE ABLE TO REMOVE?

const Remove = () => {
	const [result, setResult] = useState<
		undefined | { isHsg: boolean; isMhsg: boolean }
	>(undefined);
	const [address, setAddress] = useState<undefined | Hex>(undefined);
	const [isPending, setIsPending] = useState(false);
	const [transaction, setTransaction] = useState(undefined);
	const { chain } = useNetwork();
	const [isErrorCheckHats, setIsErrorCheckHats] = useState(false);
	const [isErrorOne, setIsErrorOne] = useState(false);
	const [isErrorTwo, setIsErrorTwo] = useState(false);

	// console.log('address: ', address);
	let definedContractAddress: Hex = "0x";
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
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Remove Signer from Safe App</Text>
					<Text>
						Enter wallet address, Click &rsquo;Remove&rsquo;
					</Text>
				</VStack>
			);
		}
		return <></>;
	};

	const contentTwo = () => {
		if (result?.isMhsg) {
			return (
				<></>
				// <MHSGRemoveForm
				// 	mhsgAddress={definedContractAddress}
				// 	onLoading={(value) => setIsPending(value)}
				// 	onTransactionComplete={(transaction) => {
				// 		setTransaction(transaction);
				// 	}}
				// 	setIsErrorOne={setIsErrorOne}
				// 	setIsErrorTwo={setIsErrorTwo}
				// 	setIsPending={setIsPending}
				// />
			);
		}

		if (result?.isHsg) {
			return (
				<HSGRemoveForm
					hsgAddress={definedContractAddress}
					onTransactionComplete={(transaction) => {
						setTransaction(transaction);
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
						<ul style={{ paddingInline: "24px" }}>
							<li>
								<Text>
									The address you&apos;ve entered is
									incorrect.
								</Text>
							</li>
							<li>
								<Text>
									The address you&apos;ve entered is not
									wearing the relevant hat.
								</Text>
							</li>
							<li>
								<Text>
									The signer address has not claimed singing
									authority.
								</Text>
							</li>
							<li>
								<Text>
									Singing authority has already been removed.
								</Text>
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
						<b>Remove an Inactive Signer</b> that is no longer
						wearing the signer hat.
					</Text>
					<br></br>
					<Text>
						Once a signer has renounced signer authority on the Hats
						app, this maintenance step can be performed by any
						wallet, in order to sync the multisig safe.
					</Text>
				</>
			);
		}
		if (!isPending && transaction) {
			return (
				<VStack
					height="100%"
					alignItems="flex-start"
					gap={"24px"}
					mt="24px"
				>
					<Button
						leftIcon={<FiCopy />}
						minWidth={"60%"}
						onClick={() => {
							window.open(
								`${getBlockExplorerUrl(
									chain?.id || 1,
								)}/address/${transaction}`,
							);
						}}
					>
						View Transaction
					</Button>
					<Button
						leftIcon={<BsCardList />}
						minWidth={"60%"}
						onClick={() => {
							window.open(
								`${getBlockExplorerUrl(
									chain?.id || 1,
								)}/address/${address}`,
							);
						}}
					>
						View {result?.isMhsg ? `MHSG` : `HSG`} Contract
					</Button>

					<SafeButton
						address={address}
						type={result?.isMhsg ? "MHSG" : "HSG"}
					/>
					{result?.isMhsg && (
						<>
							<MaxSigners address={address} />
							<MaxThreshold address={address} />
							<MinThreshold address={address} />
						</>
					)}
					{result?.isHsg && (
						<>
							<MaxSigners address={address} />
							<MaxThreshold address={address} />
							<MinThreshold address={address} />
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
