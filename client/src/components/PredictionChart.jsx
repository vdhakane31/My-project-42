import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Legend, Tooltip);

const PredictionChart = ({ confidence }) => {
  const selected = Number(confidence || 0);
  const notSelected = Math.max(0, 100 - selected);

  const data = {
    labels: ['Selected chance', 'Not selected chance'],
    datasets: [
      {
        label: 'Prediction confidence',
        data: [selected, notSelected],
        backgroundColor: ['#4f46e5', '#f43f5e']
      }
    ]
  };

  return (
    <div className="mx-auto max-w-xs">
      <Doughnut data={data} />
    </div>
  );
};

export default PredictionChart;
