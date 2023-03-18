import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";

const PreviewTable = () => {
  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      editable: false,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            {record.question ?? "Which Project?"}
          </div>
        ) : null,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      editable: false,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            {record.answer ?? record.answerid ?? "No Project ID"}
          </div>
        ) : null,
    },
    {
      title: "Clinical Samples",
      dataIndex: "clinicalList",
      key: "clinicalList",
      editable: false,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            {record.clinicalList ? record.clinicalList.join(", ") : ""}
          </div>
        ) : null,
    }
  ];

  const dataSource = useSelector(
    (state) => state.questionReducer.answerSurveyList
  );

  const renderedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div>
      <Table
        className="table"
        pagination={false}
        bordered
        rowKey={(record) => record.question}
        dataSource={dataSource}
        columns={renderedColumns}
      />
    </div>
  );
};

export default PreviewTable;
