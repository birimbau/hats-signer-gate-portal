import React, { createContext, useContext, useMemo, useState } from "react";

export enum HEADER_ACTIONS {
	DEPLOY = "deploy",
	MODIFY = "modify",
	CLAIM = "claim",
	RENOUNCE = "renounce",
	REMOVE = "remove",
	VIEW = "view",
}

export type SelectedActionType = {
	selected: HEADER_ACTIONS | undefined;
	setSelected: (action: HEADER_ACTIONS | undefined) => void;
};

const SelectedActionContext = createContext<SelectedActionType>({
	selected: undefined,
	setSelected: () => {},
});

export const useSelectedActionContext = () => useContext(SelectedActionContext);

export const SelectedActionProvider: React.FC<{ children: React.ReactNode }> = (
	p,
) => {
	const [selected, setSelected] =
		useState<SelectedActionType["selected"]>(undefined);

	const contextValue = useMemo(
		() => ({ selected, setSelected }),
		[selected, setSelected],
	);

	return (
		<SelectedActionContext.Provider value={contextValue}>
			{p.children}
		</SelectedActionContext.Provider>
	);
};
