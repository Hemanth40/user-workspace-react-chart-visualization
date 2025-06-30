import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
import numpy as np

class PredictionModel:
    def __init__(self):
        # Load dataset
        data = pd.read_csv('backend/data/desalination_dataset_v2.csv')
        X = data[['Feed_Salinity (ppm)', 'Pressure (bar)', 'Temperature (°C)', 'Flow_Rate (L/min)']]
        y_recovery_rate = data['Recovery_Rate (%)']
        y_energy_consumption = data['Energy_Consumption (kWh)']
        y_freshwater_quality = data['Freshwater_Quality (TDS ppm)']
        y_optimized = data['Optimized']

        # Train Random Forest regression models
        self.model_recovery_rate = RandomForestRegressor(n_estimators=100, random_state=42).fit(X, y_recovery_rate)
        self.model_energy_consumption = RandomForestRegressor(n_estimators=100, random_state=42).fit(X, y_energy_consumption)
        self.model_freshwater_quality = RandomForestRegressor(n_estimators=100, random_state=42).fit(X, y_freshwater_quality)

        # Train Random Forest classifier for optimization classification
        self.classifier_optimized = RandomForestClassifier(n_estimators=100, random_state=42).fit(X, y_optimized)

    def predict(self, input_data):
        try:
            # Convert input_data dict to DataFrame with correct column names
            df = pd.DataFrame([{
                'Feed_Salinity (ppm)': float(input_data.get('salinity', 0)),
                'Pressure (bar)': float(input_data.get('pressure', 0)),
                'Temperature (°C)': float(input_data.get('temperature', 0)),
                'Flow_Rate (L/min)': float(input_data.get('flow_rate', 0))
            }])

            recovery_rate_pred = self.model_recovery_rate.predict(df)[0]
            energy_consumption_pred = self.model_energy_consumption.predict(df)[0]
            freshwater_quality_pred = self.model_freshwater_quality.predict(df)[0]
            optimized_pred = self.classifier_optimized.predict(df)[0]

            classification = "Optimized" if optimized_pred == 1 else "Not Optimized"

            suggestions = []

            if classification == "Optimized":
                suggestions.append("System is operating optimally. Maintain current settings.")
                if recovery_rate_pred < 85:
                    suggestions.append("Consider increasing pressure or flow rate to improve recovery rate.")
                if energy_consumption_pred > 50:
                    suggestions.append("Energy consumption is high; consider optimizing temperature or flow rate.")
                if freshwater_quality_pred > 500:
                    suggestions.append("Freshwater quality is suboptimal; check filtration or feed salinity.")
            else:
                # Not optimized suggestions based on predicted values and inputs
                if df.at[0, 'Pressure (bar)'] < 50:
                    suggestions.append("Increase pressure to at least 50 bar for better performance.")
                else:
                    suggestions.append("Pressure is adequate but system is not optimized; check other parameters.")

                if df.at[0, 'Temperature (°C)'] < 20:
                    suggestions.append("Increase temperature to between 20 and 30 °C for better efficiency.")
                elif df.at[0, 'Temperature (°C)'] > 30:
                    suggestions.append("Decrease temperature to between 20 and 30 °C for better efficiency.")
                else:
                    suggestions.append("Temperature is within ideal range.")

                if df.at[0, 'Flow_Rate (L/min)'] < 3:
                    suggestions.append("Increase flow rate to at least 3 L/min for better recovery.")
                else:
                    suggestions.append("Flow rate is adequate but system is not optimized; check other parameters.")

                if recovery_rate_pred < 80:
                    suggestions.append("Recovery rate is low; consider adjusting pressure and flow rate.")
                if energy_consumption_pred > 55:
                    suggestions.append("Energy consumption is high; optimize temperature and flow rate.")
                if freshwater_quality_pred > 600:
                    suggestions.append("Freshwater quality is poor; check feed salinity and filtration system.")

            return {
                "recoveryRate": round(recovery_rate_pred, 2),
                "energyConsumption": round(energy_consumption_pred, 2),
                "freshwaterQuality": round(freshwater_quality_pred, 2),
                "classification": classification,
                "suggestions": suggestions
            }
        except Exception as e:
            return {
                "error": str(e)
            }

model = PredictionModel()
