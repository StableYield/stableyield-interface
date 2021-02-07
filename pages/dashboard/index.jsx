import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./styles.module.css";
import {
  WalletBalance,
  WalletBlockie,
  WalletAddress,
  WalletNonce,
  WalletDisconnect,
  WalletSyncDetails,
  WalletTransactionTable,
  ERC20Balance,
  StatisticBasic,
  WalletTokenBalancesTable,
} from "../../src/components";
import {
  AaveUserAccountData,
  MakerUserAccountData,
  CurveUserAccountData,
  StableCoinBalances,
  SecretWalletCard,
  DecentralizedApplicationProgress,
  PurchaseEthOrGenerateStablecoin,
  AccountTabs,
} from "../../src/views";
// import { PurchaseEthOrGenerateStablecoin } from "../../../src/views";
import tokens from "../../src/constants/tokens";

const AccountDashboardPage = () => {
  return (
    <>
      <Tabs className="react-tabs h-full">
        <TabList className={styles.tabList}>
          <Tab className={styles.tabItem}>
            <span>Overview</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Tokens</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Collectibles</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>DeFi Progress</span>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="my-5">
            <PurchaseEthOrGenerateStablecoin />
          </div>
          <div className="my-5">
            <AccountBasics />
          </div>
          <div className="flex pt-5">
            <div className="flex flex-col justify-between flex-6 pl-7 order-2">
              <MakerUserAccountData
                label="Maker Account"
                classNameContainer="card p-8 mb-6"
                classItemContainer="flex-col"
                classNameLabel="text-indigio-500"
                classNameValue="text-gray-500"
              />
              <AaveUserAccountData
                label="Aave Account"
                classNameContainer="card p-8 mb-6"
                classItemContainer="flex-col"
                classNameLabel="text-indigio-500"
                classNameValue="text-gray-500"
              />
              <CurveUserAccountData
                label="Curve Account"
                classNameContainer="card p-8"
                classItemContainer="flex-col"
                classNameLabel="text-indigio-500"
                classNameValue="text-gray-500"
              />
            </div>
            <div className="flex-2 card p-5 bg-white order-1">
              <div className="border-bottom pb-3">
                <WalletDetails />
              </div>
              <TokenBalances />
            </div>
          </div>
        </TabPanel>

        {/* Panel 2 */}
        <TabPanel>
          <div className="mt-10">
            <DecentralizedApplicationProgress />
          </div>
        </TabPanel>
        {/* Panel 3 */}
        <TabPanel>
          <div className="my-10">
            <WalletTokenBalancesTable />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

const AccountBasics = (props) => {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <StatisticBasic
        classNameContainer="card p-6"
        label="Total Asset Value"
        value="$15,330"
        valueTag="USD"
      />
      <StatisticBasic
        classNameContainer="card p-6"
        label="Total Stablecoin Value"
        value="$1,500"
        valueTag="USD"
      />
      <StatisticBasic
        classNameContainer="card p-6"
        label="Total Debt"
        value="$4,500"
        valueTag="USD"
      />
      <StatisticBasic
        classNameContainer="card p-6"
        label="Total Deposited"
        value="$1,500"
        valueTag="USD"
      />
    </div>
  );
};

const WalletDetails = (props) => {
  return (
    <div className="flex items-center">
      <WalletBlockie
        width={34}
        className="rounded-full mr-4 border-white border-solid border-2 shadow-md"
      />
      <div>
        <WalletAddress className="block text-xl" trim={9} />
        {/* <div className="flex text-md items-center">
          <span className="flex text-md items-center">
            <strong>ETH:</strong>{" "}
            <WalletBalance className="block ml-2" decimals={7} />
          </span>
        </div> */}
      </div>
    </div>
  );
};

const TokenBalances = (props) => {
  return (
    <div>
      <TokenBalanceCard
        address={tokens.tokenDAI}
        name="Wrapped Ether"
        symbol="WETH"
        image="/tokens/weth.png"
      />
      <TokenBalanceCard
        address={tokens.tokenDAI}
        name="DAI Coin"
        symbol="DAI"
        image="/tokens/dai.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenUSDC}
        name="USD Coin"
        symbol="USDC"
        image="/tokens/usdc.svg"
      />
      <TokenBalanceCard
        primary
        address={tokens.tokenBUSD}
        name="Binance USD"
        symbol="BUSD"
        image="/tokens/busd.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenSUSD}
        apy="10.3"
        name="sUSD"
        symbol="sUSD"
        image="/tokens/susd.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenUSDT}
        apy="6.3"
        name="USDT Coin"
        symbol="USDT"
        image="/tokens/usdt.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenTUSD}
        apy="6.3"
        name="True USD"
        symbol="TUSD"
        image="/tokens/tusd.svg"
      />
      <div className="text-center border-top pt-3">
        <span className="cursor-pointer text-sm text-gray-700 font-bold">
          Stablecoin Balances
        </span>
      </div>
    </div>
  );
};

const TokenBalanceCard = ({ address, name, symbol, image, className }) => {
  return (
    <div className={`flex justify-between items-center my-3`}>
      <div className={`flex items-center inline-flex`}>
        <img src={image} width={18} className="self-center" />
        <span className="ml-2 text-md">{symbol}</span>
      </div>
      <ERC20Balance address={address} className="text-lg" />
    </div>
  );
};

export default AccountDashboardPage;
