import { useMemo } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";

import stableCoins from "../../constants/stablecoins";
/**
 * @name FieldSelectStablecoin
 * @param {Object} props
 */
export const FieldSelectStablecoin = ({
  name,
  control,
  register,
  defaultCollateral,
  label,
  setValue,
  value,
  ...props
}) => {
  const selectedToken = useMemo(() => {
    if (value) {
      return stableCoins.filter((token) => token.address == value)[0];
    } else {
      return null;
    }
  }, [value]);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card w-sm p-10">
          <h3 className="text-2xl border-bottom pb-3 block w-full mb-5">
            <strong>Select Stablecoin</strong>
          </h3>
          {stableCoins.map((token) => (
            <Token
              {...token}
              setValue={setValue}
              fieldName={name}
              hideModal={hideModal}
            />
          ))}
        </div>
      </Modal>
    );
  }, []);

  // ActionHandler : Component
  return (
    <>
      {selectedToken ? (
        <TokenSelected showModal={showModal} {...selectedToken} />
      ) : (
        <button onClick={showModal} {...props} className="btn-indigo">
          {label}
        </button>
      )}
      <input hidden name={name} ref={register({ required: true })} />
    </>
  );
};

const TokenSelected = ({
  name,
  symbol,
  image,
  address,
  decimals,
  showModal,
}) => {
  return (
    <div
      onClick={showModal}
      className="flex items-center cursor-pointer p-4 rounded-lg bg-gray-100 hover:bg-gray-200 "
    >
      <span className="rounded-full bg-white shadow-md p-2">
        <img src={image} width={42} />
      </span>
      <div className="ml-2">
        <span className="block text-3xl font-black">{symbol}</span>
        <span className="block text-sm text-gray-400 font-normal">{name}</span>
      </div>
    </div>
  );
};

const Token = ({
  name,
  symbol,
  image,
  address,
  decimals,
  fieldName,
  setValue,
  hideModal,
}) => {
  const handleSetValue = () => {
    setValue(fieldName, address);
    hideModal();
  };

  return (
    <div
      onClick={handleSetValue}
      className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <img src={image} width={22} />
        <span className="ml-3">
          {name} ({symbol})
        </span>
      </div>
      <div>0.00</div>
    </div>
  );
};

FieldSelectStablecoin.defaultProps = {
  label: "Select Token",
};

export default FieldSelectStablecoin;
