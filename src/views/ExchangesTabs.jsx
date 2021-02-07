import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./ExchangesTabs.module.css";
import { FormUniswapSwap } from "../forms";
/**
 * @name ExchangesTabs
 * @descript Tab list of popular decentralized exchanges.
 */
export const ExchangesTabs = () => {
  return (
    <>
      <Tabs className="react-tabs h-full">
        <TabList className={styles.tabList}>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/uniswap.png"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>Uniswap</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/curve.svg"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>Curve</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/1inch.jpg"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>1Inch</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <img
              src="/dapps/kyber.svg"
              className={styles.tabItem_icon}
              width={28}
            />
            <span>Kyber</span>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-gray-100 via-gray-100 to-gray-100 py-10 overflow-hidden w-full relative overflow-hidden">
            <div className="bg-uni-token bg-right bg-opacity-25 bg-no-repeat bg-contain absolute top-0 bottom-20 -right-20 left-0 opacity-20 z-0" />
            <div className="w-full max-w-screen-sm xl:-mt-52 z-10">
              <div className="bg-white rounded-3xl border-white border-solid border-2 shadow-xl p-8">
                <FormUniswapSwap />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ExchangesTabs;
