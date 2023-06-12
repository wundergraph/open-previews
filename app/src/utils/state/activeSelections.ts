import { persistentAtom } from "@nanostores/persistent";
import { PositionData } from "../pathBuilder";
import { LOCAL_STORAGE_SELECTIONS } from "../constants/constants";

export const $activeSelections = persistentAtom<Record<string, PositionData>>(
  LOCAL_STORAGE_SELECTIONS,
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const addSelection = (timeStamp: string, positionData: PositionData) => {
  $activeSelections.set({
    ...$activeSelections.get(),
    [timeStamp]: positionData,
  });
};

export const removeSelection = (timeStamp: string) => {
  const selections = $activeSelections.get();
  delete selections[timeStamp];
  $activeSelections.set(selections);
};
