import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import contracts from "../../constants/contracts";
import stableTokens from "../../constants/stablecoins";
import { useContractBaseStableYieldVault } from "../../hooks/useContractsBase";
import styles from "./StableYieldVaultColleralSwapsTable.module.css";
import { useGraphStableYieldVaultProposals } from "../../state/graph-system";
import {
  Address,
  ERC20Balance,
  TokenBalance,
  TokenImage,
  ERC20Name,
  ERC20Symbol,
  EpochToCalendarDate,
  EpochToRelativeDate,
  LoadingBox,
} from "../../components";

/**
 * @name StableYieldVaultApprovedTokensTable
 * @param {*} props
 */
export const StableYieldVaultApprovedTokensTable = ({ address, ...props }) => {
  const [data, dataSet] = useState();
  // const vaultUsers = useGraphStableYieldVaultProposals();
  // const contract = useContractBaseStableYieldVault(contracts.stableYieldVault);
  // useEffect(() => {
  //   if (contract && !data) {
  //     (async () => {
  //       const approvedTokens = await contract.approvedTokens();
  //       console.log(approvedTokens, "approvedTokens");
  //       dataSet(approvedTokens);
  //     })();
  //   }
  // }, [contract]);

  return useMemo(() => {
    if (stableTokens && stableTokens.length > 0) {
      return <TableBase data={stableTokens} />;
    }
    if (!stableTokens) {
      return <LoadingBox label="Loading Active Tokens" />;
    }
    return (
      <div className="card flex flex-center py-12 w-full">
        <h3>No Active Tokens</h3>
      </div>
    );
  }, [stableTokens]);
};

/**
 * @name TableBase
 * @param {*} param0
 */
export function TableBase({
  data,
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
        id: "name",
        accessor: "name",
        Cell: ({ value, row }) => (
          <div className={"flex items-center pl-3"}>
            <TokenImage
              symbol={row.original.symbol}
              fromSymbol
              address={row.original.address}
            />
            <span className="ml-2">{value}</span>
            <span className="ml-2 font-bold">({row.original.symbol})</span>
          </div>
        ),
      },
      {
        Header: "Balance",
        id: "balance",
        accessor: "address",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <ERC20Balance address={value} trim={7} />
          </div>
        ),
      },
      {
        Header: "Vault Balance",
        id: "vaultbalance",
        accessor: "address",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <ERC20Balance address={value} user={contracts.stableYieldVault} />
          </div>
        ),
      },
      {
        Header: "Actions",
        id: "actions",
        accessor: "address",
        Cell: ({ value, row }) => (
          <div className=" text-right w-full pr-4">
            <a href={`https://app.uniswap.org/#/swap/${value}`} target="_blank">
              <button className="btn-indigo">Purchase</button>
            </a>
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

export default StableYieldVaultApprovedTokensTable;
