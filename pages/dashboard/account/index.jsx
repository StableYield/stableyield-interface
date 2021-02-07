import {
  WalletBalance,
  WalletBlockie,
  WalletAddress,
  WalletNonce,
  WalletDisconnect,
  WalletSyncDetails,
  WalletTransactionTable,
  AaveUserAccountData,
  StatisticBasic,
} from "../../../src/components";
import {
  StableCoinBalances,
  SecretWalletCard,
  WalletSyncOverview,
} from "../../../src/views";

const ExchangesPage = () => {
  return (
    <>
      <div>
        <AccountBasics />
      </div>
      <div className="my-10">
        <StableCoinBalances />
      </div>
      <WalletSyncOverview classNameContainer="gradient-blue text-white p-6 py-12 rounded-xl px-10 shadow-inner" />
      <div>
        <AaveUserAccountData />
      </div>
      <div className="mt-10">
        <WalletTransactionTable />
      </div>
    </>
  );
};

const AccountBasics = (props) => {
  return (
    <div className="grid grid-cols-4">
      <StatisticBasic label="Total Asset Value" value="4,500" />
    </div>
  );
};

export default ExchangesPage;
