from flask import Flask, request, jsonify
from flask_cors import CORS
from services.file_parser import parse_file
from models.prediction_model import model

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = model.predict(data)
    return jsonify(prediction)

@app.route('/predict/batch', methods=['POST'])
def predict_batch():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    try:
        parsed_data = parse_file(file)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    results = []
    for record in parsed_data:
        pred = model.predict(record)
        results.append(pred)

    return jsonify({"predictions": results})

@app.route('/performance', methods=['GET'])
def get_performance():
    # Sample synthetic performance data
    data = {
        "timestamps": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
        "waterYield": [75, 82, 88, 85, 80, 78],
        "energyConsumption": [45, 48, 52, 50, 47, 46],
        "averageWaterYield": 81.3,
        "energyEfficiency": 48,
        "systemUptime": 98.5,
        "waterYieldTrend": 5.2,
        "energyEfficiencyTrend": -2.1,
        "systemUptimeTrend": 0.5
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
