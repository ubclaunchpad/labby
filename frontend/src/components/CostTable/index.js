import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_SERVICE,
  LOAD_ALL_COST,
  UPDATE_COST,
  UPDATE_QUANTIFIABLE,
} from "../../redux/actions/costActions";
import { Table, Form, Popconfirm, Input, Checkbox } from "antd";
import { appColor } from "../../constants";
import "antd/dist/antd.min.css";
import "./index.css";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import uuid from "react-uuid";
import X from "../../assets/X.png";

const CostTable = () => {
  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      editable: false,
      width: "35%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: false,
      width: "29%",
    },
    {
      title: "Internal Cost",
      dataIndex: "internal",
      key: "internal",
      editable: true,
      width: "10%",
    },
    {
      title: "External Cost",
      dataIndex: "external",
      key: "external",
      editable: true,
      width: "10%",
    },
    {
      title: "Industry Cost",
      dataIndex: "industry",
      key: "industry",
      editable: true,
      width: "10%",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      editable: true,
      width: "10%",
    },
    {
      title: "Quantifiable",
      dataIndex: "quantifiable",
      key: "quantifiable",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Checkbox
            checked={record.quantifiable}
            onClick={(e) => {
              dispatch({
                type: UPDATE_QUANTIFIABLE,
                payload: {
                  answer_id: record.key,
                  quantifiable: e.currentTarget.checked,
                },
              });
            }}
          />
        ) : null,
      width: "5%",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Confirm Deletion?"
            okType="danger"
            okText="Delete"
            onConfirm={() => handleDelete(record.key)}
          >
            <img className="GlobalEditorDelete" src={X} alt="Delete" />
          </Popconfirm>
        ) : null,
      width: "1%",
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.costReducer.costTableServices
  );
  const serviceOptions = useSelector(
    (state) => state.questionReducer.answerList
  );
  const [newService, setNewService] = useState(null);

  useEffect(() => {
    dispatch({ type: LOAD_ALL_COST });
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  const handleDelete = (key) => {
    dispatch({ type: DELETE_SERVICE, payload: key });
  };
  const handleAdd = () => {
    if (newService !== null) {
      const newDataInternal = {
        answer_id: newService.answer_id,
        org_type: "Internal",
        cost: 0,
        cost_id: uuid(),
        quantifiable: false,
      };
      const newDataExternal = {
        answer_id: newService.answer_id,
        org_type: "External",
        cost: 0,
        cost_id: uuid(),
        quantifiable: false,
      };
      const newDataIndustry = {
        answer_id: newService.answer_id,
        org_type: "Industry",
        cost: 0,
        cost_id: uuid(),
        quantifiable: false,
      };
      dispatch({ type: UPDATE_COST, payload: newDataInternal });
      dispatch({ type: UPDATE_COST, payload: newDataExternal });
      dispatch({ type: UPDATE_COST, payload: newDataIndustry });
    }
  };
  const handleSave = (row) => {
    const newData = {
      answer_id: row.key,
      org_type: row.dataIndex.charAt(0).toUpperCase() + row.dataIndex.slice(1),
      cost: row[row.dataIndex].slice(1),
      cost_id: row.idMap[row.dataIndex],
      quantifiable: row.quantifiable,
    };
    dispatch({ type: UPDATE_COST, payload: newData });
  };

  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
          dataIndex,
        });
      } catch (errInfo) {
        console.log(`Saving table data failed: ${errInfo}`);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
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
        handleSave,
      }),
    };
  });

  return (
    <div>
      <div className="addService">
        <select
          className="ServiceQuestionSelect"
          defaultValue={"Select your service question here..."}
          onChange={(event) => {
            const selected = JSON.parse(event.target.value);
            setNewService(selected);
          }}
        >
          {newService === null && (
            <option value="Select your service question here..." disabled>
              Select your service question here...
            </option>
          )}
          {Object.values(serviceOptions)
            .flat()
            .map((question) => (
              <option key={question.answer_id} value={JSON.stringify(question)}>
                {question.question}-{question.answer}
              </option>
            ))}
        </select>
        <button
          className="BillingAddButton"
          style={{
            backgroundColor: appColor.lightGray,
            color: appColor.gray,
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4CAF50";
            e.target.style.color = "#FFFFFF";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = appColor.lightGray;
            e.target.style.color = appColor.gray;
          }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <Table
        className="table"
        pagination={false}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={renderedColumns}
      />
    </div>
  );
};

export default CostTable;
