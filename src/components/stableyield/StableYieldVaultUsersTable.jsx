import { useMemo, useState, useEffect } from "react";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import { useGraphStableYieldVaultUsers } from "../../state/graph-system";
import {
  TokenBalance,
  EpochToCalendarDate,
  EpochToRelativeDate,
  LoadingBox,
} from "../../components";
import styles from "./StableYieldVaultColleralSwapsTable.module.css";
import Address from "../ethereum/Address";

/**
 * @name StableYieldVaultUsersTable
 * @param {*} props
 */
export const StableYieldVaultUsersTable = ({ address, ...props }) => {
  const vaultUsers = useGraphStableYieldVaultUsers();

  return useMemo(() => {
    if (vaultUsers.data && vaultUsers.data.length > 0) {
      return <TableBase data={vaultUsers.data} />;
    }
    return <LoadingBox label="Loading Users" />;
  }, [vaultUsers]);

  // return <StableTokensFetch columns={columns} filter={false} {...props} />;
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
        Header: "User",
        id: "address",
        accessor: "address",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <Address address={value} trim={10} />
          </div>
        ),
      },
      {
        Header: "Shares",
        id: "shares",
        accessor: "shares",
        Cell: ({ value }) => (
          <div className={"flex items-center pl-3"}>
            <TokenBalance balance={value} />
          </div>
        ),
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

export default StableYieldVaultUsersTable;
