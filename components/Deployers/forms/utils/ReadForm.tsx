/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineRead } from "react-icons/ai";
import Button from "../../../UI/CustomButton/CustomButton";
import { Formik, Form } from "formik";
import CustomInputWrapper from "./CustomInputWrapper";
import {
	useGetModulesPaginated,
	useGetOwners,
} from "../../../../utils/hooks/GnosisSafeL2";
import * as Yup from "yup";
import "../utils/validation"; // for Yup Validation
import { useSubmitRefetch } from "../../../../hooks/useSubmitRefetch";
import { DeployConfigHSG, DeployConfigMHSG } from "../types/forms";
import { safe } from "../../../../pages/deploy/hsg";
import { useAccount } from "wagmi";

interface Props {
	setCanAttachSafe: (value: number) => void;
	formData: DeployConfigHSG | DeployConfigMHSG;
	setFormData: (formData: any) => void;
	setSafeOwnerAddress: (safeOwnerAddress: string[]) => void;
}

export type EthereumAddress = `0x${string}`;

function ReadForm(props: Props) {
	const { setCanAttachSafe, formData, setFormData, setSafeOwnerAddress } =
		props;
	const { isConnected, address } = useAccount();

	// This passes the safe address and check's if it's valid for connection
	const { data, refetch, isLoading, isError } = useGetModulesPaginated(
		formData._safe as EthereumAddress,
	);
	// This passes the safe address and check's if the user is connected to the correct wallet.
	const {
		data: ownersData,
		refetch: refetch2,
		isError: isError2,
	} = useGetOwners(formData._safe as EthereumAddress);

	// This is used to manage unnecessary re-renders. onSubmit only one re-render occurs
	const triggerRefetch = useSubmitRefetch(refetch, isError);
	const triggerRefetch2 = useSubmitRefetch(refetch2, isError2);

	// On re-render update the status to display relevant user message.
	// useEffect(() => {
	//   // If the user is connected to the wrong address, alert user
	//   if (ownersData) {
	//     const ownersArray = ownersData as unknown as string[];
	//     if (address !== undefined && !ownersArray.includes(address)) {
	//       setCanAttachSafe(safe.WRONG_ADDRESS);
	//     }
	//   }
	// }, [ownersData, address, setCanAttachSafe, refetch2]);

	// On re-render update the status to display relevant user message.
	useEffect(() => {
		if (data) {
			console.log("DATA: ", data);
			if (ownersData) {
				const ownersArray = ownersData as unknown as string[];
				if (address !== undefined && !ownersArray.includes(address)) {
					setCanAttachSafe(safe.WRONG_ADDRESS);
					setSafeOwnerAddress(ownersArray);
					return;
				}
			}
			setCanAttachSafe(
				data[0].length === 0 ? safe.CAN_ATTACH : safe.CANNOT_ATTACH,
			);
		}
	}, [data, ownersData, address, setCanAttachSafe, refetch]);
	// // On re-render check the error
	useEffect(() => {
		if (isError) {
			setCanAttachSafe(safe.INVALID_ADDRESS);
		}
	}, [isError, setCanAttachSafe]);

	const validationSchema = Yup.object().shape({
		_SafeAddress: Yup.string().required("Required").ethereumAddress(),
	});

	return (
		// This system of 'refetch' and 'enable:false' allows the hook to be more
		// efficient and only run once, onSubmit -> for more info see 'useSubmitRefetch'
		<Formik
			initialValues={{ _SafeAddress: "" }}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				setFormData({
					...formData,
					_safe: values._SafeAddress,
				});
				triggerRefetch();
				triggerRefetch2();
			}}
		>
			{() => (
				<Form noValidate>
					<VStack
						width="100%"
						alignItems={"flex-start"}
						fontSize={14}
						gap={5}
					>
						<Flex flexDirection={"column"} gap={0} w={"100%"}>
							<CustomInputWrapper
								name="_SafeAddress"
								label="Existing Safe (address)"
								placeholder="0xC8ac0000000000000000000000000000000047fe"
							/>
						</Flex>

						<Button
							type="submit"
							leftIcon={<AiOutlineRead />}
							isDisabled={isLoading || !isConnected}
							paddingInline={"30px"}
						>
							Read
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
}

export default ReadForm;
