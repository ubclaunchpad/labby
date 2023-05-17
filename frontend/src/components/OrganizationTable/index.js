import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Popconfirm, Input, Select } from "antd";
import { appColor } from "../../constants";
import "antd/dist/antd.min.css";
import "./index.css";
import X from "../../assets/X.png";
import {
  DELETE_ORGANIZATION,
  GET_ORGANIZATION,
  POST_ORGANIZATION,
  UPDATE_ORG_ASSIGNMENT,
} from "../../redux/actions/userActions";
import uuid from "react-uuid";
import { GET_PROJECT } from "../../redux/actions/billingActions";

const OrganizationTable = () => {
  const columns = [
    {
      title: "Organization",
      dataIndex: "organization_name",
      key: "organization_name",
      editable: true,
      width: "20%",
    },
    {
      title: "Assigned Projects",
      dataIndex: "projects",
      key: "projects",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            value={record.projects.map((project) => {
              return {
                label: project.project_name,
                value: project.project_id,
              };
            })}
            onChange={(newList) => {
              dispatch({
                type: UPDATE_ORG_ASSIGNMENT,
                payload: {
                  organization_id: record.organization_id,
                  newAssignmentList: newList.map((projectId) => {
                    return {
                      assignment_id: uuid(),
                      organization_id: record.organization_id,
                      project_id: projectId,
                    };
                  }),
                },
              });
            }}
            options={projectList.map((project) => {
              return {
                label: project.project_name,
                value: project.project_id,
              };
            })}
          />
        ) : null,
      width: "79%",
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
            onConfirm={() => handleDelete(record.organization_id)}
          >
            <img className="GlobalEditorDelete" src={X} alt="Delete" />
          </Popconfirm>
        ) : null,
      width: "1%",
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.userReducer.organizationList);
  const projectList = useSelector((state) => state.projectReducer.projectList);

  useEffect(() => {
    dispatch({ type: GET_ORGANIZATION });
    dispatch({ type: GET_PROJECT });
  }, [dispatch]);

  const handleDelete = (key) => {
    dispatch({ type: DELETE_ORGANIZATION, payload: key });
  };
  const handleAdd = () => {
    const newData = {
      organization_name: `New Organization`,
      internal_department: "New Dept",
      organization_address: "New Address",
      organization_contact: "New Contact",
      organization_email: "New Email",
      organization_id: uuid(),
      organization_type: "Internal",
    };
    dispatch({ type: POST_ORGANIZATION, payload: newData });
  };
  const handleSave = (row) => {
    dispatch({ type: POST_ORGANIZATION, payload: row });
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
      <div className="addService">
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
        className="orgTable"
        pagination={false}
        components={components}
        rowKey={(record) => record.organization_id}
        rowClassName={(_, index) => index % 2 === 0 ? "editable-row" : "editable-row-dark"}
        dataSource={dataSource}
        columns={renderedColumns}
      />
    </div>
  );
};

export default OrganizationTable;
