import idx from "idx";
import { useMemo, useState, useEffect, Fragment } from "react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import { Box, Flex } from "../layout";
import useLocalDatabase from "../../data/localDatabase";
import Address from "../ethereum/Address";
import {
  TokenBalanceTrimDecimals,
  TokenImage,
  EpochToRelativeDate,
  EpochToCalendarDate,
  EtherscanLink,
  TransactionMethod,
} from "../index";
import styles from "./WalletTransactionTable.module.css";
import TokenBalance from "../token/TokenBalance";
import { useWeb3System } from "../../state/web3-react-system";

/**
 * @name WalletTransactionTable
 * @param {Object} props
 */
export const WalletTransactionTable = ({ address, ...props }) => {
  const { account } = useWeb3React();
  const to = address ? address : account;
  const columns = useMemo(
    () => [
      {
        Header: "Action",
        id: "method",
        accessor: "input",
        filterMethod: (filter, row) => {
          return row;
        },
        Filter: TokenColumnFilter,
        Cell: ({ value, row }) => (
          <>
            <TransactionMethod input={value} className="text-sm font-medium" />
          </>
        ),
      },
      {
        Header: "From",
        accessor: "from",
        filter: "between",
        Filter: NumberRangeColumnFilter,
        Cell: ({ value }) => <Address address={value} trim={7} />,
      },
      {
        Header: "To",
        accessor: "to",
        filter: "between",
        Filter: NumberRangeColumnFilter,
        Cell: ({ value }) => <Address address={value} trim={7} />,
      },
      {
        Header: "Value",
        accessor: "value",
        filter: "between",
        Filter: NumberRangeColumnFilter,
        Cell: ({ value, row }) => {
          if (
            account &&
            utils.getAddress(row.original.from) === utils.getAddress(account)
          ) {
            return <TokenBalance balance={value} className="tag-red" />;
          } else {
            return <TokenBalance balance={value} className="tag-green" />;
          }
        },
      },
      {
        Header: "Cost",
        accessor: "cumulativeGasUsed",
        Filter: () => null,
        Cell: ({ value, row }) => (
          <>
            <span className="block">
              <strong>Gas Used: </strong>
              {row.original.gasUsed} GWEI
            </span>
            <span className="block">
              <strong>Cost: </strong>
              {row.original.cumulativeGasUsed} GWEI
            </span>
          </>
        ),
      },
      {
        Header: "Timestamp",
        id: "timestamp",
        accessor: "timeStamp",
        filter: "between",
        Filter: NumberRangeColumnFilter,
        Cell: ({ value, row }) => (
          <>
            <EpochToCalendarDate date={value} sx={{ ml: 0, fontSize: 0 }} /> -{" "}
            <EpochToRelativeDate
              date={value}
              sx={{ color: "#9b9b9b", ml: 0, fontSize: 0 }}
            />{" "}
          </>
        ),
      },

      {
        Header: "Details",
        id: "hash",
        accessor: "hash",
        Cell: ({ value, row }) => (
          <>
            <EtherscanLink type="transaction" hash={value}>
              Etherscan TX
            </EtherscanLink>
          </>
        ),
      },
    ],
    []
  );

  return useMemo(() => {
    if (!account) {
      return <span>Loading Swaps...</span>;
    } else {
      return <Swaps columns={columns} {...props} />;
    }
  }, [account]);
};

/**
 * @name Swaps
 * @description Swap list component
 * @param {Object} props
 */
const Swaps = ({ columns, filter, to, setSearchFilter, ...props }) => {
  const { account } = useWeb3React();
  const localDatabase = useLocalDatabase();
  const [activeTokenList, setActiveTokenList] = useState([]);

  useEffect(() => {
    (async () => {
      const walletTransactions = await localDatabase.getItem(
        `transactions-${account}`
      );
      if (walletTransactions && walletTransactions.length > 0) {
        setActiveTokenList(walletTransactions);
      } else {
        setActiveTokenList([]);
      }
    })();
    return [account];
  }, [account]);

  return useMemo(() => {
    if (activeTokenList.length > 0) {
      return (
        <TableBase
          columns={columns}
          data={activeTokenList}
          setSearchFilter={setSearchFilter}
          filter={filter}
        />
      );
    }
    return (
      <div className="bg-white border-solid border-white border-2 flex items-center rounded-lg justify-center p-5 py-10 shadow-md">
        <h1 className="text-lg text-gray-500 text-center">
          Connect Wallet (with mainnet activity) to view transaction history.
        </h1>
      </div>
    );
  }, [activeTokenList]);
};

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

  // console.log(data, "datadata");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of 'rows' the 'page' variable is used
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setData,
    updateData,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: pageSizeDefault || 10, pageIndex: 0 },
      defaultColumn,
    },
    useFilters, // useFilters!
    useSortBy,
    useRowState,
    usePagination
    // useGlobalFilter // useGlobalFilter!
  );

  const [filtersPanelsEnabled, setFiltersPanelsEnabled] = useState(false);
  const toggleFilters = () => setFiltersPanelsEnabled(!filtersPanelsEnabled);
  const [searchPanelOpen, setsearchPanelOpen] = useState(false);
  const searchPanelToggle = () => setsearchPanelOpen(!searchPanelOpen);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableDetails}>
        <Pagination
          between
          className={styles.pagination}
          // sx={props.sxPagination}
        >
          <span className={styles.records}>
            <strong>Records:</strong> {data.length}
          </span>
          <div>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
          </div>
          <div style={{ marginLeft: 10 }}>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 7, 10, 15, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </Pagination>

        <div>
          <button
            className={styles.filtersPanelToggle}
            onClick={toggleFilters}
            data-active={filtersPanelsEnabled}
          >
            Filters
          </button>
        </div>
      </div>
      <table className={styles.table} {...getTableProps()}>
        <thead className={styles.tableHead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Fragment key={index}>
                  <Header
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    sx={sxHeader}
                  >
                    {column.render("Header")}
                    <span style={{ fontSize: 14 }}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ↓"
                          : " ↑"
                        : ""}
                    </span>
                    {filtersPanelsEnabled && (
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    )}
                  </Header>
                </Fragment>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tableBody} {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <Row {...row.getRowProps()} key={i} sx={sxRow}>
                  {row.cells.map((cell) => {
                    return (
                      <Cell {...cell.getCellProps()} sx={sxCell}>
                        {cell.render("Cell")}
                      </Cell>
                    );
                  })}
                </Row>
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <Pagination between className={styles.pagination} sx={props.sxPagination}>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 7, 10, 15, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </Pagination>
    </div>
  );
}

// Define a default UI for filtering
function TokenColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
  ...rest
}) {
  const sortingRows = (value) => {
    setFilter(value || undefined); // Set undefined to remove the filter entirely
  };

  return (
    <>
      <input
        className={styles.tokenFilter}
        value={filterValue || ""}
        onChange={(e) => sortingRows(e.target.value)}
        placeholder={`Token Sent`}
      />
      <input
        className={styles.tokenFilter}
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Token Recieved`}
      />
    </>
  );
}

// Define a default UI for filtering
function AmountColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`USD ${count} Amount`}
    />
  );
}

function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className={styles.filterRange}>
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? Number(val) : undefined, old[1]]);
        }}
        placeholder={`Min`}
      />
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? Number(val) : undefined]);
        }}
        placeholder={`Max`}
      />
    </div>
  );
}

const Header = (props) => <Box as="th" {...props} />;
const Row = (props) => <Box as="tr" {...props} />;
const Cell = (props) => <Box as="td" {...props} />;
const Pagination = (props) => <Flex as="div" {...props} />;

export default WalletTransactionTable;
