import idx from "idx";
import { useMemo, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Select, { createFilter } from "react-select";
import { useForm, Controller } from "react-hook-form";
import styles from "./FormSettingsTokenList.module.css";
import tokenListData from "../../data/tokenList";
import { useTokenList } from "../../state/web3-react-system";
import useWeb3SystemContext from "../../state/web3-react-system/useContext";

/**
 * @name FormSettingsTokenList
 * @description
 * @version 0.0.1
 */

export const FormSettingsTokenList = ({ ...props }) => {
  const [activeTokenList, setActiveTokenList] = useState([]);
  const { handleSubmit, control, errors, reset } = useForm();
  const { tokenList } = useWeb3SystemContext();
  const tokenListManager = useTokenList();
  useEffect(() => {
    (async () => {
      const tokens = await tokenListManager.retrieve();
      if (tokens && tokens.length > 0) {
        const list = tokens.map((token) => {
          return {
            value: token.address,
            filter: `${token.symbol} (${token.name})`,
            label: (
              <div className="flex items-center">
                <span className="mr-3">
                  <img src={token.logoURI} width={18} />
                </span>
                {`${token.symbol} (${token.name})`}
              </div>
            ),
          };
        });
        setActiveTokenList(list);
      }
    })();
    return [];
  }, [idx(tokenList, (_) => _.name)]);

  const filterConfig = (inputValue, label) => {
    return inputValue.data.filter.toLowerCase().includes(label.toLowerCase());
  };

  const onSubmit = (values) => {
    try {
      tokenListManager.set(values.tokenList.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={"w-96"}
          name="tokenList"
          control={control}
          defaultValue={[tokenListData[idx(tokenList, (_) => _.name)]]}
          options={Object.values(tokenListData)}
          as={Select}
        />
        <button>{props.label}</button>
      </form>
      <Controller
        className={"w-96 mt-4"}
        name="tokenListActive"
        control={control}
        defaultValue={"uniswap"}
        placeholder="Search Token List"
        options={activeTokenList}
        as={Select}
        filterOption={filterConfig}
      />
    </div>
  );
};

FormSettingsTokenList.defaultProps = {
  label: "Save",
  sx: {},
};

FormSettingsTokenList.propTypes = {
  sx: PropTypes.object,
};

export default FormSettingsTokenList;
