import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./CreditTabs.module.css";
import { FormUniswapSwap } from "../forms";
import {
  FormAaveCreditDelegation,
  FormStableYieldCreditLineCreate,
} from "../forms";

import { CreditLineFactoryEvents } from "../views";

/**
 * @name CreditTabs
 * @descript Tab list of popular decentralized exchanges.
 */
export const CreditTabs = () => {
  return (
    <>
      <Tabs className="react-tabs h-full">
        <TabList className={styles.tabList}>
          <Tab className={styles.tabItem}>
            <span>Manage Credit</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Request Credit Line</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Issue Credit Line</span>
          </Tab>
        </TabList>

        <TabPanel>
          <div></div>
        </TabPanel>
        <TabPanel>
          <div className="py-10">
            <div className="flex">
              <div className="flex-1 pr-10">
                <h2 className="font-black text-3xl">Request Credit Line</h2>
                <p>
                  Cras nulla dolor, accumsan id blandit sit amet, elementum non
                  dui. Nunc sit amet nunc tempus orci molestie condimentum et eu
                  sem. Sed venenatis odio ac iaculis tincidunt. Morbi consequat
                  nibh ac vehicula pellentesque. Morbi ornare dolor vitae urna
                  laoreet elementum.
                </p>
                <h2 className="font-black text-xl mt-6">
                  Select Collateral Type &amp; Amount
                </h2>
                <p>
                  Cras nulla dolor, accumsan id blandit sit amet, elementum non
                  dui. Nunc sit amet nunc tempus orci molestie condimentum et eu
                  sem. Sed venenatis odio ac iaculis tincidunt. Morbi consequat
                  nibh ac vehicula pellentesque. Morbi ornare dolor vitae urna
                  laoreet elementum.
                </p>
                <h2 className="font-black text-xl mt-6">
                  Configure Credit Timeline
                </h2>
                <p>
                  Cras nulla dolor, accumsan id blandit sit amet, elementum non
                  dui. Nunc sit amet nunc tempus orci molestie condimentum et eu
                  sem. Sed venenatis odio ac iaculis tincidunt. Morbi consequat
                  nibh ac vehicula pellentesque. Morbi ornare dolor vitae urna
                  laoreet elementum.
                </p>
              </div>
              <div className="flex-1 pl-10">
                <FormStableYieldCreditLineCreate />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="py-10">
            <CreditLineFactoryEvents />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default CreditTabs;
