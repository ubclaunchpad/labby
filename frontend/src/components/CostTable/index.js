import React, { useState, useRef, useContext, useEffect } from "react";
import { Table, Form, Popconfirm, Button, Input } from "antd";
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
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
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
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // TODO: replace with redux
  const [count, setCount] = useState(3);
  const dataSourceData = [
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
  const [dataSource, setDataSource] = useState(dataSourceData);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const handleAdd = () => {
    const newData = {
      key: count+1,
      service: `New Service ${count}`,
      description: "Description goes here",
      internal: "$",
      external: "$",
      industry: "$",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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
      {/* <Table className="table" dataSource={dataSource} pagination={false}>
        {columns.map((column) => {
          return (
            <Column
              title={column.title}
              dataIndex={column.dataIndex}
              key={column.key}
            />
          );
        })}
      </Table> */}
      <Table
        className="table"
        pagination={false}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={renderedColumns}
      />
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
    </div>
  );
};

export default CostTable;
