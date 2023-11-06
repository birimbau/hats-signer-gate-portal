import { useRef, useEffect, useState } from "react";

// LOGIC FOR RUNNING CONTRACTS AFTER CLICKING FORMIK'S OnSubmit
// This only runs once on user submit, avoiding unnecessary calls to hooks.

// HOW DOES IT WORK?
// onSubmit, state is passed up one layer which causes a re-render.
// The new values are needed to populate useDeployMultiHatSG and useContractWrite.
// useDeployMultiHatSG creates a new refetch function which is needed for write(),
// it is for this reason that setSubmitCount is used and reftech() & write?.()
// are split into separate useEffects.

interface SubmitHookProps {
	write: (() => void) | undefined;
	refetch: Function;
	isError: boolean;
	contractPrepared: boolean;
}

export const useRefetchWrite = ({
	write,
	refetch,
	isError,
	contractPrepared,
}: SubmitHookProps) => {
	const submitRef = useRef(false);
	const writeRef = useRef(false);
	const [submitCount, setSubmitCount] = useState(0);
	// console.log('inside useRefetchWrite');

	// onSubmit, call refetch() so write can update
	useEffect(() => {
		if (submitRef.current) {
			submitRef.current = false;
			writeRef.current = true;
			// console.log('inside useRefetchWrite - refetch()');

			refetch();
			setSubmitCount((prevCount) => prevCount + 1);
		}
	}, [refetch, submitCount]);

	// now write is upto date, call it.
	useEffect(() => {
		if (writeRef.current && contractPrepared) {
			writeRef.current = false;
			// console.log('inside useRefetchWrite - write()');
			write?.();
		}
	}, [write, contractPrepared, submitCount]);

	// if the user exits the transaction, allow proper handling of deploy button.
	useEffect(() => {
		if (isError) {
			// console.log('inside useRefetchWrite - error');
			submitRef.current = false;
		}
	}, [isError]);

	const handleFormSubmit = () => {
		// console.log('inside handleFormSubmit function (increase setSubmitCount)');
		submitRef.current = true;
		setSubmitCount((prevCount) => prevCount + 1);
	};

	return handleFormSubmit;
};
