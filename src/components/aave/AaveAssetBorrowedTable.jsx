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
import contracts from "../../constants/contracts";
import {
  useContractBaseAaveLendingPool,
  useContractBaseAaveProtocolDataProvider,
} from "../../hooks/useContractsBase";
import { ERC20Balance, TokenBalance, LoadingBox } from "../../components";
import styles from "./AaveAssetBorrowedTable.module.css";
import stablestokens from "../../constants/stablecoins";
import EtherscanLink from "../ethereum/EtherscanLink";
import { useContractAaveProtocolDataProvider } from "../../hooks/useContractAaveProtocolDataProvider";
import { useWeb3React } from "@web3-react/core";
/**
 * @name AaveAssetBorrowedTable
 * @param {*} param0
 */
export const AaveAssetBorrowedTable = ({ address, ...props }) => {
  const { activate, account, error, library } = useWeb3React();

  const [dataFetched, dataFetchedSet] = useState([]);
  const lendingPoolAddress = process.env.NEXT_PUBLIC_AAVE_LENDING_POOL;
  const lendingPool = useContractBaseAaveLendingPool(lendingPoolAddress);
  const aaveProtocolDataProvider = useContractBaseAaveProtocolDataProvider(
    contracts.aaveProtocolDataProvider
  );

  useEffect(() => {
    if (aaveProtocolDataProvider) {
      let reserveDataPromises = [];
      for (let index = 0; index < stablestokens.length; index++) {
        const element = stablestokens[index];

        reserveDataPromises.push(
          Promise.all([
            lendingPool.getReserveData(element.address),
            aaveProtocolDataProvider.getUserReserveData(
              element.address,
              account
            ),
            element.name,
          ])
        );
      }

      Promise.all(reserveDataPromises).then((values) => {
        const reserveData = values.map((asset, index) => {
          return {
            ...stablestokens[index],

            // Reserve
            stableBorrowRateGlobal: numberTrimDecimals(
              transformTokenToHuman(asset[0].currentStableBorrowRate, 25)
            ),
            variableBorrowRateGlobal: numberTrimDecimals(
              transformTokenToHuman(asset[0].currentVariableBorrowRate, 25)
            ),

            // User Data
            currentATokenBalance: numberTrimDecimals(
              transformTokenToHuman(asset[1].currentATokenBalance)
            ),
            currentStableDebt: numberTrimDecimals(
              transformTokenToHuman(
                asset[1].currentStableDebt,
                stablestokens[index].decimals
              )
            ),
            currentVariableDebt: numberTrimDecimals(
              transformTokenToHuman(
                asset[1].currentVariableDebt,
                stablestokens[index].decimals
              )
            ),
            // liquidityRate: asset[1].liquidityRate.toString(),
            liquidityRate: numberTrimDecimals(
              transformTokenToHuman(asset[1].liquidityRate)
            ),
            principalStableDebt: numberTrimDecimals(
              transformTokenToHuman(asset[1].principalStableDebt)
            ),
            scaledVariableDebt: numberTrimDecimals(
              transformTokenToHuman(asset[1].liquidityRate, 25)
            ),
            // stableBorrowRate: asset[1].stableBorrowRate.toString(),
            stableBorrowRate: numberTrimDecimals(
              transformTokenToHuman(asset[1].stableBorrowRate, 25)
            ),
            stableRateLastUpdated: numberTrimDecimals(
              transformTokenToHuman(asset[1].stableRateLastUpdated)
            ),
          };
        });
        dataFetchedSet(reserveData);
      });
    }
  }, [aaveProtocolDataProvider]);

  return useMemo(() => {
    if (dataFetched.length > 0) {
      return <TableBase data={dataFetched} />;
    }
    return <LoadingBox title="Borrowing Data" description={null} />;
  }, [dataFetched]);

  // return <StableTokensFetch columns={columns} filter={false} {...props} />;
};
/**
 * @name TableBase
 * @param {*} param0
 */
export function TableBase({
  data,
  // columns,
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
              <img src={row.original.image} width={18} />
              <span className="text-sm ml-2">
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
            {/* <div className="mt-3">
              <span className="tag-green">
                aToken Balance: {row.original.currentATokenBalance}
              </span>
            </div> */}
          </>
        ),
      },
      // {
      //   Header: "Balance (aToken)",
      //   id: "balance",
      //   accessor: "currentATokenBalance",
      //   Cell: ({ value, row }) => (
      //     <span>{value}</span>
      //     // <div className=" text-center lg:flex lg:items-center ">
      //     //   <ERC20Balance
      //     //     address={value}
      //     //     className="text-gray-600 font-normal text-gray-700"
      //     //   />
      //     // </div>
      //   ),
      // },
      {
        Header: () => (
          <>
            <span className="block text-lg">Borrowed</span>
            <span className="block text-sm">(Stable Rate)</span>
          </>
        ),
        id: "currentStableDebt",
        accessor: "currentStableDebt",
        Cell: ({ value, row }) => (
          <span className="tag-blue text-sm px-4">
            {row.original.symbol}: {row.original.currentStableDebt}
          </span>
        ),
      },
      {
        Header: () => (
          <>
            <span className="block text-lg">Borrowed</span>
            <span className="block text-sm">(Variable Rate)</span>
          </>
        ),
        id: "currentVariableDebt",
        accessor: "currentVariableDebt",
        Cell: ({ value, row }) => (
          <span className="tag-orange text-sm px-4">
            {row.original.symbol}: {row.original.currentVariableDebt}
          </span>
        ),
      },
      {
        Header: () => (
          <>
            <span className="block text-sm">(Variable)</span>
            <span className="block text-lg">Borrow APR</span>
          </>
        ),
        id: "variableBorrowRateGlobal",
        accessor: "variableBorrowRateGlobal",
        Cell: ({ value, row }) => (
          <div className="pr-3">
            <span className="block px-3">{value} </span>
          </div>
        ),
      },
      {
        Header: () => (
          <>
            <span className="block text-sm">(Stable)</span>
            <span className="block text-lg">Borrow APR</span>
          </>
        ),
        id: "stableBorrowRateGlobal",
        accessor: "stableBorrowRateGlobal",
        Cell: ({ value, row }) => (
          <div className="pr-3">
            <span className="block px-3">{value} </span>
          </div>
        ),
      },
    ],
    []
  );

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

export default AaveAssetBorrowedTable;
