import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Popconfirm, Input, Select } from "antd";
import { appColor } from "../../constants";
import "antd/dist/antd.min.css";
import "./index.css";
import X from "../../assets/X.png";
import uuid from "react-uuid";
import {
  DELETE_PROJECT,
  GET_COSTCENTER,
  GET_PROJECT,
  POST_PROJECT,
  UPDATE_PROJECT_ASSIGNMENT,
} from "../../redux/actions/billingActions";

const ProjectTable = () => {
  const columns = [
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      editable: true,
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "project_description",
      key: "project_description",
      editable: true,
      width: "20%",
    },
    {
      title: "Assigned Cost Center",
      dataIndex: "costcenter",
      key: "costcenter",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            value={record.costcenter.map((costcenter) => {
              return {
                label: costcenter.cost_center_name,
                value: costcenter.cost_center_id,
              };
            })}
            onChange={(newList) => {
              dispatch({
                type: UPDATE_PROJECT_ASSIGNMENT,
                payload: {
                  project_id: record.project_id,
                  newAssignmentList: newList.map((costcenterId) => {
                    return {
                      assignment_id: uuid(),
                      costcenter_id: costcenterId,
                      project_id: record.project_id,
                    };
                  }),
                },
              });
            }}
            options={costcenterList.map((costcenter) => {
              return {
                label: costcenter.cost_center_name,
                value: costcenter.cost_center_id,
              };
            })}
          />
        ) : null,
      width: "59%",
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
            onConfirm={() => handleDelete(record.project_id)}
          >
            <img className="GlobalEditorDelete" src={X} alt="Delete" />
          </Popconfirm>
        ) : null,
      width: "1%",
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.projectReducer.projectList);
  const costcenterList = useSelector(
    (state) => state.costCenterReducer.costcenterList
  );

  useEffect(() => {
    dispatch({ type: GET_PROJECT });
    dispatch({ type: GET_COSTCENTER });
  }, [dispatch]);

  const handleDelete = (key) => {
    dispatch({ type: DELETE_PROJECT, payload: key });
  };
  const handleAdd = () => {
    const newData = {
      project_name: `New Project`,
      project_description: "",
      project_id: uuid(),
    };
    dispatch({ type: POST_PROJECT, payload: newData });
  };
  const handleSave = (row) => {
    dispatch({ type: POST_PROJECT, payload: row });
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
        className="table"
        pagination={false}
        components={components}
        rowKey={(record) => record.project_id}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={renderedColumns}
      />
    </div>
  );
};

export default ProjectTable;
