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

function BloodPressureChart() {
  const data = {
    labels: ["Oct, 2023", "Nov, 2023", "Dec, 2023", "Jan, 2024", "Feb, 2024", "Mar, 2024"],
    datasets: [
      {
        label: "Systolic",
        data: [120, 115, 160, 111, 149, 157],
        borderColor: "#d864c4",
        backgroundColor: "#d864c4",
        pointBackgroundColor: "#d864c4",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 8,
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: "Diastolic",
        data: [108, 65, 108, 91, 70, 76],
        borderColor: "#7a61d8",
        backgroundColor: "#7a61d8",
        pointBackgroundColor: "#7a61d8",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 8,
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: {
        top: 8,
        right: 8,
        bottom: 0,
        left: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#0f2b3a",
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          color: "#0f2b3a",
          font: {
            size: 14,
            weight: 500,
          },
          padding: 12,
        },
        grid: {
          color: "#c9c3d3",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

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

export default function DiagnosisHistory() {
  return (
    <section className="diagnosis-section">
      <h2 className="diagnosis-title">Diagnosis History</h2>

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
            <BloodPressureChart />
          </div>
        </div>

        <div className="bp-right">
          <div className="metric-block">
            <div className="metric-label-row">
              <span className="metric-dot pink"></span>
              <p className="metric-label">Systolic</p>
            </div>

            <h3 className="metric-value">160</h3>

            <div className="metric-note">
              <ArrowUp size={16} />
              <span>Higher than Average</span>
            </div>
          </div>

          <hr />

          <div className="metric-block">
            <div className="metric-label-row">
              <span className="metric-dot purple"></span>
              <p className="metric-label">Diastolic</p>
            </div>

            <h3 className="metric-value">78</h3>

            <div className="metric-note">
              <ArrowDown size={16} />
              <span>Lower than Average</span>
            </div>
          </div>
        </div>
      </div>

      <div className="vitals-row">
        <VitalCard
          variant="respiratory"
          icon="https://cdn-icons-png.flaticon.com/512/3019/3019989.png"
          title="Respiratory Rate"
          value="20 bpm"
          status="Normal"
        />

        <VitalCard
          variant="temperature"
          icon="https://cdn-icons-png.flaticon.com/512/1684/1684375.png"
          title="Temperature"
          value="98.6°F"
          status="Normal"
        />

        <VitalCard
          variant="heart"
          icon="https://cdn-icons-png.flaticon.com/512/833/833472.png"
          title="Heart Rate"
          value="78 bpm"
          status="Lower than Average"
          trend="down"
        />
      </div>
    </section>
  );
}