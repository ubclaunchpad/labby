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

export const Chart = ({ data }) => {
  let fakeData = [
    { name: "Jun", Total: 10 },
    { name: "Jul", Total: 21 },
    { name: "Aug", Total: 7 },
    { name: "Sep", Total: 14 },
    { name: "Oct", Total: 9 },
    { name: "Nov", Total: 19 },
    { name: "Dec", Total: 9 },
    { name: "Jan", Total: 1 },
  ];

  return (
    <div className="chart">
      {/* <div className="title">Impact </div> */}
      <ResponsiveContainer width="98%" aspect={2 / 0.9}>
        <AreaChart
          width={500}
          height={180}
          data={fakeData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8A9DF8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8A9DF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis domain={[0, "dataMax +1"]} />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
