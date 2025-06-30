import os
import pandas as pd

def download_dataset():
    # This requires Kaggle API credentials to be set up in the environment
    os.system('kaggle datasets download -d patrickloford/water-quality-every-drop-matters -p ./data --unzip')

def preprocess_dataset():
    data_path = './data/water_quality.csv'
    df = pd.read_csv(data_path)
    # Example preprocessing: drop rows with missing values
    df_clean = df.dropna()
    # Save cleaned data
    df_clean.to_csv('./data/water_quality_clean.csv', index=False)
    print("Dataset downloaded and preprocessed successfully.")

if __name__ == "__main__":
    download_dataset()
    preprocess_dataset()
