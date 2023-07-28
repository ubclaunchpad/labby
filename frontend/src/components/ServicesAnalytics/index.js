import "./index.css";
import X from "../../assets/X.png";
import { SET_ACTIVE_ANALYTICS } from "../../redux/actions/billingActions";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
// import { Table } from "antd";
import { appColor } from "../../constants";
// import { useEffect, useState } from "react";

function ServicesAnalytics() {
  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.billingReducer.billingList
  ).filter((item) => item.cost > 0);

  // const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   const seenMap = {};
  //   const ds = rawDataSource.filter((item) => {
  //     if (seenMap[item.billable_id]) return false;
  //     seenMap[item.billable_id] = true;
  //     return true;
  //   });
  //   setDataSource(ds);
  // }, [rawDataSource]);

  // const columns = [
  //   {
  //     title: "Service",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Project",
  //     dataIndex: "fk_project_id",
  //     key: "fk_project_id",
  //   },
  //   {
  //     title: "Created Date",
  //     dataIndex: "createdDate",
  //     key: "createdDate",
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //   },
  //   {
  //     title: "Cost",
  //     dataIndex: "cost",
  //     key: "cost",
  //   },
  // ];
  // const renderedColumns = columns.map((col) => {
  //     return col;
  // });
  const serviceCostsSum = dataSource.reduce((acc, { name, cost }) => {
    if (acc[name]) {
      acc[name] += cost;
    } else {
      if (cost !== 0) {
        acc[name] = cost;
      }
    }
    return acc;
  }, {});
  //get costs in descending order
  const uniqueServices = Object.entries(serviceCostsSum)
    .map(([name, cost]) => ({ serviceName: name, cost }))
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5);
  const categories = uniqueServices.map(service => service.serviceName);
  const costData = uniqueServices.map(service => service.cost);
  const servicesChart = {
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
      colors: ['#8A9DF8'],
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
    },
    series: [{
      name: "Total Cost",
      data: costData,
    }],
  };

  return (
    <div className="modal">
      <div className="services-modal-content">
        <div className="serviceAnalyticsTitle">
          <h2 style={{ color: appColor.gray }}>Top Services Cost Breakdown</h2>
          <img
            className="modalClose"
            src={X}
            alt="Delete"
            onClick={() => {
              dispatch({ type: SET_ACTIVE_ANALYTICS });
            }}
            />
        </div>
        <div className="service-chart">
          <Chart 
              options={servicesChart.options}
              series={servicesChart.series}
              type="bar"
              width="90%"
          />
        </div>
        {/* <div className="service-details-table">
          <Table
            className="table"
            pagination={false}
            bordered
            dataSource={dataSource}
            columns={renderedColumns}
          />
        </div> */}
      </div>
    </div>
  );
}
  
export default ServicesAnalytics;
