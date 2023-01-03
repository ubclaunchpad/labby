import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SERVICE,
  DELETE_SERVICE,
  LOAD_ALL_COST,
  UPDATE_COST,
} from "../../redux/actions/costActions";
import { Table, Form, Popconfirm, Input } from "antd";
import { appColor } from "../../constants";
import "antd/dist/antd.min.css";
import "./index.css";

const CostTable = () => {
  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      editable: false,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: false,
      width: "60%",
    },
    {
      title: "Internal",
      dataIndex: "internal",
      key: "internal",
      editable: true,
    },
    {
      title: "External",
      dataIndex: "external",
      key: "external",
      editable: true,
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <p>Delete</p>
          </Popconfirm>
        ) : null,
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.costReducer.costTableServices
  );

  useEffect(() => {
    dispatch({ type: LOAD_ALL_COST });
  }, [dispatch]);

  const [count, setCount] = useState(3);

  const handleDelete = (key) => {
    dispatch({ type: DELETE_SERVICE, payload: key });
  };
  const handleAdd = () => {
    const newData = {
      key: count + 1,
      service: `New Service ${count}`,
      description: "Click here to edit... ",
      internal: "$",
      external: "$",
      industry: "$",
    };
    dispatch({ type: ADD_SERVICE, payload: newData });
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = {
      answer_id: row.key,
      org_type: row.dataIndex.charAt(0).toUpperCase() + row.dataIndex.slice(1),
      cost: row[row.dataIndex].slice(1),
      cost_id: row.idMap[row.dataIndex],
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
          value="Select your service question here..."
          onChange={() => {}}
        >
          <option value="Select your service question here..." disabled>
            Select your service question here...
          </option>
          <option value="sectioning">Sectioning</option>
          <option value="macrodisection">Macrodisection</option>
          <option value="scrolling">Scrolling</option>
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
