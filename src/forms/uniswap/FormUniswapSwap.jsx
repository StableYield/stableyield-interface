import idx from "idx";
import _ from "lodash";
import { useMemo, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Select, { createFilter } from "react-select";
import { useForm, Controller } from "react-hook-form";
import styles from "./FormUniswapSwap.module.css";
import tokenListData from "../../data/tokenList";
import {
  useTokenList,
  transformDecimalsToWad,
  transformTokenToHuman,
} from "../../state/web3-react-system";
import useWeb3SystemContext from "../../state/web3-react-system/useContext";
import {
  useContractBaseUniswapV2Router,
  useContractBaseUniswapPair,
  useContractBaseUniswapFactory,
} from "../../hooks/useContractsBase";
import { utils } from "ethers";

/**
 * @name FormUniswapSwap
 * @description
 * @version 0.0.1
 */

export const FormUniswapSwap = ({ ...props }) => {
  const [activeTokenList, setActiveTokenList] = useState([]);
  const { tokenList } = useWeb3SystemContext();
  const tokenListManager = useTokenList();
  const [amountInQuote, setAmountInQuote] = useState();
  const [calcuatingAmount, setCalcuatingAmount] = useState();
  const [pair1Address, setPair1Address] = useState();
  const [pair2Address, setPair2Address] = useState();

  // Form
  const {
    handleSubmit,
    control,
    errors,
    register,
    watch,
    setValue,
    reset,
  } = useForm();
  const { tokenOut, tokenIn, amountIn, amountOut } = watch();

  // Contract(s)
  const uniswapV2Pair1 = useContractBaseUniswapPair(pair1Address, true);
  const uniswapV2Factory = useContractBaseUniswapFactory(
    process.env.NEXT_PUBLIC_UNISWAP_V2_FACTORY,
    true
  );
  const uniswapV2Router = useContractBaseUniswapV2Router(
    process.env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
    true
  );

  useEffect(() => {
    // console.log(amountIn, amountOut, "amountamount");
  }, [amountIn, amountOut]);

  // Calculate Amount In Quote
  // useEffect(() => {
  //   (async () => {
  //     if (
  //       idx(tokenOut, (_) => _.value) &&
  //       idx(tokenIn, (_) => _.value) &&
  //       amountIn &&
  //       calcuatingAmount == "out"
  //     ) {
  //       const quote = await uniswapV2Router.getAmountOut(
  //         transformDecimalsToWad(amountIn),
  //         tokenOut.value,
  //         tokenIn.value
  //       );
  //       setValue("amountOut", transformTokenToHuman(quote));
  //     }
  //   })();
  // }, [amountIn]);

  // Calculate Amount In Quote
  useEffect(() => {
    (async () => {
      if (
        idx(tokenOut, (_) => _.value) &&
        idx(tokenIn, (_) => _.value) &&
        amountOut &&
        calcuatingAmount == "in"
      ) {
        const quotes = await uniswapV2Router.getAmountsOut(
          transformDecimalsToWad(amountOut),
          [tokenOut.value, tokenIn.value]
        );
        console.log(
          transformTokenToHuman(quotes[0].toString()),
          "quotesquotes"
        );
        console.log(
          transformTokenToHuman(quotes[1].toString()),
          "quotesquotes"
        );
        setValue("amountIn", transformTokenToHuman(quotes[1].toString()));
        // setPair1Address(pair);
      }
    })();
  }, [amountOut]);

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
  }, []);

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
      <form className={"flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center border-solid border-2 border-gray-200 rounded-xl mt-5 p-3">
          <input
            className="p-3 mt-1"
            type="number"
            name="amountOut"
            placeholder="Send Amount"
            ref={register()}
            errors={errors}
            onChange={() => setCalcuatingAmount("in")}
          />
          <Controller
            className={"w-full h-50 ml-3"}
            name="tokenOut"
            control={control}
            defaultValue={"uniswap"}
            placeholder="Search Token List"
            options={activeTokenList}
            as={Select}
            filterOption={filterConfig}
          />
        </div>
        <div className="flex items-center border-solid border-2 border-gray-200 rounded-xl mt-5 p-3">
          <input
            className="p-3 mt-1"
            type="number"
            name="amountIn"
            placeholder="Receive Amount"
            ref={register()}
            errors={errors}
            onChange={() => setCalcuatingAmount("out")}
          />
          <Controller
            className={"w-full h-50 ml-3"}
            name="tokenIn"
            control={control}
            defaultValue={"uniswap"}
            placeholder="Search Token List"
            options={activeTokenList}
            as={Select}
            filterOption={filterConfig}
          />
        </div>
        <button className="bg-green-500 text-white text-xl shadow-md inline-block relative top-0 hover:top-4 hover:shadow-lg cursor-pointer rounded-md mt-4 px-3 py-3">
          {props.label}
        </button>
      </form>
    </div>
  );
};

FormUniswapSwap.defaultProps = {
  label: "Swap",
  sx: {},
};

FormUniswapSwap.propTypes = {
  sx: PropTypes.object,
};

export default FormUniswapSwap;
