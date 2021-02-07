import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "../styles.module.css";
import {
  FormStableYieldVaultDeposit,
  FormStableYieldVaultWithdraw,
  FormStableYieldVaultSwapCollateral,
  FormStableYieldVaultSubmitProposal,
  FormStableYieldVaultVoteOnProposal,
  FormStableYieldVaultProcessProposal,
  FormStableYieldBorrowCredit,
  FormStableYieldRepayCredit,
  FormStableYieldVaultSponsorProposal,
} from "../../../src/forms";
// import {
//   FormStableYieldVaultDeposit,
//   FormStableYieldVaultWithdraw,
//   FormStableYieldVaultSwapCollateral,
// } from "../../../src/forms";

import {
  StatisticBasic,
  StableYieldVaultShares,
  StableYieldVaultPricePerShare,
  StableYieldVaultBalance,
  ERC20Balance,
  StableYieldVaultCollateralBalance,
  StableYieldVaultColleralSwapsTable,
  StableYieldVaultUsersTable,
  StableYieldVaultVotesTable,
  StableYieldVaultProposalsTable,
  StableYieldVaultLoansTable,
  StableYieldVaultApprovedTokensTable,
  StableYieldVaultActiveToken,
  AaveTokenAPY,
  StableYieldCollateralSwapTable,
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
      <Tabs className="react-tabs h-full">
        <TabList className={styles.tabList}>
          <Tab className={styles.tabItem}>
            <span>Deposit/Withdraw</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Collateral Swap</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Shareholders</span>
          </Tab>
          <Tab className={styles.tabItem}>
            <span>Loan Management</span>
          </Tab>
        </TabList>
        <div className="my-3">
          <TabPanel>
            <TabOne />
          </TabPanel>
          <TabPanel>
            <TabSwap />
          </TabPanel>
          <TabPanel>
            <TabCommunity />
          </TabPanel>
          <TabPanel>
            <TabManagement />
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
};
export default VaultPage;

const TabOne = (props) => {
  return (
    <>
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
      <div className="flex items-center justify-between mb-4 card relative py-10">
        <div className="flex-1">
          <StableYieldVaultActiveToken />
        </div>
        <span className="absolute -top-3 -left-4 tag-green shadow-md border-2 border-solid border-white">
          <h1 className="text-sm">Active Lending Token</h1>
        </span>
      </div>
      <div className="max-w-screen-xl grid grid-cols-2 gap-x-10 gap-y-12 w-full mx-auto mt-8">
        <div className="card p-8 pt-12 relative">
          <span className="absolute -top-3 -left-4 tag-green shadow-md border-2 border-solid border-white">
            <h1 className="text-sm">Deposit Stablecoins &amp; Mint Shares</h1>
          </span>
          <FormStableYieldVaultDeposit />
        </div>

        <div className="card p-8 relative pt-12">
          <FormStableYieldVaultWithdraw />
          <span className="absolute -top-3 -right-4 tag-indigo shadow-md border-2 border-solid border-white">
            <h1 className="text-sm">Burn Shares &amp; Withdraw Profits</h1>
          </span>
        </div>
        <div className="relative col-span-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-4xl font-black">Approved Tokens</h3>
            <span className="text-sm font-light">
              The vault is limited to approved stabletokens.
            </span>
          </div>
          <StableYieldVaultApprovedTokensTable />
        </div>
      </div>
    </>
  );
};

/**
 * @name TabSwap
 * @param {*} props
 */
const TabSwap = (props) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 card relative py-10 mt-10">
        <div className="flex-1">
          <StableYieldVaultActiveToken />
        </div>
        <span className="absolute -top-3 -left-4 tag-green shadow-md border-2 border-solid border-white">
          <h1 className="text-sm">Active Collateral Token</h1>
        </span>
      </div>
      <div className="card p-8 relative pt-12 col-span-full mt-10">
        <span className="absolute flex justify-center -top-3 -left-3  w-max px-4 text-center mx-auto tag-orange shadow-md border-2 border-solid border-white">
          <span className="text-sm text-center">
            Swap Collateral Lending Position
          </span>
        </span>
        <FormStableYieldVaultSwapCollateral />
      </div>
      <div className="relative mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-4xl font-black">Collateral Swaps</h3>
          <span className="text-sm font-light">
            The vault is limited to approved stabletokens.
          </span>
        </div>
        <StableYieldVaultColleralSwapsTable />
      </div>
      <div>
        <StableYieldCollateralSwapTable />
      </div>
    </div>
  );
};

const TabManagement = (props) => {
  return (
    <>
      <div>
        <div>
          <StableYieldVaultProposalsTable />
        </div>

        <div className="mt-4">
          <StableYieldVaultVotesTable />
        </div>
        <div className="mt-4">
          <StableYieldVaultLoansTable />
        </div>
      </div>
      <div className="max-w-screen-xl grid grid-cols-2 gap-x-10 gap-y-12 w-full mx-auto mt-8">
        <div className="col-span-full">
          <div className="card">
            <FormStableYieldVaultSubmitProposal />
            <FormStableYieldVaultSponsorProposal />
            <FormStableYieldVaultVoteOnProposal />
            <FormStableYieldVaultProcessProposal />
            <h1>Borrow</h1>
            <FormStableYieldBorrowCredit />
            <h1>Repay</h1>
            <FormStableYieldRepayCredit />
          </div>
        </div>
      </div>
    </>
  );
};

const TabCommunity = (props) => {
  return (
    <div>
      <StableYieldVaultUsersTable />
    </div>
  );
};
