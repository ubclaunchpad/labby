import "./index.css";
import X from "../../assets/X.png";
import {
  SET_ACTIVE_CONFIRMATION,
  SET_INVOICE_LIST,
} from "../../redux/actions/billingActions";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Table } from "antd";
import { appColor } from "../../constants";
import GenerateInvoice from "../GenerateInvoice";

function SelectedInvoice() {
  const dispatch = useDispatch();
  const invoiceList = useSelector((state) => state.billingReducer.invoiceList);
  const columns = [
    {
      title: "SOW #",
      dataIndex: "task_id",
      key: "task_id",
      editable: false,
      render: (_, record) =>
        invoiceList.length >= 1 ? (
          <div>
            SOW-{record.task_id ?? record.fk_task_id ?? record.task_uuid}
          </div>
        ) : null,
      sorter: (a, b) =>
        (a.task_id ?? a.fk_task_id ?? 0) - (b.task_id ?? b.fk_task_id ?? 0),
    },
    {
      title: "Service",
      dataIndex: "name",
      key: "name",
      editable: false,
      render: (_, record) =>
        invoiceList.length >= 1 ? (
          <div>
            <div>{record.name}</div>
            {record.sample_id ? (
              <span className="subtaskInvoiceLabel">
                {record.sample_id} - {record.authorized_by}
              </span>
            ) : null}
          </div>
        ) : null,
    },
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      editable: false,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      editable: false,
      render: (_, record) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(record.createdDate);
        return invoiceList.length >= 1 ? (
          <div>{date.toLocaleDateString("en-US", options)}</div>
        ) : null;
      },
      sorter: (a, b) =>
        (new Date(a.createdDate).getTime() ?? 0) -
        (new Date(b.createdDate).getTime() ?? 0),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: false,
      render: (_, record) =>
        invoiceList.length >= 1 ? (
          <div>{record.sample_id ? 1 : record.quantity}</div>
        ) : null,
    },
    {
      title: "Unit Cost",
      dataIndex: "cost",
      key: "cost",
      editable: false,
      render: (_, record) =>
        invoiceList.length >= 1 ? (
          <div>{record.cost}</div>
        ) : null,
    },
    {
      title: "Billed",
      dataIndex: "billed",
      key: "billed",
      render: (_, record) => {
        return invoiceList.length >= 1 ? (
          <div>{record.billed ? "Yes" : "No"}</div>
        ) : null;
      },
    },
    {
      title: "Select",
      dataIndex: "quantifiable",
      key: "quantifiable",
      render: (_, record) =>
        invoiceList.length >= 1 ? (
          <Checkbox
            checked={invoiceList.some(
              (item) =>
                item.billable_id + (item.sample_id ?? "") ===
                record.billable_id + (record.sample_id ?? "")
            )}
            onClick={(e) => {
              if (e.target.checked) {
                dispatch({
                  type: SET_INVOICE_LIST,
                  payload: [...invoiceList, record],
                });
              } else {
                dispatch({
                  type: SET_INVOICE_LIST,
                  payload: invoiceList.filter(
                    (item) =>
                      item.billable_id + (item.sample_id ?? "") !==
                      record.billable_id + (record.sample_id ?? "")
                  ),
                });
              }
            }}
          />
        ) : null,
      width: "5%",
    },
  ];
  const renderedColumns = columns.map((col) => {
    return col;
  });

  return (
    <div className="selectedInvoiceModal">
      <div className="modal-content">
        <div className="selectedInvoiceTitle">
          <h2 style={{ color: appColor.gray }}>
            Services Selected For Billing
          </h2>
          <img
            className="selectedModalClose"
            src={X}
            alt="Close"
            onClick={() => {
              dispatch({ type: SET_ACTIVE_CONFIRMATION });
            }}
          />
        </div>
        <div className="service-confirm-table">
          <Table
            className="selectedTable"
            pagination={false}
            dataSource={invoiceList}
            rowKey={(record) => record.billable_id + (record.sample_id ?? "")}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "editable-row" : "editable-row-dark"
            }
            columns={renderedColumns}
          />
          <div className="generateButtonView">
            <div
              className="generate-invoice-button"
              onClick={() => {
                dispatch({ type: SET_ACTIVE_CONFIRMATION });
              }}
            >
              <GenerateInvoice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedInvoice;
