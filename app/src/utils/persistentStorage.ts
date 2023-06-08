import localforage from "localforage";

localforage.config({
  name: "open-previews",
  storeName: "selectedElements",
});

export const storage = localforage;
