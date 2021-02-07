import _ from "lodash";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useEtherscan,
  useCoinGecko,
  useBlockchainSync,
} from "../../state/web3-react-system";
import useLocalDatabase from "../../data/localDatabase";

const syncLatestTokenTransfers = async (localDatabase, account) => {
  const tokenTransferLocal = await localDatabase.getItem(
    `token-transfers-${account}`
  );

  var transfersSorted = _.chain(tokenTransferLocal).groupBy("contractAddress");

  localDatabase.setItem(`transfers-sorted-${account}`, transfersSorted.value());

  const tokenInteractions = transfersSorted
    .map((group, key) => ({
      contract: key,
      name: group[0].tokenName,
      symbol: group[0].tokenSymbol,
      decimals: group[0].tokenSymbol,
    }))
    .value();

  localDatabase.setItem(`token-interactions-${account}`, tokenInteractions);
};

/**
 * @name
 * @param {Object} props
 */
export const EthereumSync = (props) => {
  const { account, chainId, library } = useWeb3React();
  const etherscan = useEtherscan();
  const blockchainSync = useBlockchainSync();
  const localDatabase = useLocalDatabase();

  const coingecko = useCoinGecko();

  useEffect(() => {
    (async () => {
      if (account) {
        let tokenList;
        tokenList = await localDatabase.getItem("uniswap-token-list");
        if (!tokenList) {
          const tokenList = await coingecko.uniswapTokens();
          localDatabase.setItem("uniswap-token-list", tokenList.data.tokens);
        }

        syncLatestTokenTransfers(localDatabase, account);
      }
    })();
  }, [account]);

  useEffect(() => {
    if (account && chainId == 1) {
      (async () => {
        // Account Transactions
        // --------------------
        const transactionsLocal = await localDatabase.getItem(
          `transactions-${account}`
        );
        if (!transactionsLocal) {
          const { data, status } = await etherscan.transactions(account);
          if (status == 200 && data.status === "1") {
            const txCount = await library.getTransactionCount(account);
            await localDatabase.setItem(`transactions-${account}`, data.result);
            const lastTxBlockNumber =
              data.result[data.result.length - 1].blockNumber;
            blockchainSync.setBlockNumberSync(lastTxBlockNumber);
            blockchainSync.setNonceSync(txCount);
          }
        } else {
          // TODO Logic to get latest transactions
        }

        // ERC20 Transfers
        // --------------------
        const tokenTransfersLocal = await localDatabase.getItem(
          `token-transfers-${account}`
        );
        if (!tokenTransfersLocal) {
          const { data, status } = await etherscan.tokenERC20Transfers(account);
          if (status == 200 && data.status === "1") {
            await localDatabase.setItem(
              `token-transfers-${account}`,
              data.result
            );
          }
        } else {
          // TODO Logic to get latest ERC20 transfers
        }
      })();
    }
  }, [account]);

  return null;
};
export default EthereumSync;
