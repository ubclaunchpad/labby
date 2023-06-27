import "./index.css";
import X from "../../assets/X.png";
import { SET_ACTIVE_PROJECT_ANALYTICS } from "../../redux/actions/billingActions";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { appColor, ticketsColors } from "../../constants";

function ProjectsAnalytics() {
  const dispatch = useDispatch();
  const dataSource = useSelector(
    (state) => state.billingReducer.billingList
  ).filter((item) => item.cost > 0);
  const projectList = useSelector(
    (state) => state.projectReducer.projectList
  );
  const projectMapping = projectList.reduce((acc, { project_id, project_name }) => {
    acc[project_id] = project_name;
    return acc;
  }, {});
  const projectsCostsSum = dataSource.reduce((acc, { fk_project_id, cost }) => {
    if (acc[fk_project_id]) {
      acc[fk_project_id] += cost;
    } else {
      if (cost !== 0) {
        acc[fk_project_id] = cost;
      }
    }
    return acc;
  }, {});
  const uniqueProjects = Object.entries(projectsCostsSum)
    .map(([fk_project_id, cost]) => ({ project: fk_project_id, cost }))
    .sort((a, b) => b.cost - a.cost);
  const categories = uniqueProjects.map(project => projectMapping[project.project]);
  const costData = uniqueProjects.map(project => project.cost);

  var projectsChart = {
    series: costData,
    options: {
      colors: [ticketsColors[0], ticketsColors[1], ticketsColors[2], ticketsColors[3], ticketsColors[4]],
      chart: {
        width: '50%',
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            value: {
              show: true,
              fontSize: '14px',
              fontFamily: undefined,
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return '$ ' + val
              },
            },
          }
        },
      },
      labels: categories,
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
          horizontal: 5,
          vertical: 7
        },
      },
    },
  }
  return (
    <div className="project-modal">
      <div className="project-modal-content">
        <div className="projectAnalyticsTitle">
          <h2 style={{ color: appColor.gray }}>Cost Breakdown By Project</h2>
          <img
            className="modalClose"
            src={X}
            alt="Delete"
            onClick={() => {
              dispatch({ type: SET_ACTIVE_PROJECT_ANALYTICS });
            }}
          />
        </div>
        <div className="project-charts">
          <Chart className="pieChart"
            options={projectsChart.options}
            series={projectsChart.series}
            type="radialBar"
            width="90%"
            height="95%"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectsAnalytics;