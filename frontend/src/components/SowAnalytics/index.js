import "./index.css";
import X from "../../assets/X.png";
import { SET_ACTIVE_SOW_ANALYTICS } from "../../redux/actions/billingActions";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { appColor, ticketsColors } from "../../constants";
// import { useEffect, useState } from "react";

function SowAnalytics() {
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

  const projectList = useSelector(
    (state) => state.projectReducer.projectList
  );
  const projectMapping = projectList.reduce((acc, { project_id, project_name }) => {
    acc[project_id] = project_name;
    return acc;
  }, {}); 

  const projectsCount = dataSource.reduce((acc, { fk_project_id }) => {
    if (acc[fk_project_id]) {
      acc[fk_project_id] += 1;
    } else {
        acc[fk_project_id] = 1;
      }
    return acc;
  }, {});
  const categories = Object.keys(projectsCount).map(project => projectMapping[project]);
  const data = Object.values(projectsCount);
  var sowChart = 
    { series: data,
        options: {
          chart: {
            type: 'polarArea',
          },
          labels: categories,
          colors: [ ticketsColors[0], ticketsColors[1], ticketsColors[2], ticketsColors[3], ticketsColors[4] ],
          stroke: {
            colors: ['#fff']
          },
          fill: {
            opacity: 0.8
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
            }
          }],
          legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'center',
            offsetY: '1',
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: 500,
            width: 200,
            itemMargin: {
                vertical: 7
                },
            },
        }
      };
  return (
    <div className="sow-modal">
      <div className="sow-modal-content">
        <div className="sowAnalyticsTitle">
          <h2 style={{ color: appColor.gray }}>SOW Count by Project</h2>
          <img
            className="modalClose"
            src={X}
            alt="Delete"
            onClick={() => {
              dispatch({ type: SET_ACTIVE_SOW_ANALYTICS });
            }}
            />
        </div>
        <div className="sow-chart">
          <Chart 
              options={sowChart.options} 
              series={sowChart.series} 
              type="polarArea" 
              width="90%" 
              height="100%"
          />
        </div>
      </div>
    </div>
  );
}
  
export default SowAnalytics;