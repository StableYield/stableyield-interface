import {
  WalletBalance,
  WalletBlockie,
  WalletAddress,
  WalletNonce,
  WalletDisconnect,
  WalletSyncDetails,
  WalletTransactionTable,
} from "../components";

/**
 * @name WalletSyncOverview
 * @param {Object} props
 */
export const WalletSyncOverview = ({ classNameContainer, ...props }) => {
  return (
    <div className={classNameContainer}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <WalletBlockie
            width={52}
            className="rounded-full mr-4 border-white border-solid border-2 shadow-md"
          />
          <div>
            <WalletAddress
              className="block text-2xl text-shadow-md"
              trim={10}
            />
            <div className="flex text-md items-center text-shadow-md">
              <span className="flex text-md items-center">
                <strong>ETH:</strong>{" "}
                <WalletBalance className="block ml-2" decimals={7} />
              </span>
              <span className="ml-4">
                <strong>Nonce:</strong> <WalletNonce />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <WalletSyncDetails className="mr-4" />
        </div>
      </div>
    </div>
  );
};

WalletSyncOverview.defultProps = {
  classNameContainer:
    "bg-blue-700 gradient-blue text-white p-6 py-12 rounded-xl px-10 shadow-inner",
};

export default WalletSyncOverview;
