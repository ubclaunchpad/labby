import React from "react";
import { Table } from "antd";
import "./index.css";
import "antd/dist/antd.min.css";

 const CostTable = () => {
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
  return <Table className="table" dataSource={dataSource} columns={columns} />;
};

export default CostTable;
