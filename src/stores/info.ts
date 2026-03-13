import { createSignal } from "solid-js";

const [hash, setHash] = createSignal();

export const isOpenEntry = (sectionId, entryId) => `${sectionId}-${entryId}` === hash();

export const setOpenEntry = (sectionId, entryId) => {
  setHash(`${sectionId}-${entryId}`);
};
