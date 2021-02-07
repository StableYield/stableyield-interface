/**
 * @name  DecentralizedApplicationProgress
 * @param {Object} props
 */
export const DecentralizedApplicationProgress = (props) => {
  return (
    <div className={"flex flex-col"}>
      <ApplicationMaker
        value={"$5,624"}
        label="1Inch Value Swapped"
        image={
          "https://tokens.1inch.exchange/0xd533a949740bb3306d119cc777fa900ba034cd52.png"
        }
      />
      <ApplicationAave
        value={"$2,898"}
        label="Uniswap Value Swapped"
        image={
          "https://raw.githubusercontent.com/trustwallet/tokens/master/dapps/uniswap.io.png"
        }
      />
      <ApplicationCurve
        value={"$0.00"}
        label="Curve Value Swapped"
        image={
          "https://tokens.1inch.exchange/0x111111111117dc0aa78b770fa6a738034120c302.png"
        }
      />
    </div>
  );
};

const ApplicationMaker = ({ label, value, image }) => {
  return (
    <div className={"flex card mb-5 p-6"}>
      <div className="flex-5 pr-4 p-6">
        <img
          src={"/dapps/maker.svg"}
          className={"styles.statisticLabelImage"}
          width={64}
        />
        <h3 className={"text-4xl mt-4"}>
          Maker <span className="font-thin">(Stablecoin Minting)</span>{" "}
        </h3>
        <p>
          Nam porttitor arcu a ante tristique, a tincidunt velit tempus. Cras
          elit ipsum, luctus a nisi id, finibus luctus quam. Nulla auctor eros a
          vestibulum mollis. Suspendisse posuere vulputate lobortis.
        </p>
      </div>
      <div className="flex-4 flex-col flex-center border-solid border-gray-300 border-l-2">
        <span className="text-4xl text-gray-500">0%</span>

        <div className="flex items-center justify-center text-center mt-5 w-3/4">
          <span className="flex-1 mx-3 text-sm">1. Open Vault</span>
          <span className="mx-3 flex-1 text-sm">2. Deposit</span>
          <span className="mx-3 flex-1 text-sm">3. Withdraw</span>
        </div>
      </div>
    </div>
  );
};

const ApplicationAave = ({ label, value, image }) => {
  return (
    <div className={"flex card mb-5 p-6"}>
      <div className="flex-5 pr-4 p-6">
        <img
          src={"/dapps/aave.svg"}
          className={"styles.statisticLabelImage"}
          width={64}
        />
        <h3 className={"text-4xl mt-4"}>Aave (Lending/Borrowing)</h3>
        <p>
          Nam porttitor arcu a ante tristique, a tincidunt velit tempus. Cras
          elit ipsum, luctus a nisi id, finibus luctus quam. Nulla auctor eros a
          vestibulum mollis. Suspendisse posuere vulputate lobortis.
        </p>
      </div>
      <div className="flex-4 flex-col flex-center border-solid border-gray-300 border-l-2">
        <span className="text-4xl text-gray-500">0%</span>

        <div className="flex items-center justify-center text-center mt-5 w-3/4">
          <span className="flex-1 mx-3 text-sm">1. Open Vault</span>
          <span className="mx-3 flex-1 text-sm">2. Deposit</span>
          <span className="mx-3 flex-1 text-sm">3. Withdraw</span>
        </div>
      </div>
    </div>
  );
};

const ApplicationCurve = ({ label, value, image }) => {
  return (
    <div className={"flex card mb-5 p-6"}>
      <div className="flex-5 pr-4 p-6">
        <img
          src={"/dapps/curve.svg"}
          className={"styles.statisticLabelImage"}
          width={64}
        />
        <h3 className={"text-4xl mt-4"}>Curve (Low-Slippage Exchange)</h3>
        <p>
          Nam porttitor arcu a ante tristique, a tincidunt velit tempus. Cras
          elit ipsum, luctus a nisi id, finibus luctus quam. Nulla auctor eros a
          vestibulum mollis. Suspendisse posuere vulputate lobortis.
        </p>
      </div>
      <div className="flex-4 flex-col flex-center border-solid border-gray-300 border-l-2">
        <span className="text-4xl text-gray-500">0%</span>

        <div className="flex items-center justify-center text-center mt-5 w-3/4">
          <span className="flex-1 mx-3 text-sm">1. Open Vault</span>
          <span className="mx-3 flex-1 text-sm">2. Deposit</span>
          <span className="mx-3 flex-1 text-sm">3. Withdraw</span>
        </div>
      </div>
    </div>
  );
};

export default DecentralizedApplicationProgress;
