import { useRef, useEffect } from "react";

// A custom hook designed for compatibility with Formik's state,
// while minimising re-renders.

// The main aim is to allow Formik to handle input field state then,
// interact with Wagmi when we need to.

export function useSubmitRefetch(refetch: () => void, isError: boolean) {
	// On user 'onSubmit', the update to state causes re-render,
	// the ref is used to ensure read is carried out with the latest state value.
	const submitRef = useRef(false);

	useEffect(() => {
		if (submitRef.current) {
			submitRef.current = false;
			refetch();
		}
	});

	// If reading the contract gives an Error
	useEffect(() => {
		if (isError) submitRef.current = false;
	}, [isError]);

	const triggerRefetch = () => {
		submitRef.current = true;
	};

	return triggerRefetch;
}
