import csv
import json
from io import StringIO

def parse_csv(file_stream):
    file_stream.seek(0)
    decoded = file_stream.read().decode('utf-8')
    reader = csv.DictReader(StringIO(decoded))
    data = []
    # Mapping from CSV headers to expected keys
    header_map = {
        'Feed_Salinity (ppm)': 'salinity',
        'Pressure (bar)': 'pressure',
        'Temperature (°C)': 'temperature',
        'Flow_Rate (L/min)': 'flow_rate'
    }
    for row in reader:
        mapped_row = {}
        for key, value in row.items():
            mapped_key = header_map.get(key, key)
            mapped_row[mapped_key] = value
        data.append(mapped_row)
    return data

def parse_json(file_stream):
    file_stream.seek(0)
    decoded = file_stream.read().decode('utf-8')
    data = json.loads(decoded)
    if isinstance(data, dict):
        data = [data]
    return data

def parse_file(file_storage):
    filename = file_storage.filename.lower()
    if filename.endswith('.csv'):
        data = parse_csv(file_storage.stream)
    elif filename.endswith('.json'):
        data = parse_json(file_storage.stream)
    else:
        raise ValueError('Unsupported file type')

    # Validate required fields in each record
    required_fields = {'salinity', 'temperature', 'pressure', 'flow_rate'}
    for i, record in enumerate(data):
        if not required_fields.issubset(record.keys()):
            raise ValueError(f"Record {i+1} is missing required fields: {required_fields - set(record.keys())}")
        # Convert values to float and validate
        try:
            for field in required_fields:
                record[field] = float(record[field])
        except ValueError:
            raise ValueError(f"Record {i+1} has invalid numeric value in one of the required fields")

    return data
