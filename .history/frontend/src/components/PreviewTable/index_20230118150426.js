import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_CELL_DATA,
} from "../../redux/actions/costActions";
import { Table, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { SET_ANSWER_BY_SURVEY } from "../../redux/actions/questionActions";

const PreviewTable = () => {
  const dispatch = useDispatch();
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
        dataSource={dataSource}
        columns={renderedColumns}
      />
    </div>
  );
};

export default PreviewTable;
