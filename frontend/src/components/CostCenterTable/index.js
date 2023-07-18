import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Popconfirm, Input, Select } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import RejectUser from "../../assets/RejectUser.png";
import Add from "../../assets/AddBlack.png";
import uuid from "react-uuid";
import {
  DELETE_COSTCENTER,
  GET_COSTCENTER,
  POST_COSTCENTER,
} from "../../redux/actions/billingActions";

const costCenterTypes = ["Industry", "Internal", "External"];

const CostCenterTable = () => {
  const columns = [
    {
      title: "Cost Center",
      dataIndex: "cost_center_name",
      key: "cost_center_name",
      editable: true,
      width: "20%",
    },
    {
      title: "Principal Investigator",
      dataIndex: "cost_center_investigator",
      key: "cost_center_investigator",
      editable: true,
      width: "10%",
    },
    {
      title: "Billing Contact",
      dataIndex: "cost_center_contact",
      key: "cost_center_contact",
      editable: true,
      width: "10%",
    },
    {
      title: "Contact Address",
      dataIndex: "cost_center_address",
      key: "cost_center_address",
      editable: true,
      width: "20%",
    },
    {
      title: "Contact Email",
      dataIndex: "cost_center_email",
      key: "cost_center_email",
      editable: true,
      width: "10%",
    },
    {
      title: "Type",
      dataIndex: "cost_center_type",
      key: "cost_center_type",
      width: "9%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Select
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            value={{
              label: record.cost_center_type,
              value: record.cost_center_type,
            }}
            onChange={(newList) => {
              dispatch({ type: POST_COSTCENTER, payload: { ...record, cost_center_type: newList } });
            }}
            options={costCenterTypes.map((type) => {
              return {
                label: type,
                value: type,
              };
            })}
          />
        ) : null,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.cost_center_id)}
          >
            <img
              className="userListIcons"
              src={RejectUser}
              alt="Delete"
            />
          </Popconfirm>
        ) : null,
      width: "1%",
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.costCenterReducer.costcenterList
  );

  useEffect(() => {
    dispatch({ type: GET_COSTCENTER });
  }, [dispatch]);

  const handleDelete = (key) => {
    dispatch({ type: DELETE_COSTCENTER, payload: key });
  };
  const handleAdd = () => {
    const newData = {
      cost_center_id: uuid(),
      cost_center_name: "New Cost Center",
      cost_center_investigator: "New Investigator",
      cost_center_contact: "New Contact",
      cost_center_email: "New Email",
      cost_center_address: "New Address",
      cost_center_type: "Industry",
    };
    dispatch({ type: POST_COSTCENTER, payload: newData });
  };
  const handleSave = (row) => {
    dispatch({ type: POST_COSTCENTER, payload: row });
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
        className="costCenterTable"
        pagination={false}
        components={components}
        rowKey={(record) => record.cost_center_id}
        rowClassName={(_, index) => index % 2 === 0 ? "editable-row" : "editable-row-dark"}
        dataSource={dataSource}
        columns={renderedColumns}
        footer={() => {
          return (
            <div className="footerAddButton" onClick={handleAdd}>
              <img className="Add" src={Add} alt="Add" />
              <div className="ticketSectionTitle">Add</div>
            </div>
          )
        }}
      />
    </div>
  );
};

export default CostCenterTable;
