from flask import Flask, request, jsonify
import joblib
import numpy as np
from pathlib import Path

app = Flask(__name__)
MODEL_PATH = Path('model.pkl')


def load_model():
    if MODEL_PATH.exists():
        return joblib.load(MODEL_PATH)
    return None


@app.route('/predict', methods=['POST'])
def predict():
    model = load_model()
    if model is None:
        return jsonify({'message': 'Train the model first with train.py'}), 400

    payload = request.get_json() or {}
    features = [
        float(payload.get('aptitude_score', 0)),
        float(payload.get('communication_skills', 0)),
        1.0 if str(payload.get('internship', 'No')).lower() == 'yes' else 0.0,
        float(payload.get('skill_match_ratio', 0.0)),
    ]

    proba = model.predict_proba(np.array([features]))[0][1]
    status = 'Selected' if proba >= 0.5 else 'Not Selected'

    return jsonify({'status': status, 'confidence': round(proba * 100, 2)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
