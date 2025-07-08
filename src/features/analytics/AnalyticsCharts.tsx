import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export default function AnalyticsCharts() {
  // Placeholder data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Positive', data: [10, 20, 30, 40, 50], backgroundColor: '#60a5fa', borderColor: '#60a5fa' },
      { label: 'Negative', data: [5, 10, 15, 20, 25], backgroundColor: '#f87171', borderColor: '#f87171' },
    ],
  };
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold mb-2">Line Chart</h3>
        <Line data={data} />
      </div>
      <div>
        <h3 className="font-bold mb-2">Bar Chart</h3>
        <Bar data={data} />
      </div>
      <div>
        <h3 className="font-bold mb-2">Pie Chart</h3>
        <Pie data={{
          labels: ['Positive', 'Negative'],
          datasets: [{ data: [100, 50], backgroundColor: ['#60a5fa', '#f87171'] }],
        }} />
      </div>
    </div>
  );
} 