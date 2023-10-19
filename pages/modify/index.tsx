import { VStack, Text, Button } from "@chakra-ui/react";
import MainContent from "../../components/MainContent/MainContent";
import CheckHatsContract from "../claim/components/CheckHatsContract/CheckHatsContract";
import { useState } from "react";
import HSGView from "../view/components/HSGView/HSGView";
import MHSGView from "../view/components/MHSGView/MHSGView";
import HSGModifyForm from "./HSGModifyForm/HSGModifyForm";
import { FiCopy } from "react-icons/fi";
import { BsCardList } from "react-icons/bs";
import SafeButton from "../claim/components/SafeButton/SafeButton";
import MHSGMaxSigners from "../view/components/MHSGView/components/MaxSigners/MaxSigners";
import MHSGMaxThreshold from "../view/components/MHSGView/components/MaxThreshold/MaxThreshold";
import MHSGMinThreshold from "../view/components/MHSGView/components/MinThreshold/MinThreshold";
import HSGMaxSigners from "../view/components/HSGView/components/MaxSigners/MaxSigners";
import HSGMaxThreshold from "../view/components/HSGView/components/MaxThreshold/MaxThreshold";
import HSGMinThreshold from "../view/components/HSGView/components/MinThreshold/MinThreshold";
import { useNetwork } from "wagmi";
import { getBlockExplorerUrl } from "../../utils/utils";

const ModifyPage: React.FC = () => {
	const { chain } = useNetwork();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [transaction, setTransaction] = useState({});
	const [result, setResult] = useState<
		undefined | { isHsg: boolean; isMhsg: boolean }
	>(undefined);
	const [address, setAddress] = useState<undefined | `0x${string}`>(
		undefined
	);

	const headerOne = () => {
		if (result) {
			return (
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Current HSG Parameters</Text>
				</VStack>
			);
		}

		return (
			<VStack
				justifyContent="flex-end"
				height="100%"
				alignItems="flex-start"
			>
				<Text as="b">Modify Hats Signer Gate Contract</Text>
				<Text>Connect owner wallet, click ‘Fetch’</Text>
			</VStack>
		);
	};

	const headerTwo = () => {
		if (result) {
			return (
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">
						Modify {result.isHsg ? "HSG" : "MHSG"} Owner, Thresholds
					</Text>
					<Text>Enter one or more inputs, click ‘Modify’</Text>
				</VStack>
			);
		}

		return <></>;
	};

	const headerThree = () => {
		if (result && isLoading) {
			return (
				<VStack
					justifyContent="flex-end"
					height="100%"
					alignItems="flex-start"
				>
					<Text as="b">Transaction Pending...</Text>
				</VStack>
			);
		}
		return <></>;
	};

	const contentOne = () => {
		if (result?.isHsg) {
			return <HSGView address={address} />;
		}

		if (result?.isMhsg) {
			return <MHSGView address={address} />;
		}

		return (
			<>
				<CheckHatsContract
					onResult={(result, address) => {
						setResult(result);
						setAddress(address);
					}}
				/>
			</>
		);
	};

	const contentTwo = () => {
		if (result?.isHsg) {
			return (
				<HSGModifyForm
					address={address}
					setIsLoading={setIsLoading}
					setTransaction={(value) => {
						setTransaction({
							...transaction,
							...value,
						});
					}}
				/>
			);
		}

		if (result?.isMhsg) {
			return <></>;
		}

		return <></>;
	};

	const contentThree = () => {
		if (isLoading) {
			return <></>;
		}

		if (
			transaction.ownerHat ||
			transaction.maxThreshold ||
			transaction.minThreshold
		) {
			return (
				<VStack height="100%" alignItems="flex-start" gap={"24px"}>
					<Button
						leftIcon={<FiCopy />}
						onClick={() => {
							if (transaction.ownerHat) {
								window.open(
									`${getBlockExplorerUrl(
										chain?.id || 1
									)}/tx/${transaction.ownerHat}`
								);
							}

							if (transaction.maxThreshold) {
								window.open(
									`${getBlockExplorerUrl(
										chain?.id || 1
									)}/tx/${transaction.maxThreshold}`
								);
							}

							if (transaction.minThreshold) {
								window.open(
									`${getBlockExplorerUrl(
										chain?.id || 1
									)}/tx/${transaction.minThreshold}`
								);
							}
						}}
					>
						View Transaction
					</Button>
					<Button
						leftIcon={<BsCardList />}
						onClick={() => {
							window.open(
								`${getBlockExplorerUrl(
									chain?.id || 1
								)}/address/${address}`
							);
						}}
					>
						View {result?.isMhsg ? `MHSG` : `HSG`} Contract
					</Button>

					<SafeButton
						address={address}
						type={result?.isMhsg ? "MHSG" : "HSG"}
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

		if (result) {
			return (
				<VStack justifyContent="flex-start" alignItems="flex-start">
					<Text>
						<b>Owner Hat</b> can transfer ownership to a new Hat ID,
						set multisig parameters, and for a MHSG, add other Hats
						as valid signers. Note: once added as a valid signer, a
						Hat cannot be removed from the multisig
					</Text>
					<Text>
						<b>Min Threshold</b> is the fewest number of signers
						that can execute a transaction.
					</Text>
					<Text>
						<b>Max Threshold</b> when reached becomes the fewest
						number of signers that can execute a transaction.
					</Text>
					<Text>
						In order to execute a transaction, the safe must have a
						number of valid hat-wearing signers &gt;= Min Threshold.
						Each valid signer added beyond the Min Threshold will
						increase the safe&#39;s threshold until the Max
						Threshold is reached, after which the Safe&#39;s
						threshold will not increase.
					</Text>
				</VStack>
			);
		}

		return (
			<>
				<VStack
					justifyContent="flex-start"
					height="100%"
					alignItems="flex-start"
				>
					<Text>
						<b>Modify Parameters</b> of a multisig safe governed by
						an HSG or MHSG contract.{" "}
					</Text>
					<Text>
						The contract owner can transfer ownership, or adjust
						thresholds on an HSG, and add signer hats to an MHSG.
					</Text>
				</VStack>
			</>
		);
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

export default ModifyPage;
