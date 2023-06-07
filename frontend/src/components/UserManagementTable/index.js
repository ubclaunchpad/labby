import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Popconfirm, Input, Select } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { DELETE_USER, GET_ORGANIZATION, LOAD_USERLIST, UPDATE_USER } from "../../redux/actions/userActions";
import X from "../../assets/X.png";

const UserManagementTable = () => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "username",
      key: "username",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "Organization",
      dataIndex: "fk_organization_id",
      key: "fk_organization_id",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            value={orgList.filter((item) => item.organization_id === record.fk_organization_id).map((org) => {
              return {
                label: org.organization_name,
                value: org.organization_id,
              };
            })}
            onChange={(newList) => {
              dispatch({ type: UPDATE_USER, payload: { ...record, fk_organization_id: newList } });
            }}
            options={orgList.map((org) => {
              return {
                label: org.organization_name,
                value: org.organization_id,
              };
            })}
          />
        ) : null,
    },
    {
      title: "MAPcore Employee",
      dataIndex: "employee",
      key: "employee",
      editable: true,
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
            onConfirm={() => handleDelete(record.user_id)}
          >
            <img className="GlobalEditorDelete" src={X} alt="Delete" />
          </Popconfirm>
        ) : null,
      width: "1%",
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.userReducer.userList);
  const orgList = useSelector((state) => state.userReducer.organizationList);

  useEffect(() => {
    dispatch({ type: LOAD_USERLIST });
    dispatch({ type: GET_ORGANIZATION });
  }, [dispatch]);

  const handleDelete = (key) => {
    dispatch({ type: DELETE_USER, payload: { user_id: key } });
  };
  const handleSave = (row) => {
    dispatch({ type: UPDATE_USER, payload: row });
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
          style={{ width: "14vw" }}
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
    <Table
      className="userTable"
      pagination={false}
      components={components}
      rowKey={(record) => record.user_id}
      rowClassName={(_, index) => index % 2 === 0 ? "editable-row" : "editable-row-dark"}
      dataSource={dataSource}
      columns={renderedColumns}
    />
  );
};

export default UserManagementTable;
