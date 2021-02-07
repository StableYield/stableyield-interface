import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import styles from "./StableYieldVaultColleralSwapsTable.module.css";
import { useGraphStableYieldVaultProposals } from "../../state/graph-system";
import {
  Address,
  TokenBalance,
  ERC20Name,
  ERC20Symbol,
  EpochToCalendarDate,
  EpochToRelativeDate,
  LoadingBox,
} from "../../components";

/**
 * @name StableYieldVaultProposalsTable
 * @param {*} props
 */
export const StableYieldVaultProposalsTable = ({ address, ...props }) => {
  const vaultUsers = useGraphStableYieldVaultProposals();

  return useMemo(() => {
    if (vaultUsers.data && vaultUsers.data.length > 0) {
      return <TableBase data={vaultUsers.data} />;
    }
    if (vaultUsers.isLoading) {
      return <LoadingBox label="Loading Proposals" />;
    }
    return (
      <div className="card flex flex-center py-12 w-full">
        <h3>No Active Proposals</h3>
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
        accessor: "id",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <span className="text-xl font-black">{value}</span>
          </div>
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
        id: "borrowAsset",
        accessor: "borrowAsset",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <ERC20Name address={value} trim={10} />
          </div>
        ),
      },
      {
        Header: "Borrow Amount",
        id: "borrowAmount",
        accessor: "borrowAmount",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            <TokenBalance balance={value} decimals={18} />
          </div>
        ),
      },
      {
        Header: "Rate Mode",
        id: "interestRateMode",
        accessor: "interestRateMode",
        Cell: ({ value }) => (
          <div className={"flex items-center"}>
            {value}
            {/* <TokenBalance balance={value} decimals={18} /> */}
          </div>
        ),
      },
      {
        Header: "Yes Votes",
        id: "yesVotes",
        accessor: "yesVotes",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <span>{value}</span>
          </div>
        ),
      },
      {
        Header: "No Votes",
        id: "noVotes",
        accessor: "noVotes",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <span>{value}</span>
          </div>
        ),
      },
      {
        Header: "Date",
        id: "date",
        accessor: "createdAt",
        Cell: ({ value, row }) => (
          <div>
            <EpochToCalendarDate date={value} className="block text-gray-600" />
            <EpochToRelativeDate
              date={value}
              className="block text-gray-400 text-xs"
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

export default StableYieldVaultProposalsTable;
