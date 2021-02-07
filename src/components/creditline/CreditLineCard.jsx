import idx from "idx";
import { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";

import { useContractCreditLineERC721 } from "../../hooks";
import { useContractCreditLineFactory } from "../../hooks/stableyield/useContractCreditLineFactory";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { commifyTokenBalance } from "../../helpers/blockchain";
import contracts from "../../constants/contracts";

import {
  Address,
  TokenBalance,
  AaveApproveCreditDelegationButton,
  CreditLineActivateButton,
  ERC721ApproveAmountButton,
  CreditLineBorrowButton,
  CreditLineRepayButton,
  ERC20UnlockTransferFrom,
  ERC20Name,
} from "../../components";

/**
 * @name CreditLineCard
 * @param {Object} props
 */
export const CreditLineCard = (props) => {
  const creditLineERC721 = useContractCreditLineERC721(props._manager);

  const debt = creditLineERC721.creditWithdrawn();

  useEffect(() => {
    (async () => {
      // const debt = creditLineERC721.creditWithdrawn();
    })();
  }, [creditLineERC721]);

  return (
    <div className="card">
      <div className="flex items-center justify-between border-bottom pb-4 mb-0">
        <div>
          <Address
            address={props._borrower}
            decimals={0}
            trim={10}
            isLink
            className="text-xl font-normal block"
          />
          <span className="font-black text-gray-500 text-sm">Borrower</span>
        </div>
        <div className="flex self-end">
          <div className="text-center">
            <span className="text-xl block">
              {debt.isSuccess ? commifyTokenBalance(debt.data) : "0.00"}
            </span>
            <span className="font-bold text-gray-500 text-sm">
              Borrower Debt
            </span>
          </div>
          <div className="ml-4 text-center">
            <span className="text-xl block">
              {props._interestRateMode.eq(1) ? "Stable" : "Variable"}
            </span>
            <span className="font-bold text-gray-500 text-sm">
              Interest Rate Mode
            </span>
          </div>
          <div className="ml-4 text-center">
            <span className="text-xl block">
              {props._type == 1 && <span>ERC20</span>}
              {props._type == 2 && <span>ERC721</span>}
              {props._type == 3 && <span>ERC1155</span>}
            </span>
            <span className="font-bold text-gray-500 text-sm">
              Collateral Type
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-evenly">
          <div className="flex-1 text-center hover:bg-gray-100 py-10">
            <ERC20Name className="text-3xl" address={props._assetToDeposit} />
            <div className="text-center">
              {props._type == 1 && (
                <span>
                  Collateral Amount:{" "}
                  <TokenBalance balance={props._amountToDeposit} decimals={0} />
                </span>
              )}
              {props._type == 2 && (
                <span>
                  <span className="font-bold mr-2">ID:</span>{" "}
                  <span>{props._amountToDeposit.toString()}</span>
                </span>
              )}
            </div>
            <div>Depositing</div>
          </div>
          <div className="text-center flex-1  hover:bg-gray-100 py-10">
            <ERC20Name className="text-3xl" address={props._assetToBorrow} />
            <div className="flex w-full justify-center text-center">
              <span className="font-bold mr-2">Allowance:</span>{" "}
              <TokenBalance balance={props._amountToBorrow} />
            </div>
            <div>Borrowing</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-3 text-center flex-1">
          <h1 className="font-black mb-3">Borrower Actions</h1>
          <ERC721ApproveAmountButton
            className="btn-green btn-sm"
            label="Approve Collateral"
            address={props._assetToDeposit}
            approveTo={props._manager}
            approveId={props._amountToDeposit}
          />
          <CreditLineBorrowButton
            className="btn-orange ml-2"
            label="Borrow"
            manager={props._manager}
            amount={props._amountToBorrow}
          />

          <ERC20UnlockTransferFrom
            address={props._assetToBorrow}
            label="Repay"
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
        <div className="mt-3 text-center flex-1">
          <h1 className="font-black mb-3">Lender Actions</h1>
          <AaveApproveCreditDelegationButton
            debtType={props._interestRateMode.eq(1) ? "stable" : "variable"}
            label="Delegate Credit"
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
    </div>
  );
};
export default CreditLineCard;
