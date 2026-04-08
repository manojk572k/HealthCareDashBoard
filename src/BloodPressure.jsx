import "./DiagnosisHistory.css";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

/* ---------------- CHART ---------------- */
function BloodPressureChart({ data = [] }) {
  const labels = data.map((item) => `${item.month}, ${item.year}`);

  const systolic = data.map(
    (item) => item.blood_pressure.systolic.value
  );

  const diastolic = data.map(
    (item) => item.blood_pressure.diastolic.value
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Systolic",
        data: systolic,
        borderColor: "#d864c4",
        backgroundColor: "#d864c4",
        pointBackgroundColor: "#d864c4",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Diastolic",
        data: diastolic,
        borderColor: "#7a61d8",
        backgroundColor: "#7a61d8",
        pointBackgroundColor: "#7a61d8",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return <Line data={chartData} options={options} />;
}

/* ---------------- VITAL CARD ---------------- */
function VitalCard({ variant, icon, title, value, status, trend }) {
  return (
    <div className={`vital-card ${variant}`}>
      <div className="vital-icon-wrap">
        <img src={icon} alt={title} className="vital-icon-img" />
      </div>

      <h4 className="vital-title">{title}</h4>
      <p className="vital-value">{value}</p>

      <div className="vital-status">
        {trend && (
          <span className="trend-icon">
            {trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </span>
        )}
        <span>{status}</span>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function BloodPressure({ data = [] }) {
  const latest = data[data.length - 1];

  if (!latest) {
    return <div>No diagnosis data available</div>;
  }

  return (
    <section className="diagnosis-section">
      <h2 className="diagnosis-title">Diagnosis History</h2>

      {/* -------- BLOOD PRESSURE -------- */}
      <div className="bp-card">
        <div className="bp-left">
          <div className="bp-header">
            <h3>Blood Pressure</h3>

            <button className="range-btn" type="button">
              <span>Last 6 months</span>
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="chart-area">
            <BloodPressureChart data={data} />
          </div>
        </div>

        {/* -------- METRICS -------- */}
        <div className="bp-right">
          <div className="metric-block">
            <div className="metric-label-row">
              <span className="metric-dot pink"></span>
              <p className="metric-label">Systolic</p>
            </div>

            <h3 className="metric-value">
              {latest.blood_pressure.systolic.value}
            </h3>

            <div className="metric-note">
              <ArrowUp size={16} />
              <span>{latest.blood_pressure.systolic.levels}</span>
            </div>
          </div>

          <hr />

          <div className="metric-block">
            <div className="metric-label-row">
              <span className="metric-dot purple"></span>
              <p className="metric-label">Diastolic</p>
            </div>

            <h3 className="metric-value">
              {latest.blood_pressure.diastolic.value}
            </h3>

            <div className="metric-note">
              <ArrowDown size={16} />
              <span>{latest.blood_pressure.diastolic.levels}</span>
            </div>
          </div>
        </div>
      </div>

      {/* -------- VITALS -------- */}
      <div className="vitals-row">
        <VitalCard
          variant="respiratory"
          icon="https://cdn-icons-png.flaticon.com/512/3019/3019989.png"
          title="Respiratory Rate"
          value={`${latest.respiratory_rate.value} bpm`}
          status={latest.respiratory_rate.levels}
        />

        <VitalCard
          variant="temperature"
          icon="https://cdn-icons-png.flaticon.com/512/1684/1684375.png"
          title="Temperature"
          value={`${latest.temperature.value}°F`}
          status={latest.temperature.levels}
        />

        <VitalCard
          variant="heart"
          icon="https://cdn-icons-png.flaticon.com/512/833/833472.png"
          title="Heart Rate"
          value={`${latest.heart_rate.value} bpm`}
          status={latest.heart_rate.levels}
          trend="down"
        />
      </div>
    </section>
  );
}