import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { LOAD_ALL_DRAFTS } from "../../redux/actions/formActions";
import { NavLink } from "react-router-dom";

const PendingTable = () => {
  const columns = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      editable: false,
      width: "30%",
    },
    {
      title: "Form",
      dataIndex: "form_name",
      key: "form_name",
      editable: false,
      width: "30%",
    },
    {
      title: "Organization",
      dataIndex: "organization_name",
      key: "organization_name",
      editable: false,
      width: "30%",
    },
    {
      title: "View",
      dataIndex: "external",
      key: "external",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <NavLink className="newService" to={`/request/${record.fk_form_id}/${record.fk_user_id}`}>
            View Form
          </NavLink>
        ) : null,
      width: "9%",
    }
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.formReducer.allDraftList
  );

  useEffect(() => {
    dispatch({ type: LOAD_ALL_DRAFTS });
  }, [dispatch]);

  const handleSave = (row) => {
    console.log(row);
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
      <Table
        className="costTable"
        pagination={false}
        components={components}
        rowClassName={(_, index) => index % 2 === 0 ? "editable-row" : "editable-row-dark"}
        dataSource={dataSource}
        columns={renderedColumns}
        rowKey={(record) => record.draft_id}
      />
    </div>
  );
};

export default PendingTable;
