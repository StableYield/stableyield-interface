import { useMemo, useState, useEffect, Fragment } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";
import { useWeb3React } from "@web3-react/core";

import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";
import {
  EtherscanLink,
  ERC20Balance,
  TokenBalance,
  LoadingBox,
  TokenImage,
  ERC20Price,
  ERC20Value,
} from "../../components";
import useLocalDatabase from "../../data/localDatabase";
import styles from "./WalletTokenBalancesTable.module.css";
/**
 * @name WalletTokenBalancesTable
 * @param {*} param0
 */
export const WalletTokenBalancesTable = ({ address, ...props }) => {
  const { account } = useWeb3React();
  const [dataFetched, dataFetchedSet] = useState([]);
  const localDatabase = useLocalDatabase();

  useEffect(() => {
    (async () => {
      const tokenInteractions = await localDatabase.getItem(
        `token-interactions-${account}`
      );
      console.log(tokenInteractions, "tokenInteractions");
      dataFetchedSet(tokenInteractions);
    })();
  }, [account]);

  return useMemo(() => {
    if (dataFetched && dataFetched.length > 0) {
      return <TableBase data={dataFetched} />;
    }
    return <LoadingBox label="Request Wallet Tokens " description={null} />;
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
        accessor: "contract",
        Cell: ({ value, row }) => (
          <>
            <span
              className={
                "text-sm text-center flex justify-center items-center lg:flex lg:items-center lg:justify-start lg:text-lg"
              }
            >
              <img src={row.original.image} width={18} />
              <TokenImage address={value} />
              <span className="text-sm ml-2">
                <strong>{row.original.symbol}</strong> (
                <em>{row.original.name}</em>)
              </span>
              <EtherscanLink address={row.original.address}>
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
        accessor: "contract",
        Cell: ({ value, row }) => (
          <>
            <div className=" text-center lg:flex lg:items-center ">
              <ERC20Balance
                address={value}
                className="text-gray-600 font-normal text-gray-700"
              />
            </div>
          </>
        ),
      },
      {
        Header: "Price",
        id: "price",
        accessor: "contract",
        Cell: ({ value, row }) => (
          <>
            <div className=" text-center lg:flex lg:items-center ">
              <ERC20Price
                address={value}
                className="text-gray-600 font-normal text-gray-700"
              />
            </div>
          </>
        ),
      },
      {
        Header: "Value",
        id: "value",
        accessor: "contract",
        Cell: ({ value, row }) => (
          <>
            <div className=" text-center lg:flex lg:items-center ">
              <ERC20Value
                address={value}
                className="text-gray-600 font-normal text-gray-700"
              />
            </div>
          </>
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

export default WalletTokenBalancesTable;
