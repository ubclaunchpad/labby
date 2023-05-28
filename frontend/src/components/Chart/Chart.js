import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";
import { useSelector } from "react-redux";

export const Chart = ({ data }) => {
  const invoiceDataSource = useSelector(
    (state) => state.billingReducer.billingList
  );

  let billingMapping = {};

  invoiceDataSource.forEach((invoice) => {
    const invoiceDate = invoice.createdDate;
    if (invoiceDate) {
      const date = new Date(invoiceDate);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(date);
      const monthID = monthName + " " + year;

      if (billingMapping[monthID]) {
        billingMapping[monthID].Total += 1;
      } else {
        billingMapping[monthID] = { name: monthID, sortIndex: year + "" + (month < 10 ? "0" + month : month), Total: 1 };
      }
    }
  });

  return (
    <div className="chart">
      <ResponsiveContainer width="98%" aspect={2.3}>
        <AreaChart
          width={500}
          height={180}
          data={Object.values(billingMapping).sort((a, b) => a.sortIndex - b.sortIndex)}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8A9DF8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8A9DF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" dy={5} />
          <YAxis domain={[0, "dataMax +1"]} />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#5974E9"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
