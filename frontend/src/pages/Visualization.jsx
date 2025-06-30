import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Visualization = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [averageWaterYield, setAverageWaterYield] = useState(0);
  const [energyEfficiency, setEnergyEfficiency] = useState(0);
  const [systemUptime, setSystemUptime] = useState(0);
  const [waterYieldTrend, setWaterYieldTrend] = useState(0);
  const [energyEfficiencyTrend, setEnergyEfficiencyTrend] = useState(0);
  const [systemUptimeTrend, setSystemUptimeTrend] = useState(0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Performance Metrics Over Time',
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16,
          weight: '600'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  };

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  useEffect(() => {
    // Fetch performance data from backend
    fetch('http://127.0.0.1:5000/performance')
      .then(res => res.json())
      .then(data => {
        setChartData({
          labels: data.timestamps,
          datasets: [
            {
              label: 'Water Yield (L/hour)',
              data: data.waterYield,
              borderColor: 'rgb(96, 165, 250)',
              backgroundColor: 'rgba(96, 165, 250, 0.3)',
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: 'Energy Consumption (kWh)',
              data: data.energyConsumption,
              borderColor: 'rgb(167, 139, 250)',
              backgroundColor: 'rgba(167, 139, 250, 0.3)',
              borderWidth: 2,
              tension: 0.4,
            }
          ]
        });
        setAverageWaterYield(data.averageWaterYield);
        setEnergyEfficiency(data.energyEfficiency);
        setSystemUptime(data.systemUptime);
        setWaterYieldTrend(data.waterYieldTrend);
        setEnergyEfficiencyTrend(data.energyEfficiencyTrend);
        setSystemUptimeTrend(data.systemUptimeTrend);
      })
      .catch(err => {
        console.error('Failed to fetch performance data:', err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
          Performance Visualization
        </h1>
        <p className="text-xl text-white/80">
          Monitor your desalination system's performance metrics and trends
        </p>
      </div>

      {/* Chart Controls */}
      <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              Performance Trends
            </h2>
            <p className="text-white/80">
              View historical data and identify patterns
            </p>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-glass-300 text-white border border-glass-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRangeOptions.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                className="bg-gray-800 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Main Chart */}
        <div className="h-[400px] bg-glass-300/50 rounded-xl p-6">
          <Line options={options} data={chartData} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">
            Average Water Yield
          </h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {averageWaterYield} L/hour
          </p>
          <p className="text-sm text-green-400 mt-3 flex items-center">
            <span className="mr-1">{waterYieldTrend >= 0 ? '↑' : '↓'}</span> {Math.abs(waterYieldTrend)}% from last period
          </p>
        </div>

        <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">
            Energy Efficiency
          </h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {energyEfficiency} kWh/m³
          </p>
          <p className="text-sm text-red-400 mt-3 flex items-center">
            <span className="mr-1">{energyEfficiencyTrend >= 0 ? '↑' : '↓'}</span> {Math.abs(energyEfficiencyTrend)}% from last period
          </p>
        </div>

        <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">
            System Uptime
          </h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {systemUptime}%
          </p>
          <p className="text-sm text-green-400 mt-3 flex items-center">
            <span className="mr-1">{systemUptimeTrend >= 0 ? '↑' : '↓'}</span> {Math.abs(systemUptimeTrend)}% from last period
          </p>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
