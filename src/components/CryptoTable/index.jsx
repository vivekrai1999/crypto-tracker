import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import { startSimulation } from "../../features/crypto/cryptoSlice";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { getColumns } from "./columns/TableColumns";
import { cryptoIcons } from "./icons/TableIcons";

export default function CryptoTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(startSimulation());
  }, [dispatch]);

  const columns = useMemo(() => getColumns(cryptoIcons), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false,
    },
    useFilters,
    useSortBy
  );

  return (
    <div className="overflow-x-auto lg:mx-8 mx-2">
      <table {...getTableProps()} className="min-w-full bg-white rounded-lg shadow border border-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-20">
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((col, columnIndex) => (
                <th
                  {...col.getHeaderProps(col.getSortByToggleProps())}
                  className={`group px-2 sm:px-4 py-4 text-left text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider select-none transition-colors
                    ${columnIndex === 0 ? "sticky left-0 bg-gray-100 w-10 z-20 cursor-default" : columnIndex === 1 ? "sticky left-0 bg-gray-100 w-12 z-20 cursor-default" : "hover:bg-gray-200 cursor-pointer"}`}
                >
                  <div className="flex items-center">
                    {col.render("Header")}
                    <span className="ml-1">{col.canSort && (col.isSorted ? col.isSortedDesc ? <FaSortDown className="w-3 h-3" /> : <FaSortUp className="w-3 h-3" /> : "")}</span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={`group ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 cursor-pointer transition-colors`}>
                {row.cells.map((cell, columnIndex) => (
                  <td
                    {...cell.getCellProps()}
                    className={`px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap
                      ${
                        columnIndex === 0
                          ? `sticky left-0 z-10 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} group-hover:bg-gray-100 w-10`
                          : columnIndex === 1
                          ? `sticky left-0 z-10 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} group-hover:bg-gray-100 w-12`
                          : ""
                      }`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
