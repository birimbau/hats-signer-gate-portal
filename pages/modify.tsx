import { VStack, Text } from "@chakra-ui/react";
import MainContent from "@/components/MainContent";
import CheckHatsContract from "@/forms/CheckHatsContractForm";
import Button from "@/components/ui/CustomButton";
import { useState } from "react";
import HSGView from "@/components/HSGView";
import MHSGView from "@/components/MHSGView";
import HSGModifyForm from "@/forms/HSGModifyForm";
import { FiCopy } from "react-icons/fi";
import { BsCardList } from "react-icons/bs";
import SafeButton from "@/components/ui/SafeButton";
import MHSGMaxSigners from "@/components/ui/MaxSigners";
import MHSGMaxThreshold from "@/components/ui/MaxThreshold";
import MHSGMinThreshold from "@/components/ui/MinThreshold";
import HSGMaxSigners from "@/components/ui/MaxSigners";
import HSGMaxThreshold from "@/components/ui/MaxThreshold";
import HSGMinThreshold from "@/components/ui/MinThreshold";
import { useNetwork } from "wagmi";
import { getBlockExplorerUrl } from "@/utils";
import MHSGModifyForm from "@/forms/MHSGModifyForm";
import { Hex } from "viem";

const ModifyPage: React.FC = () => {
	const { chain } = useNetwork();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [transaction, setTransaction] = useState<any>({
		ownerHat: undefined,
		maxThreshold: undefined,
		minThreshold: undefined,
	});
	const [result, setResult] = useState<
		undefined | { isHsg: boolean; isMhsg: boolean }
	>(undefined);
	const [address, setAddress] = useState<undefined | Hex>(undefined);

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
				<CheckHatsContract formikProps={formikProps} />
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
			return (
				<MHSGModifyForm
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
							if (transaction.ownerHat) {
								window.open(
									`${getBlockExplorerUrl(
										chain?.id || 1,
									)}/tx/${transaction.ownerHat}`,
								);
							}

							if (transaction.maxThreshold) {
								window.open(
									`${getBlockExplorerUrl(
										chain?.id || 1,
									)}/tx/${transaction.maxThreshold}`,
								);
							}

							if (transaction.minThreshold) {
								window.open(
									`${getBlockExplorerUrl(
										chain?.id || 1,
									)}/tx/${transaction.minThreshold}`,
								);
							}
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
				<VStack
					justifyContent="flex-start"
					alignItems="flex-start"
					mt="18px"
				>
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
