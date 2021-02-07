import { useMemo, useState, useEffect, Fragment } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";
import { useContractBaseAaveLendingPool } from "../../hooks/useContractsBase";
import { ERC20Balance } from "../index";
import styles from "./AaveAssetsTable.module.css";
import stablestokens from "../../constants/stablecoins";
import EtherscanLink from "../ethereum/EtherscanLink";
import {
  AaveLendingPoolDepositModalButton,
  CurveExchangeModalButton,
  StableYieldSwapModalButton,
} from "../index";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { useContractBaseERC20 } from "../../hooks/useContractsBase";
import { useTransactionWatch } from "../../state/web3-react-system";

export const AaveAssetsTable = ({ address, ...props }) => {
  const { activate, account, error, library } = useWeb3React();
  const transactionWatch = useTransactionWatch();

  const columns = useMemo(
    () => [
      {
        Header: "Asset",
        id: "id",
        accessor: "name",
        Cell: ({ value, row }) => (
          <>
            <span
              className={
                "text-sm text-center flex justify-center items-center lg:flex lg:items-center lg:justify-start lg:text-lg"
              }
            >
              <img src={row.original.image} width={28} />
              <span className="ml-2">
                <strong>{row.original.symbol}</strong> (
                <em>{row.original.name}</em>)
              </span>
              <EtherscanLink address={row.original.id}>
                <img
                  className="ml-1 shadow-md block opacity-60"
                  src="/icons/external-link.png"
                  width={12}
                />
              </EtherscanLink>
            </span>
          </>
        ),
      },
      {
        Header: "Balance",
        id: "balance",
        accessor: "id",
        Cell: ({ value, row }) => (
          <div className=" text-center lg:flex lg:items-center ">
            <ERC20Balance
              address={value}
              className="text-gray-600 font-normal text-gray-700"
            />
          </div>
        ),
      },
      {
        Header: "Lent",
        id: "aTokenAddress",
        accessor: "aTokenAddress",
        Cell: ({ value, row }) => (
          <div className=" text-center lg:flex lg:items-center ">
            <ERC20Balance
              address={value}
              className="text-gray-600 font-bold text-gray-500"
            />
            {/* <EtherscanLink address={value}>
              <img
                className="ml-1 shadow-md block opacity-60"
                src="/icons/external-link.png"
                width={12}
              />
            </EtherscanLink> */}
          </div>
        ),
      },
      {
        Header: "APY",
        id: "apyLend",
        accessor: "apyLend",
        Cell: ({ value, row }) => (
          <span className="tag-green px-3 shadow-md">{value}% </span>
        ),
      },
      {
        Header: "Borrow",
        id: "apyBorrow",
        accessor: "apyBorrow",
        Cell: ({ value, row }) => (
          <>
            <span className="tag-red px-3 shadow-md">{value}% </span>
          </>
        ),
      },
      {
        Header: "Actions",
        id: "actions",
        accessor: "symbol",
        Cell: ({ value, row }) => {
          const [holdsAToken, holdsATokenSet] = useState();
          const erc20Contract = useContractBaseERC20(
            row.original.aTokenAddress
          );
          useEffect(() => {
            if (account) {
              (async () => {
                const holdsAToken = await erc20Contract.balanceOf(account);
                if (holdsAToken.gt(0)) {
                  holdsATokenSet(true);
                } else {
                  holdsATokenSet(false);
                }
              })();
            }
            return false;
          }, [account, erc20Contract]);
          return (
            <div className="mt-4 text-center lg:mt-0 lg:text-right">
              <AaveLendingPoolDepositModalButton
                defaultCollateral={row.original.address}
                className="tag-blue btn-small mr-2 px-4"
                label="Lend"
              />
              {/* <CurveExchangeModalButton
                className="tag-green btn-small mr-2"
                label="Exchange"
              /> */}
              {holdsAToken && (
                <StableYieldSwapModalButton
                  className="tag-orange btn-small mr-2 px-4"
                  label="Swap Position"
                />
              )}
              {/* <button className="tag-green btn-small mr-2">Swap</button> */}
            </div>
          );
        },
      },
    ],
    []
  );

  const [dataFetched, dataFetchedSet] = useState([]);
  const lendingPoolAddress = process.env.NEXT_PUBLIC_AAVE_LENDING_POOL;
  const lendingPool = useContractBaseAaveLendingPool(lendingPoolAddress);
  useEffect(() => {
    if (lendingPool) {
      let reserveDataPromises = [];
      for (let index = 0; index < stablestokens.length; index++) {
        const element = stablestokens[index];
        reserveDataPromises.push(lendingPool.getReserveData(element.address));
      }
      Promise.all(reserveDataPromises).then((values) => {
        const reserveData = values.map((asset, index) => {
          return {
            ...stablestokens[index],
            aTokenAddress: asset.aTokenAddress,
            apyLend: numberTrimDecimals(transformTokenToHuman(asset[3], 25), 2),
            apyBorrow: numberTrimDecimals(
              transformTokenToHuman(asset[4], 25),
              2
            ),
          };
        });
        dataFetchedSet(reserveData);
      });
    }
  }, [lendingPool]);

  return useMemo(() => {
    if (dataFetched.length > 0) {
      return <TableBase columns={columns} data={dataFetched} />;
    }
    return <span>Loading Stable Token Data...</span>;
  }, [dataFetched]);

  // return <StableTokensFetch columns={columns} filter={false} {...props} />;
};
/**
 * @name TableBase
 * @param {*} param0
 */
export function TableBase({
  data,
  columns,
  columnExpandedCount,
  sxHeader,
  sxRow,
  sxCell,
  hideMainHeaders,
  expandedRow,
  selectRowSet,
  pageSizeDefault,
  filter,
  setSearchFilter,
  ...props
}) {
  const defaultColumn = useMemo(
    () => ({
      Filter: () => null,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: pageSizeDefault || 20, pageIndex: 0 },
      defaultColumn,
    },
    useFilters, // useFilters!
    useSortBy,
    useRowState,
    usePagination
    // useGlobalFilter // useGlobalFilter!
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table} {...getTableProps()}>
        <thead className={styles.tableHead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                  sx={sxHeader}
                >
                  {column.render("Header")}
                  <span style={{ fontSize: 14 }}>
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tableBody} {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-5">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AaveAssetsTable;
