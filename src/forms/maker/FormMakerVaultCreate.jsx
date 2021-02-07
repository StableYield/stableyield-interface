import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useWeb3React } from "@web3-react/core";
import { ETH, DAI, USDC } from "@makerdao/dai-plugin-mcd";
import { useForm, Controller } from "react-hook-form";
import Select, { createFilter } from "react-select";
import contractAddress from "../../constants/contracts";
import {
  useContractBaseMakerDSProxyRegistry,
  useContractBaseMakerDSProxyActions,
} from "../../hooks/useContractsBase";
import { useContractDSProxy } from "../../hooks/useContractDSProxy";
import { useContractInterfaceMakerDSProxyActions } from "../../hooks/useContractsInterface";
import { useContractWETH } from "../../hooks";
import { transformDecimalsToWad } from "../../state/web3-react-system/lib/helpers";
import { TransactionModal } from "../../components";
import { constants, utils } from "ethers";

import { useMakerManager } from "../../constants/maker";

/**
 * @name FormMakerVaultCreate
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormMakerVaultCreate = ({ setSearchFilter, ...props }) => {
  // Component State
  const [proxy, proxySet] = useState(false);
  const [transaction, transactionSet] = useState();

  // Contract
  const { account } = useWeb3React();
  const proxyRegistry = useContractBaseMakerDSProxyRegistry(
    contractAddress.makerProxyRegistry
  );
  const { execute } = useContractDSProxy(proxy);

  useEffect(() => {
    if (proxyRegistry && account) {
      (async () => {
        const proxyCheck = await proxyRegistry.proxies(account);
        if (proxyCheck !== constants.AddressZero) {
          proxySet(proxyCheck);
        }
      })();
    }
  }, [proxyRegistry, account]);

  const { makerManager } = useMakerManager();
  const [vault, vaultSet] = useState();

  // Form
  console.log(makerManager, "makerManager");
  const { handleSubmit, control, register } = useForm();
  const onSubmit = async (values) => {
    if (makerManager) {
      let transaction;
      if (values.deposit && !values.withdraw) {
        const transaction = await makerManager.openLockAndDraw(
          values.collateral.value,
          USDC(values.deposit),
          DAI(0)
        );
      } else if (values.deposit && values.withdraw) {
        let GemType;
        switch (values.collateral.value) {
          case "ETH-A":
            GemType = ETH;
            break;
          case "ETH-B":
            GemType = ETH;
            break;
          case "USDC-A":
            GemType = USDC;
            break;
          case "USDC-B":
            GemType = USDC;
            break;

          default:
            break;
        }

        const transaction = await makerManager.openLockAndDraw(
          values.collateral.value,
          GemType(values.deposit),
          DAI(values.withdraw)
        );
      } else {
        const transaction = await makerManager.open(values.collateral.value);
      }
    }
  };

  const assetOptions = [
    {
      value: "ETH-A",
      label: "ETH-A",
    },
    {
      value: "ETH-B",
      label: "ETH-B",
    },
    {
      value: "USDC-A",
      label: "USDC-A",
    },
    {
      value: "USDC-B",
      label: "USDC-B",
    },
  ];

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={"w-full"}
          name="collateral"
          control={control}
          defaultValue={assetOptions[0]}
          placeholder="Select Collateral Type"
          options={assetOptions}
          as={Select}
        />
        <input
          className="input-default mt-3"
          name="deposit"
          placeholder="Deposit Amount"
          ref={register({ required: true })}
        />
        <input
          className="input-default mt-3"
          name="withdraw"
          placeholder="Withdraw"
          ref={register({ required: true })}
        />
        <button className="btn-indigo w-full mt-3">{props.label}</button>
      </form>
      {/* {transaction && (
        <TransactionModal isConnected={address} transaction={execute} />
      )} */}
    </>
  );
};

FormMakerVaultCreate.defaultProps = {
  label: "Create Vault",
  sx: {},
};

FormMakerVaultCreate.propTypes = {
  sx: PropTypes.object,
};

export default FormMakerVaultCreate;
