import { PercentCell } from "../cells/PercentCell";

export const getColumns = (iconMap) => [
  {
    Header: "#",
    accessor: (_r, i) => i + 1,
    id: "rank",
    disableSortBy: true,
  },
  {
    Header: "Logo",
    accessor: "id",
    Cell: ({ value }) => iconMap[value] || null,
    disableSortBy: true,
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Symbol",
    accessor: "symbol",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }) => <span className="font-semibold">${value.toLocaleString()}</span>,
  },
  {
    Header: "1h %",
    accessor: "percent1h",
    Cell: PercentCell,
  },
  {
    Header: "24h %",
    accessor: "percent24h",
    Cell: PercentCell,
  },
  {
    Header: "7d %",
    accessor: "percent7d",
    Cell: PercentCell,
  },
  {
    Header: "Market Cap",
    accessor: "marketCap",
    Cell: ({ value }) => `$${value.toLocaleString()}`,
  },
  {
    Header: "24h Vol",
    accessor: "volume24h",
    Cell: ({ value }) => `$${value.toLocaleString()}`,
  },
  {
    Header: "Circulating",
    accessor: "circulating",
    Cell: ({ value }) => value.toLocaleString(),
  },
  {
    Header: "Max Supply",
    accessor: "maxSupply",
    Cell: ({ value }) => (value ? value.toLocaleString() : "—"),
  },
  {
    Header: "7D Chart",
    accessor: "chart7d",
    Cell: ({ value }) => <img src={value} alt="7d chart" className="w-28 h-10" />,
    disableSortBy: true,
  },
];
