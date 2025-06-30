import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Prediction = () => {
  const [formData, setFormData] = useState({
    salinity: '',
    temperature: '',
    pressure: '',
    flow_rate: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Fetch performance data for visualization
    fetch('/api/performance')
      .then(res => res.json())
      .then(data => setPerformanceData(data))
      .catch(() => setPerformanceData(null));
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'json'].includes(fileType)) {
      setUploadError('Please upload a valid CSV or JSON file.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    // Upload file to backend for batch prediction
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/predict/batch', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to get batch prediction');
      }
      const data = await response.json();
      setPrediction(data.predictions);
      setFileData(null);
      setIsUploading(false);
    } catch (error) {
      setUploadError(error.message);
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for performance chart
  const performanceChartData = performanceData ? {
    labels: performanceData.timestamps,
    datasets: [
      {
        label: 'Water Yield (L/hour)',
        data: performanceData.waterYield,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Energy Consumption',
        data: performanceData.energyConsumption,
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        yAxisID: 'y1',
      },
    ],
  } : null;

  const performanceChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Water Yield (L/hour)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Energy Consumption',
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
          Predict Water Yield
        </h1>
        <p className="text-xl text-white/80">
          Enter your desalination parameters to get AI-powered predictions and optimization suggestions
        </p>
      </div>

      {/* Performance Chart */}
      {performanceChartData && (
        <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">System Performance Overview</h2>
          <Line data={performanceChartData} options={performanceChartOptions} />
        </div>
      )}

      {/* File Upload Section */}
      <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Upload Data File</h2>
        <div 
          className="border-2 border-dashed border-glass-300 rounded-lg p-8 text-center transition-all duration-300 hover:border-blue-400"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.add('border-blue-400');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('border-blue-400');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('border-blue-400');
            const file = e.dataTransfer.files[0];
            if (file) {
              const input = document.getElementById('file-upload');
              input.files = e.dataTransfer.files;
              handleFileUpload({ target: input });
            }
          }}
        >
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Choose CSV or JSON File
          </label>
          <p className="mt-4 text-white/80">
            Drag and drop a file here, or click to select
          </p>
        </div>
        {isUploading && (
          <p className="text-blue-300 mt-4">Processing file...</p>
        )}
        {uploadError && (
          <p className="text-red-300 mt-4">{uploadError}</p>
        )}
        {fileData && (
          <div className="mt-6">
            <h3 className="text-xl font-medium text-white mb-4">File Data Preview:</h3>
            <div className="overflow-x-auto bg-glass-300 rounded-xl backdrop-blur-md">
              <table className="min-w-full divide-y divide-glass-300">
                <thead>
                  <tr>
                    {Object.keys(fileData[0] || {}).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-sm font-medium text-white/90 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-300">
                  {fileData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="px-6 py-4 whitespace-nowrap text-sm text-white/80"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {fileData.length > 5 && (
                <p className="text-sm text-white/70 p-4 border-t border-glass-300">
                  Showing first 5 rows of {fileData.length} total rows
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Manual Input Form */}
      <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Manual Parameter Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="salinity" className="block text-lg font-medium text-white mb-2">
              Salinity (ppt)
            </label>
            <input
              type="number"
              id="salinity"
              name="salinity"
              value={formData.salinity}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-glass-300 border border-glass-300 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter salinity level"
              required
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="temperature" className="block text-lg font-medium text-white mb-2">
              Temperature (°C)
            </label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-glass-300 border border-glass-300 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter temperature"
              required
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="pressure" className="block text-lg font-medium text-white mb-2">
              Pressure (bar)
            </label>
            <input
              type="number"
              id="pressure"
              name="pressure"
              value={formData.pressure}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-glass-300 border border-glass-300 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pressure"
              required
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="flow_rate" className="block text-lg font-medium text-white mb-2">
              Flow Rate (L/min)
            </label>
            <input
              type="number"
              id="flow_rate"
              name="flow_rate"
              value={formData.flow_rate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-glass-300 border border-glass-300 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter flow rate"
              required
              min="0"
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Get Prediction'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-xl p-6 text-red-300">
          {error}
        </div>
      )}

      {prediction && (
        <div className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 space-y-8">
          {Array.isArray(prediction) ? (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Batch Predictions</h3>
              <div className="overflow-x-auto bg-glass-300 rounded-xl backdrop-blur-md">
                <table className="min-w-full divide-y divide-glass-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-white/90 uppercase tracking-wider">Recovery Rate (%)</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-white/90 uppercase tracking-wider">Energy Consumption (kWh)</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-white/90 uppercase tracking-wider">Freshwater Quality (TDS ppm)</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-white/90 uppercase tracking-wider">Classification</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-white/90 uppercase tracking-wider">Suggestions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-300">
                    {prediction.map((pred, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{pred.recoveryRate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{pred.energyConsumption}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{pred.freshwaterQuality}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{pred.classification}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          <ul className="list-disc list-inside">
                            {pred.suggestions.map((suggestion, i) => (
                              <li key={i}>{suggestion}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-glass-300 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Predicted Recovery Rate
                  </h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                    {prediction.recoveryRate} %
                  </p>
                </div>
                
                <div className="bg-glass-300 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Energy Consumption
                  </h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                    {prediction.energyConsumption} kWh
                  </p>
                </div>

                <div className="bg-glass-300 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Freshwater Quality (TDS)
                  </h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                    {prediction.freshwaterQuality} ppm
                  </p>
                </div>

                <div className="bg-glass-300 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Classification
                  </h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                    {prediction.classification}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Optimization Suggestions
                </h3>
                <ul className="space-y-3">
                  {prediction.suggestions.map((suggestion, index) => (
                    <li 
                      key={index}
                      className="flex items-start text-white/80"
                    >
                      <span className="text-blue-400 mr-3">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Prediction;
