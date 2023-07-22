import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Popconfirm, Input, Select, Popover } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import Add from "../../assets/AddBlack.png";
import { ADMIN_RESET_PASSWORD, DELETE_USER, GET_ORGANIZATION, LOAD_USERLIST, POST_USER, UPDATE_USER } from "../../redux/actions/userActions";
import RejectUser from "../../assets/RejectUser.png";
import uuid from "react-uuid";

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
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Select
            data-testid={"employeeSelect_" + record.email}
            showSearch
            style={{ width: "100%" }}
            placeholder="Assign as employee"
            defaultValue={{
              label: "No",
              value: false,
            }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={{
              label: record.employee ? "Yes" : "No",
              value: record.employee,
            }}
            onChange={(newValue) => {
              dispatch({ type: UPDATE_USER, payload: { ...record, employee: newValue } });
            }}
            options={[
              {
                label: "Yes",
                value: true,
              },
              {
                label: "No",
                value: false,
              }
            ]}
          />
        ) : null,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popover
            content={
              <div>
                <input className="LoginInput" placeholder="New Password" type={"password"} />
                <div className="SaveNewPassword" onClick={() => {
                  const password = document.getElementsByClassName("LoginInput")[0].value;
                  if (password && password !== "") {
                    dispatch({
                      type: ADMIN_RESET_PASSWORD,
                      payload: {
                          email: record.email,
                          password: password,
                      },
                    });
                    document.getElementsByClassName("LoginInput")[0].value = "";
                    setResetPasswordRecord(null);
                  }
                }}>Save</div>
              </div>
              }
            title="Change User's Password"
            trigger="click"
            open={resetPasswordRecord === record.user_id}
            onOpenChange={(open) => {
              setResetPasswordRecord(open ? record.user_id : null);
            }}
          >
            <div className="resetPasswordButton">Reset Password</div>
          </Popover>
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
            onConfirm={() => handleDelete(record.user_id)}
          >
            <img
              data-testid={"employeeDelete_" + record.email}
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
  const [resetPasswordRecord, setResetPasswordRecord] = useState();
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
  const handleAdd = () => {
    const newID = uuid();
    const newData = {
      user_id: newID,
      fk_organization_id: null,
      username: "New User",
      email: "New User Email",
      employee: false,
      password: "password",
      adminCreated: true,
    };
    dispatch({
      type: POST_USER,
      payload: newData
    });
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
      footer={() => {
        return (
          <div className="footerAddButton" onClick={handleAdd}>
            <img className="Add" src={Add} alt="Add" />
            <div className="ticketSectionTitle">Add</div>
          </div>
        )
      }}
    />
  );
};

export default UserManagementTable;
