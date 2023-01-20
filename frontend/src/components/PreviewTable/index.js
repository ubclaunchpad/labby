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
      key: "fk_sow_id",
      editable: false,
    },
    {
      title: "Question Type",
      dataIndex: "question_type",
      key: "name",
      editable: false,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "completedTime",
      editable: false,
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
