import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import { useGraphStableYieldVaultLoans } from "../../state/graph-system";
import {
  ERC20Name,
  ERC20Symbol,
  TokenBalance,
  EpochToCalendarDate,
  EpochToRelativeDate,
  LoadingBox,
} from "../../components";
import styles from "./StableYieldVaultColleralSwapsTable.module.css";
import Address from "../ethereum/Address";

/**
 * @name StableYieldVaultLoansTable
 * @param {*} props
 */
export const StableYieldVaultLoansTable = ({ address, ...props }) => {
  const request = useGraphStableYieldVaultLoans();

  return useMemo(() => {
    if (request.data && request.data.length > 0) {
      return <TableBase data={request.data} />;
    }
    if (request.isLoading) {
      return <LoadingBox label="Loading Loans" />;
    }
    return (
      <div className="card flex flex-center py-12 w-full">
        <h3>No Recent Loans</h3>
      </div>
    );
  }, [request]);
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
        Header: "Loan ID",
        id: "id",
        accessor: "id",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>{value}</div>
        ),
      },
      {
        Header: "Borrower",
        id: "borrower",
        accessor: "borrower",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <Address address={value} trim={7} />
          </div>
        ),
      },
      {
        Header: "Asset",
        id: "asset",
        accessor: "asset",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <ERC20Name address={value} trim={10} />
          </div>
        ),
      },
      {
        Header: "Borrow Amount",
        id: "amount",
        accessor: "amount",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <TokenBalance balance={value} decimals={18} />
          </div>
        ),
      },
      {
        Header: "Withdrawn",
        id: "withdrawn",
        accessor: "withdrawn",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <TokenBalance balance={value} decimals={18} />
          </div>
        ),
      },
      {
        Header: "Repayed",
        id: "repayed",
        accessor: "repayed",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <TokenBalance balance={value} decimals={18} />
          </div>
        ),
      },
      {
        Header: "Loan Start",
        id: "loanStart",
        accessor: "loanStart",
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
      {
        Header: "Loan End",
        id: "loanEnd",
        accessor: "loanEnd",
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

export default StableYieldVaultLoansTable;
