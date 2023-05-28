import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_CELL_DATA } from "../../redux/actions/costActions";
import { Table, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { SET_INVOICE_LIST } from "../../redux/actions/billingActions";

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.billingReducer.billingList);
  const invoiceList = useSelector((state) => state.billingReducer.invoiceList);

  const columns = [
    {
      title: "SOW #",
      dataIndex: "task_id",
      key: "task_id",
      editable: false,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>SOW-{record.task_id ?? record.fk_task_id ?? record.task_uuid}</div>
        ) : null,
      sorter: (a, b) => (a.task_id ?? a.fk_task_id ?? 0) - (b.task_id ?? b.fk_task_id ?? 0)
    },
    {
      title: "Service",
      dataIndex: "name",
      key: "name",
      editable: false,
    },
    {
      title: "Project",
      dataIndex: "billable_id",
      key: "billable_id",
      editable: false,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      editable: false,
      render: (_, record) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(record.createdDate);
        return dataSource.length >= 1 ? (
          <div>{date.toLocaleDateString("en-US", options)}</div>
        ) : null
      },
      sorter: (a, b) => (new Date(a.createdDate).getTime() ?? 0) - (new Date(b.createdDate).getTime() ?? 0),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      editable: false,
    },
    {
      title: "Billed",
      dataIndex: "billed",
      key: "billed",
      render: (_, record) => {
        return dataSource.length >= 1 ? (
          <div>{record.billed ? "Yes" : "No"}</div>
        ) : null
      },
    },
    Table.SELECTION_COLUMN
  ];

  useEffect(() => {
    dispatch({ type: SET_INVOICE_LIST, payload: [] });
  }, [dispatch]);

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
        className="invoiceTable"
        pagination={false}
        rowSelection={{
          onChange: (_, rowsSelected) => {
            dispatch({
              type: SET_INVOICE_LIST,
              payload: rowsSelected,
            });
          },
          selectedRowKeys: invoiceList.map((item) => item.billable_id),
        }
        }
        components={components}
        rowKey={(record) => record.billable_id}
        rowClassName={(_, index) => index % 2 === 0 ? "editable-row" : "editable-row-dark"}
        dataSource={dataSource}
        columns={renderedColumns}
      />
    </div>
  );
};

export default InvoiceTable;
