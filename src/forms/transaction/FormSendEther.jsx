import { useState } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useModal } from "react-modal-hook";

import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { useContractERC20 } from "../../hooks";
import { transformDecimalsToWad } from "../../state/web3-react-system/lib/helpers";
import { Modal, TransactionModal } from "../../components";

const QRReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

/**
 * @name FormSendEther
 * @description
 * @version 0.0.1
 */

export const FormSendEther = ({ setSearchFilter, ...props }) => {
  const { handleSubmit, register, watch, setValue, errors, reset } = useForm();
  const { account, library } = useWeb3React();
  const onSubmit = async (values) => {
    const signer = await library.getSigner();
    const tx = await signer.provider.send("eth_sendTransaction", [
      {
        from: account,
        to: values.to,
        value: transformDecimalsToWad(values.amount).toHexString(),
      },
    ]);
  };

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card p-8">
          <QRReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />
        </div>
      </Modal>
    );
  }, []);

  const handleToggleQRScanner = () => showModal();
  const handleScan = (data) => {
    if (data) {
      setValue("to", data.substring(9));
      hideModal();
    }
  };
  const handleError = (data) => {
    console.log(data, "QRReader");
  };

  return (
    <>
      <form
        className={"form-horizontal w-full"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="inline input-default">
          <input
            className=" input-address"
            name="to"
            placeholder="Receiver (0x....)"
            ref={register({ required: false })}
            errors={errors}
          />
          <span
            className="cursor-pointer border-l-2 border-solid border-gray-200 ml-3 pl-3"
            onClick={handleToggleQRScanner}
          >
            Scan QR
          </span>
        </div>
        <input
          className="input-default ml-3"
          name="amount"
          placeholder="Amount"
          ref={register({ required: false })}
          errors={errors}
        />
        <button
          className={"btn-indigo ml-3"}
          sx={{
            boxShadow: 2,
            borderRadius: "0 6px 6px 0",
            fontFamily: "gaming",
            fontWeight: 700,
            height: 55,
            fontSize: [2],
            textShadow: "2px 2px 3px rgba(0,0,0,0.2)",
            flex: 1,
            p: 3,
          }}
        >
          {props.label}
        </button>
        <span onClick={reset} className={"btn-reset ml-3"}>
          Reset Form
        </span>
      </form>
      {/* <TransactionModal transaction={transfer} /> */}
    </>
  );
};

FormSendEther.defaultProps = {
  label: "Send Token",
  sx: {},
};

FormSendEther.propTypes = {
  sx: PropTypes.object,
};

export default FormSendEther;
