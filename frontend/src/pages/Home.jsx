import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          AI-Powered{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Seawater Desalination
          </span>
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Optimize your desalination process using advanced artificial intelligence. 
          Get real-time predictions and insights to improve efficiency and reduce costs.
        </p>
        <div className="flex justify-center gap-6">
          <Link 
            to="/predict" 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Prediction
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 bg-glass-200 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-glass-300 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-glass-200 backdrop-blur-md p-8 rounded-2xl border border-glass-300 hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Real-time Predictions
          </h3>
          <p className="text-white/80">
            Get instant predictions for water yield based on your input parameters.
          </p>
        </div>

        <div className="bg-glass-200 backdrop-blur-md p-8 rounded-2xl border border-glass-300 hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Data Visualization
          </h3>
          <p className="text-white/80">
            Interactive charts and graphs to help you understand trends and patterns.
          </p>
        </div>

        <div className="bg-glass-200 backdrop-blur-md p-8 rounded-2xl border border-glass-300 hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Optimization Tips
          </h3>
          <p className="text-white/80">
            Receive AI-powered suggestions to optimize your desalination process.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-12">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <h4 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">95%</h4>
            <p className="text-white/80 text-lg">Prediction Accuracy</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">30%</h4>
            <p className="text-white/80 text-lg">Energy Savings</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">24/7</h4>
            <p className="text-white/80 text-lg">Real-time Monitoring</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
