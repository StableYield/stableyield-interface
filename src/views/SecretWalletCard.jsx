/**
 * @name SecretWalletCard
 * @param {*} param0
 */
export const SecretWalletCard = ({ classNameContainer, ...props }) => {
  return (
    <div className={classNameContainer}>
      <div>
        <h3 className="text-4xl font-bold text-shadow-md">
          Start a Secret Wallet
        </h3>
        <p className="mt-0 p-0 font-light text-shadow-md">
          <span className="font-bold">Create an annoymous wallet.</span> Keep
          your transactions hidden from bad actors.
        </p>
      </div>
      <div className="flex items-center">
        <span>Learn More</span>
        <button className="btn-green ml-3">Annonymize Funds</button>
      </div>
    </div>
  );
};

SecretWalletCard.defaultProps = {
  classNameContainer:
    "card gradient-blue text-white flex justify-between p-6 mt-5",
};
