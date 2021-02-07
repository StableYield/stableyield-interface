import loki from "lokijs";
import lokiAdapter from "lokijs/src/loki-indexed-adapter.js";

export const useLocalDatabaseLoki = () => {
  if (process.browser) {
    const adapter = new lokiAdapter();
    const databaseLocal = new loki("local.db", {
      autosave: false,
      autoload: true,
      adapter: adapter,
      autoloadCallback: databaseInitialize,
      autosaveInterval: 1000,
    });

    function databaseInitialize() {
      if (!databaseLocal.getCollection("tokens")) {
        databaseLocal.addCollection("tokens", {
          unique: ["address"],
        });
      }
      if (!databaseLocal.getCollection("transactions")) {
        databaseLocal.addCollection("transactions", {
          unique: ["hash"],
        });
      }
    }
    const tokens = () => {
      const t = databaseLocal.getCollection("tokens");
      console.log(t);
      return t;
    };
    return databaseLocal;
  }
};

export default useLocalDatabaseLoki;
