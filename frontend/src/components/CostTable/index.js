import { Table } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";

//TODO: make the cells editable
//TODO: Add row funcionality
const CostTable = () => {
  const { Column } = Table;

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Internal",
      dataIndex: "internal",
      key: "internal",
    },
    {
      title: "External",
      dataIndex: "external",
      key: "external",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
    },
  ];

  // TODO: replace with redux
  const dataSource = [
    {
      key: "1",
      service: "Sectioning",
      description:
        "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
      internal: "$150",
      external: "$",
      industry: "$",
    },
    {
      key: "2",
      service: "Macrodisection",
      description:
        "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
      internal: "$150",
      external: "$",
      industry: "$",
    },
    {
      key: "3",
      service: "Scrolling",
      description:
        "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
      internal: "$150",
      external: "$",
      industry: "$",
    },
  ];

  return (
    <>
      {/* <Table className="table" dataSource={dataSource} columns={columns} /> */}
      <Table className="table" dataSource={dataSource} pagination={false}>
        {columns.map((column) => {
          return (
            <Column
              title={column.title}
              dataIndex={column.dataIndex}
              key={column.key}
            />
          );
        })}
      </Table>
    </>
  );
};

export default CostTable;
