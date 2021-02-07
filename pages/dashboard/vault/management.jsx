import {
  FormStableYieldVaultDeposit,
  FormStableYieldVaultWithdraw,
  FormStableYieldVaultSwapCollateral,
  FormStableYieldVaultSubmitProposal,
  FormStableYieldVaultVoteOnProposal,
  FormStableYieldVaultProcessProposal,
  FormStableYieldBorrowCredit,
  FormStableYieldRepayCredit,
} from "../../../src/forms";

import {
  StatisticBasic,
  StableYieldVaultShares,
  StableYieldVaultPricePerShare,
  StableYieldVaultBalance,
  ERC20Balance,
  StableYieldVaultCollateralBalance,
  StableYieldVaultColleralSwapsTable,
  StableYieldVaultUsersTable,
} from "../../../src/components";

import contracts from "../../../src/constants/contracts";
import Link from "next/link";

/**
 * @name VaultPage
 * @param {Object} props
 */
export const VaultPage = (props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{" "}
          &gt; <strong>StableYield Vault</strong>
        </span>
        <Link href="/article/stableyield-vault">
          <a className="text-sm font-normal px-3 tag-white hover:shadow-md">
            Learn More
          </a>
        </Link>
      </div>
      {/* <h1 className="text-4xl mb-4">StableYield Vault</h1> */}
      <div className="grid grid-cols-4 gap-x-4 mb-6">
        <StatisticBasic
          classNameContainer="card p-6"
          label="Your Shares"
          value={<StableYieldVaultShares />}
        />
        <StatisticBasic
          classNameContainer="card p-6"
          classNameValue="text-sm"
          label="Price per Share"
          value={<StableYieldVaultPricePerShare />}
        />
        <StatisticBasic
          classNameContainer="card p-6"
          label="Total Shares"
          value={<StableYieldVaultBalance />}
        />
        <StatisticBasic
          classNameContainer="card p-6"
          label="Vault Balance"
          value={
            <StableYieldVaultCollateralBalance
              user={contracts.stableYieldVault}
              address={"0x101cc05f4a51c0319f570d5e146a8c625198e636"}
            />
          }
        />
      </div>
      <div className="max-w-screen-xl grid grid-cols-2 gap-x-10 gap-y-12 w-full mx-auto mt-8">
        <div className="col-span-full">
          <div className="card">
            <FormStableYieldVaultSubmitProposal />
            <FormStableYieldVaultVoteOnProposal />
            <FormStableYieldVaultProcessProposal />
            <h1>Borrow</h1>
            <FormStableYieldBorrowCredit />
            <h1>Repay</h1>
            <FormStableYieldRepayCredit />
          </div>
        </div>
        <div className="card p-8 relative pt-12 col-span-full">
          <span className="absolute flex justify-center -top-3 left-0 right-0 w-max px-4 text-center mx-auto tag-orange shadow-md border-2 border-solid border-white">
            <span className="text-sm text-center">
              Swap Collateral Lending Position
            </span>
          </span>
          <FormStableYieldVaultSwapCollateral />
        </div>
        <div className="col-span-full">
          <div className=" bg-white ">
            <StableYieldVaultColleralSwapsTable />
          </div>
        </div>
      </div>
    </>
  );
};
export default VaultPage;

{
  /* 
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-black">Automatic Collateral Swaps</h3>
          <p>
            Cras ut dolor id nulla pellentesque tincidunt id ac lectus. Interdum
            et malesuada fames ac ante ipsum primis in faucibus. Nam et felis
            sodales nunc molestie pulvinar. Aenean mollis est non euismod
            malesuada.
          </p>
          <p>
            Nam et felis sodales nunc molestie pulvinar. Aenean mollis est non
            euismod malesuada.
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-black">
            Deposit Shares &amp; Withdraw Returns{" "}
          </h3>
          <p>
            Cras ut dolor id nulla pellentesque tincidunt id ac lectus. Interdum
            et malesuada fames ac ante ipsum primis in faucibus. Nam et felis
            sodales nunc molestie pulvinar. Aenean mollis est non euismod
            malesuada.
          </p>
          <p>
            Nam et felis sodales nunc molestie pulvinar. Aenean mollis est non
            euismod malesuada.
          </p>
        </div> */
}
