import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import { useGraphStableYieldVaultVotes } from "../../state/graph-system";
import {
  TokenBalance,
  EpochToCalendarDate,
  EpochToRelativeDate,
  LoadingBox,
} from "../../components";
import styles from "./StableYieldVaultColleralSwapsTable.module.css";
import Address from "../ethereum/Address";

/**
 * @name StableYieldVaultVotesTable
 * @param {*} props
 */
export const StableYieldVaultVotesTable = ({ address, ...props }) => {
  const vaultUsers = useGraphStableYieldVaultVotes();

  return useMemo(() => {
    if (vaultUsers.data && vaultUsers.data.length > 0) {
      return <TableBase data={vaultUsers.data} />;
    }
    if (vaultUsers.isLoading) {
      return <LoadingBox label="Loading Votes" />;
    }
    return (
      <div className="card flex flex-center py-12 w-full">
        <h3>No Recent Votes</h3>
      </div>
    );
  }, [vaultUsers]);
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
        Header: "Proposal ID",
        id: "proposalId",
        accessor: "proposalId",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>{value}</div>
        ),
      },
      {
        Header: "User",
        id: "user",
        accessor: "user",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <Address address={value} trim={7} />
          </div>
        ),
      },
      {
        Header: "Vote",
        id: "vote",
        accessor: "vote",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>{value ? "Yes" : "No"}</div>
        ),
      },
      {
        Header: "Shares",
        id: "shares",
        accessor: "maxSharesStaked",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <TokenBalance balance={value} decimals={18} />
          </div>
        ),
      },
      {
        Header: "Date",
        id: "date",
        accessor: "createdAt",
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

export default StableYieldVaultVotesTable;
