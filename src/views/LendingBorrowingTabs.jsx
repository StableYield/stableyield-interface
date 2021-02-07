import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./ExchangesTabs.module.css";
import { FormUniswapSwap } from "../forms";
/**
 * @name LendingBorrowingTabs
 * @descript Tab list of popular decentralized exchanges.
 */
export const LendingBorrowingTabs = () => {
  return (
    <>
      <Tabs className="react-tabs h-full">
        <TabList className={styles.tabList}>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/aave.svg"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>Aave</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/compound.svg"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>Compound</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/maker.svg"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>Maker</span>
          </Tab>
        </TabList>

        <TabPanel>
          <PannelInner>
            <FormUniswapSwap />
          </PannelInner>
        </TabPanel>
        <TabPanel>
          <PannelInner>
            <h1>COmpound</h1>
          </PannelInner>
        </TabPanel>
        <TabPanel>
          <PannelInner>
            <FormUniswapSwap />
          </PannelInner>
        </TabPanel>
      </Tabs>
    </>
  );
};

const PannelInner = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-gray-100 via-gray-100 to-gray-100 py-10 overflow-hidden w-full relative overflow-hidden">
      <div className="bg-right bg-opacity-25 bg-no-repeat bg-contain absolute top-0 bottom-20 -right-20 left-0 opacity-20 z-0" />
      <div className="w-full max-w-screen-sm xl:-mt-52 z-10">
        <div className="bg-white rounded-3xl border-white border-solid border-2 shadow-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LendingBorrowingTabs;
