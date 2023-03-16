import "./index.css";
import X from "../../assets/X.png";
import { SET_ACTIVE_ANALYTICS } from "../../redux/actions/billingActions";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { Table } from "antd";
import { appColor } from "../../constants";

function ServicesAnalytics() {
  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.billingReducer.billingList
  ).filter((item) => item.cost > 0);

  const columns = [
    {
      title: "Service",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Project",
      dataIndex: "billable_id",
      key: "billable_id",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
  ];
  const renderedColumns = columns.map((col) => {
      return col;
  });
  const serviceCostsSum = dataSource.reduce((acc, { name, cost }) => {
    if (acc[name]) {
      acc[name] += cost;
    } else {
      if (cost != 0) {
        acc[name] = cost;
      }
    }
    return acc;
  }, {});
  //get costs in descending order
  const uniqueServices = Object.entries(serviceCostsSum)
    .map(([name, cost]) => ({ serviceName: name, cost }))
    .sort((a, b) => b.cost - a.cost);
  const categories = uniqueServices.map(service => service.serviceName);
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].length > 15) {
      categories[i] = [      categories[i].substring(0, 15),
        categories[i].substring(15)
      ];
    }
  }
  const costData = uniqueServices.map(service => service.cost);
  const graph = {
    options: {
      chart: {
        dropShadow: {
        enabled: false },
        id: "basic-bar",
        toolbar: false,
        plotOptions: {
          bar: {
          borderRadius: 6,
          horizontal: true,
          columnWidth: '100%',
        }},
      },
      padding: 0,
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: true,
        formatter: 
          function (val) {
              return "$" + val
          },
        style: {
          colors: ['#fff']
        },
        formatter: function(value) {
          return "$" + value
        },
        dropShadow: {
          enabled: false
        }
      },
      tooltip: {
        y: {
          title: "Total Cost"
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          show: false,
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            colors: appColor.gray,
            trim: false,
          }
        },
      },
      fill: {
        colors: ['#8A9DF8']
      }
    },
    series: [{
      name: "Total Cost",
      data: costData,
    }],
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="serviceAnalyticsTitle">
          <h2 style={{ color: appColor.gray }}>Services: Total Cost Analysis</h2>
          <img
            className="modalClose"
            src={X}
            alt="Delete"
            onClick={() => {
              dispatch({ type: SET_ACTIVE_ANALYTICS });
            }}
            />
        </div>
        <div className = "chart">
          <Chart 
              options={graph.options}
              series={graph.series}
              type="bar"
              width="90%"
          />
        </div>
        <div className="service-details-table">
          <Table
            className="table"
            pagination={false}
            bordered
            dataSource={dataSource}
            columns={renderedColumns}
          />
        </div>
      </div>
    </div>
  );
}
  
  export default ServicesAnalytics;
