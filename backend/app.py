from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
# Force CORS to allow everything to stop those red console errors
CORS(app, resources={r"/*": {"origins": "*"}})

def load_data():
    # Detect the directory where app.py is located
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # Move up one level to find the data folder
    project_root = os.path.dirname(base_dir)
    
    prices_path = os.path.join(project_root, 'data', 'processed', 'BrentOilPrices_cleaned.csv')
    events_path = os.path.join(project_root, 'data', 'raw', 'external_events.csv')
    
    print(f"--- DEBUG: Looking for file at: {prices_path} ---")
    
    if not os.path.exists(prices_path):
        print("--- DEBUG: FILE NOT FOUND! ---")
        return None, None
    
    df_prices = pd.read_csv(prices_path)
    df_events = pd.read_csv(events_path)
    return df_prices, df_events

@app.route('/api/data', methods=['GET'])
def get_dashboard_data():
    df_prices, df_events = load_data()
    if df_prices is None:
        return jsonify({"error": "CSV file not found. Check your data/processed folder."}), 500

    df_prices['Date'] = pd.to_datetime(df_prices['Date'])
    start_date = request.args.get('start')
    end_date = request.args.get('end')
    
    if start_date:
        df_prices = df_prices[df_prices['Date'] >= start_date]
    if end_date:
        df_prices = df_prices[df_prices['Date'] <= end_date]

    df_prices['Date'] = df_prices['Date'].dt.strftime('%Y-%m-%d')

    # Add all key events for Task 2/3
    change_points = [
        {"date": "2010-12-16", "label": "Arab Spring Regime Shift"},
        {"date": "2001-09-11", "label": "9/11 Terrorist Attacks"},
        {"date": "2008-07-11", "label": "2008 Financial Crisis Peak"}
    ]

    return jsonify({
        "prices": df_prices.to_dict(orient='records'),
        "events": df_events.to_dict(orient='records'),
        "change_points": change_points
    })

@app.route('/')
def health_check():
    return "Backend is Live"

if __name__ == '__main__':
    app.run(debug=True, port=5000)