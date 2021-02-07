import {
  StableCoinBalances,
  SecretWalletCard,
  WalletSyncOverview,
} from "../../../src/views";

/**
 * @name SecretWalletPage
 */
const SecretWalletPage = () => {
  return (
    <>
      <div className="mb-5">
        <SecretWalletCard classNameContainer="card gradient-blue text-white flex justify-between p-10" />
      </div>
    </>
  );
};

export default SecretWalletPage;
