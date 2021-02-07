import idx from "idx";
import { useMemo, useState, useEffect, Fragment } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  useTable,
  usePagination,
  useRowState,
  useSortBy,
  useFilters,
} from "react-table";

import { Box, Flex } from "../layout";
import { useTokenList } from "../../state/web3-react-system";
import useLocalDatabase from "../../data/localDatabase";
import Address from "../ethereum/Address";
import {
  TokenBalanceTrimDecimals,
  TokenImage,
  EpochToRelativeDate,
  EpochToCalendarDate,
  EtherscanLink,
} from "../index";
import styles from "./TokenTransfersTable.module.css";
import TokenBalance from "./TokenBalance";

/**
 * @name TokenTransfersTable.module
 * @param {Object} props
 */
export const TokenTransfersTable = ({ address, ...props }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Token",
        id: "tokens",
        accessor: "tokenName",
        filterMethod: (filter, row) => {
          return row;
        },
        Filter: TokenColumnFilter,
        Cell: ({ value, row }) => (
          <>
            <span className={styles.tokenName}>
              <TokenImage
                address={row.original.contractAddress}
                sx={{ mr: 2, width: 20 }}
              />
              <span className="ml-3">
                <strong>{row.original.tokenSymbol}</strong> (
                <em>{row.original.tokenName}</em>)
              </span>
            </span>
          </>
        ),
      },
      {
        Header: "Amount",
        accessor: "value",
        filter: "between",
        Filter: NumberRangeColumnFilter,
        Cell: ({ value, row }) => <TokenBalance balance={value} />,
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
        Header: "Timestamp",
        id: "timestamp",
        accessor: "timeStamp",
        filter: "between",
        Filter: NumberRangeColumnFilter,
        Cell: ({ value, row }) => (
          <>
            <EpochToRelativeDate
              date={value}
              sx={{ color: "#9b9b9b", ml: 0, fontSize: 0 }}
            />
            <br />
            <EpochToCalendarDate date={value} />
          </>
        ),
      },

      {
        Header: "Actions",
        id: "actions",
        accessor: "transaction",
        Cell: ({ value, row }) => <span>{value}</span>,
      },
    ],
    []
  );

  const { account } = useWeb3React();
  const to = address ? address : account;
  const [searchFilter, setSearchFilter] = useState({
    first: 20,
    where: { to },
  });

  return useMemo(() => {
    if (!searchFilter) {
      return <span>Loading Swaps...</span>;
    } else {
      return (
        <Swaps
          setSearchFilter={setSearchFilter}
          columns={columns}
          filter={searchFilter}
          {...props}
        />
      );
    }
  }, [searchFilter]);
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
      const tokenTransfers = await localDatabase.getItem(
        `token-transfers-${account}`
      );
      if (tokenTransfers && tokenTransfers.length > 0) {
        setActiveTokenList(tokenTransfers);
      }
    })();
    return [];
  }, []);

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
    return <span>Loading Tokens...</span>;
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

export default TokenTransfersTable;
