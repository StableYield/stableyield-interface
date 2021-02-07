/**
 * @name ArticleGettingStarted
 * @param {Object} props
 */
export const ArticleGettingStarted = (props) => {
  return (
    <div className="">
      <h3 className="text-5xl font-black">How It Works</h3>
      <p className="text-lg text-gray-600 font-bold">
        StableYield enables users to easily earn interest lending popular
        stablecoins.
      </p>
      <p>
        <em>A gateway to leading decentralized finance applications.</em> Built
        on top applications the enable personal loans, lending/borrowing and
        swaps between stablecoins.
      </p>
      <div className="card my-10 p-10">
        <img src="/dapps/maker.svg" width={48} className="mt-5" />
        <h3 className="text-2xl font-black mt-0">
          Stablecoin Loans - <span className="font-normal">MakerDAO Vault</span>
        </h3>
        <span className="block my-3">
          <strong>Reference:</strong>{" "}
          <a href="http://makerdao.com/" target="_blank">
            http://makerdao.com
          </a>
        </span>
        <p>
          Maker enables Ethereum users to deposit ETH and withdraw stablecoins,
          specifical the stabletoken called DAI. The ETH can later be withdrawn
          by simply DAI back into the vault.
        </p>
        <ul className="list">
          <li>Keep Exposure to ETH</li>
          <li>Generate Stablecoins</li>
          <li>Manage Personal Loan</li>
        </ul>
        <p>
          This approach is a great for users who to keep exposure to ETH (not
          selling/trading), while also generating a stablecoin to use for
          lending or other usecases.
        </p>
      </div>
      <div className="card my-10 p-10">
        <img src="/dapps/aave.svg" width={48} className="mt-5" />
        <h3 className="text-2xl font-black">
          Lending/Borrowing - <span className="font-normal">Aave</span>
        </h3>
        <span className="block my-3">
          <strong>Reference:</strong>{" "}
          <a href="http://aave.com/" target="_blank">
            http://aave.com
          </a>
        </span>
        <p>
          Praesent condimentum mi sed ullamcorper viverra. Praesent tempor metus
          in fermentum consectetur. Maecenas finibus imperdiet ligula vel
          sagittis. Proin pretium turpis a sem faucibus ornare. Aliquam egestas
          sem sed imperdiet consectetur. Sed consectetur fringilla cursus.
          Vestibulum a eros nunc. Aliquam in sagittis nunc, nec mattis diam.
        </p>
      </div>
      <div className="card my-10 p-10">
        <img src="/dapps/curve.svg" width={48} className="mt-5" />
        <h3 className="text-2xl font-black">
          Decentralized Exchange - <span className="font-normal">Curve</span>
        </h3>
        <span className="block my-3">
          <strong>Reference:</strong>{" "}
          <a href="http://curve.fi/" target="_blank">
            http://curve.fi
          </a>
        </span>
        <p>
          Praesent condimentum mi sed ullamcorper viverra. Praesent tempor metus
          in fermentum consectetur. Maecenas finibus imperdiet ligula vel
          sagittis. Proin pretium turpis a sem faucibus ornare. Aliquam egestas
          sem sed imperdiet consectetur. Sed consectetur fringilla cursus.
          Vestibulum a eros nunc. Aliquam in sagittis nunc, nec mattis diam.
        </p>
      </div>
    </div>
  );
};
export default ArticleGettingStarted;
