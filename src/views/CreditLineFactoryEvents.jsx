import { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";

import { useContractCreditLineFactory } from "../hooks/stableyield/useContractCreditLineFactory";
import { useContractERC20 } from "../hooks/useContractERC20";
import { transformDecimalsToWad } from "../helpers/blockchain";
import contracts from "../constants/contracts";
import idx from "idx";
import { utils } from "ethers";
import {
  Address,
  TokenBalance,
  AaveApproveCreditDelegationButton,
  CreditLineActivateButton,
  ERC721ApproveAmountButton,
  CreditLineBorrowButton,
  CreditLineRepayButton,
  ERC20UnlockTransferFrom,
  CreditLineCard,
} from "../components";

/**
 * @name CreditLineFactoryEvents
 * @param {Object} props
 */
export const CreditLineFactoryEvents = (props) => {
  const [creditLines, creditLinesSet] = useState();
  const { library } = useWeb3React();

  const { contract } = useContractCreditLineFactory(
    contracts.stableYieldCreditLineFactory
  );

  useEffect(() => {
    if (contract) {
      (async () => {
        const topicFilter = contract.filters.CreditLineCreated();
        topicFilter.fromBlock = 11707028;
        const logs = await contract.provider.getLogs(topicFilter);
        console.log(logs, "logs");
        const events = logs.map((event) => {
          const parseLog = contract.interface.parseLog(event);
          return parseLog.args;
        });
        creditLinesSet(events);
        console.log(events, "events");
      })();
    }
  }, [contract]);

  return useMemo(() => {
    if (creditLines) {
      return (
        <div className="">
          {creditLines.map((creditLine) => (
            <CreditLineCard {...creditLine} />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }, [creditLines]);
};

const CreditLineRequest = (props) => {
  return (
    <div className="card">
      <div>
        <span className="font-black">Collateral Type:</span>
        {props._type == 1 && <span>ERC20 Collateral</span>}
        {props._type == 2 && <span>ERC721 Collateral</span>}
        {props._type == 3 && <span>ERC1155 Collateral</span>}
      </div>
      <span>
        Interested Rate Mode:{" "}
        {props._interestRateMode.eq(1) ? "stable" : "variable"}
      </span>
      <div>
        <span>
          Borrower: <Address address={props._borrower} decimals={0} />
        </span>
      </div>
      <div>
        <div className="flex">
          Amount to Deposit:{" "}
          <TokenBalance balance={props._amountToDeposit} decimals={0} />
        </div>
        <div className="flex">Asset to Borrow: {props._assetToBorrow} </div>
        <div className="flex">
          Amount to Borrow: <TokenBalance balance={props._amountToBorrow} />
        </div>
      </div>
      <div className="mt-3">
        <h1>Borrower Actions</h1>
        <ERC721ApproveAmountButton
          className="btn-green"
          address={props._assetToDeposit}
          approveTo={props._manager}
          approveId={props._amountToDeposit}
        />
        <CreditLineBorrowButton
          className="btn-orange ml-2"
          manager={props._manager}
          amount={props._amountToBorrow}
        />

        <ERC20UnlockTransferFrom
          address={props._assetToBorrow}
          allowanceOf={props._manager}
          label="Unlock Debt Repayment"
          className="w-content"
        >
          <CreditLineRepayButton
            className="btn-indigo ml-2"
            manager={props._manager}
            amount={props._amountToBorrow}
          />
        </ERC20UnlockTransferFrom>
      </div>
      <div className="mt-3">
        <h1>Lender Actions</h1>
        <AaveApproveCreditDelegationButton
          debtType={props._interestRateMode.eq(1) ? "stable" : "variable"}
          className="btn-indigo"
          assetCollateral={props._assetToBorrow}
          delegatee={props._manager}
          delegationAmount={props._amountToBorrow}
        />
        <CreditLineActivateButton
          className="btn-green ml-3"
          manager={props._manager}
        />
      </div>
    </div>
  );
};

export default CreditLineFactoryEvents;
