import localforage from "localforage";

export const useLocalDatabase = () => {
  if (process.browser) {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: "definity",
      version: 1.0,
      storeName: "defi", // Should be alphanumeric, with underscores.
      description: "Storage for blockchain data",
    });
    return localforage;
  }
};

export default useLocalDatabase;
