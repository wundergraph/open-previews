import { PositionData } from "./pathBuilder";
// import { storage } from "./persistentStorage";

type StoredPositionData = { timestamp: string } & PositionData;

export const getSelectedItems = async (): Promise<
  Array<StoredPositionData>
> => {
  // let keys = await storage.keys();
  let items: Array<StoredPositionData> = [];

  // for (let key of keys) {
  //   let positionData = (await storage.getItem(key)) as PositionData;
  //   items.push({ timestamp: key, ...positionData });
  // }

  return items;
};
