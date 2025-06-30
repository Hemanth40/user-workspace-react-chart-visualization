const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
          About DesaliSense
        </h1>
        <p className="text-xl text-white/80">
          Learn about our AI-powered approach to optimizing seawater desalination
        </p>
      </div>

      {/* Project Overview */}
      <section className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Project Overview
        </h2>
        <p className="text-white/80 leading-relaxed">
          DesaliSense is an innovative solution that uses artificial intelligence to optimize 
          small-scale seawater desalination processes. By analyzing key parameters such as 
          salinity, temperature, and pressure, our system provides real-time predictions 
          and recommendations to improve efficiency and reduce operational costs.
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 space-y-8">
        <h2 className="text-2xl font-semibold text-white">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Data Input</h3>
            <p className="text-white/80">
              Enter your system's current parameters including salinity levels, 
              temperature, and operating pressure.
            </p>
          </div>

          <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white">AI Analysis</h3>
            <p className="text-white/80">
              Our AI model processes the data and analyzes it against optimal 
              performance patterns.
            </p>
          </div>

          <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Optimization</h3>
            <p className="text-white/80">
              Receive detailed predictions and actionable recommendations for 
              system optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 space-y-8">
        <h2 className="text-2xl font-semibold text-white">
          Key Benefits
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-glass-300 rounded-xl p-6 space-y-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-white">
              Improved Efficiency
            </h3>
            <p className="text-white/80">
              Optimize your desalination process to achieve maximum water yield 
              with minimum energy consumption.
            </p>
          </div>

          <div className="bg-glass-300 rounded-xl p-6 space-y-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-white">
              Cost Reduction
            </h3>
            <p className="text-white/80">
              Reduce operational costs through intelligent parameter optimization 
              and predictive maintenance.
            </p>
          </div>

          <div className="bg-glass-300 rounded-xl p-6 space-y-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-white">
              Real-time Monitoring
            </h3>
            <p className="text-white/80">
              Track system performance in real-time and receive immediate 
              feedback on parameter adjustments.
            </p>
          </div>

          <div className="bg-glass-300 rounded-xl p-6 space-y-3 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-white">
              Data-Driven Decisions
            </h3>
            <p className="text-white/80">
              Make informed decisions based on AI-powered insights and 
              historical performance data.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="bg-glass-200 backdrop-blur-md rounded-2xl border border-glass-300 p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Technical Details
        </h2>
        <p className="text-white/80 leading-relaxed">
          Our system uses advanced machine learning algorithms trained on extensive 
          desalination process data. The AI model considers multiple parameters 
          simultaneously to provide accurate predictions and optimization suggestions. 
          The system continuously learns and improves its predictions based on new 
          data and outcomes.
        </p>
      </section>
    </div>
  );
};

export default About;
