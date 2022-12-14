import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_CELL_DATA,
} from "../../redux/actions/costActions";
import { Table, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";

const InvoiceTable = () => {
  const columns = [
    {
      title: "SOW #",
      dataIndex: "fk_sow_id",
      key: "fk_sow_id",
      editable: false,
    },
    {
      title: "Task",
      dataIndex: "name",
      key: "name",
      editable: false,
    },
    {
      title: "Completion Date",
      dataIndex: "completedTime",
      key: "completedTime",
      editable: false,
    },
    {
      title: "Project",
      dataIndex: "billable_id",
      key: "billable_id",
      editable: false,
    },
    {
      title: "Bill Amount",
      dataIndex: "cost",
      key: "cost",
      editable: false,
    }
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.billingReducer.billingList
  );
  console.log(dataSource)
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch({ type: SAVE_CELL_DATA, payload: newData });
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

export default InvoiceTable;
