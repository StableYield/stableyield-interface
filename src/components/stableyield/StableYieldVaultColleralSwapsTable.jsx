import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import { useGraphStableYieldVaultSwaps } from "../../state/graph-system";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";
import {
  ERC20Name,
  ERC20Symbol,
  TokenImage,
  EpochToCalendarDate,
  EpochToRelativeDate,
} from "../../components";
import styles from "./StableYieldVaultColleralSwapsTable.module.css";
import LoadingBox from "../common/LoadingBox";

/**
 * @name StableYieldVaultColleralSwapsTable
 * @param {*} props
 */
export const StableYieldVaultColleralSwapsTable = ({ address, ...props }) => {
  const vaultSwaps = useGraphStableYieldVaultSwaps();

  console.log(vaultSwaps, "vaultSwapsvaultSwaps");

  return useMemo(() => {
    if (vaultSwaps.data && vaultSwaps.data.length > 0) {
      return <TableBase data={vaultSwaps.data} />;
    }
    return <LoadingBox label="Loading Vault Swaps" />;
  }, [vaultSwaps]);
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
        Header: "From",
        id: "tokenFrom",
        accessor: "tokenFrom",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <TokenImage address={value} width={32} />
            <ERC20Symbol address={value} className="ml-2" />
            <ERC20Name address={value} className="ml-2" />
          </div>
        ),
      },
      {
        Header: "To",
        id: "tokenTo",
        accessor: "tokenTo",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <TokenImage address={value} width={32} />
            <ERC20Symbol address={value} className="ml-2" />
            <ERC20Name address={value} className="ml-2" />
          </div>
        ),
      },
      {
        Header: "APY From",
        id: "apyFrom",
        accessor: "apyFrom",
        Cell: ({ value, row }) => {
          const displayValue = numberTrimDecimals(
            transformTokenToHuman(value, 25),
            2
          );
          return (
            <span className="tag-orange px-6 text-lg font-normal">
              {displayValue}%{" "}
            </span>
          );
        },
      },
      {
        Header: "APY To",
        id: "apyTo",
        accessor: "apyTo",
        Cell: ({ value, row }) => {
          const displayValue = numberTrimDecimals(
            transformTokenToHuman(value, 25),
            2
          );
          return (
            <>
              <span className="tag-green px-6 text-lg font-normal">
                {displayValue}%{" "}
              </span>
            </>
          );
        },
      },
      {
        Header: "Date",
        id: "date",
        accessor: "timestamp",
        Cell: ({ value, row }) => (
          <div>
            <EpochToCalendarDate
              date={value}
              className="block text-sm font-bold"
            />
            <EpochToRelativeDate
              className="block text-sm text-gray-400"
              date={value}
            />
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

export default StableYieldVaultColleralSwapsTable;
