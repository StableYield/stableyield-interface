import idx from "idx";
/**
 * @name TransactionButton
 * @param {String} label
 * @param {Object} object
 */
export const TransactionButton = ({
  label,
  classNameDisabled,
  labelDisconnected,
  labelSigner,
  transaction,
  isConnected,
  isSigner,
  ...props
}) => {
  if (!isConnected) {
    return (
      <button className={`btn-disabled ${classNameDisabled}`}>
        {labelDisconnected}
      </button>
    );
  }
  if (isConnected && !isSigner) {
    return (
      <button className={`btn-disabled ${classNameDisabled}`}>
        {labelSigner}
      </button>
    );
  }

  return (
    <button {...props}>
      {idx(transaction, (_) => _.isRequesting) && (
        <span className="flex items-center">
          <span>
            <LoadingIcon />
          </span>
          <span className="text-sm ml-2">Requesting Signature</span>
        </span>
      )}
      {!idx(transaction, (_) => _.isActive) && label}
    </button>
  );
};

TransactionButton.defaultProps = {
  label: "Send",
  labelDisconnected: "Contract Unavailable",
  labelSigner: "Connect Wallet",
};

const LoadingIcon = (props) => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFF"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="#FFF"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="#FFF"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
