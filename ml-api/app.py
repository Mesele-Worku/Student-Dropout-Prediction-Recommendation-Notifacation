from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

# Load model
model = joblib.load("best_dropout_model.pkl")

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Extract features
    features = pd.DataFrame([{
        "lecture_watch_pct": data['lecture_watch_pct'],
        "checklist_pct": data['checklist_pct'],
        "attended_live_class": data['attended_live_class'],
        "attended_group_discussion": data['attended_group_discussion'],
        "qa_participation_pct": data['qa_participation_pct']
    }])
    
    # Predict dropout
    dropout = model.predict(features)[0]
    
  # Generate smarter recommendations
    recs = []

    if data['lecture_watch_pct'] < 70:
        recs.append("Increase your lecture video completion to at least 80% to strengthen understanding.")
    if data['checklist_pct'] < 70:
        recs.append("Make sure to complete all checklist items to stay on track.")
    if data['attended_live_class'] == 0:
        recs.append("Attend live classes to get real-time support and stay engaged.")
    if data['attended_group_discussion'] == 0:
        recs.append("Join group discussions to improve collaboration and communication skills.")
    if data['qa_participation_pct'] < 60:
        recs.append("Participate more in Q&A to clarify doubts and boost retention.")

    # If no improvements are needed, send praise
    if not recs:
        recs.append("🎉 Good job! You did well this week. Keep the momentum going!")

    
    return jsonify({
        "dropout_risk": bool(dropout),
        "recommended_activities": recs
    })

if __name__ == '__main__':
    app.run(port=5000)
