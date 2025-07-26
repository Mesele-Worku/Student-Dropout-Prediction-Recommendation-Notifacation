from flask import Flask, request, jsonify
import xgboost as xgb
import numpy as np
import boto3
from flask_cors import CORS
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

app = Flask(__name__)
CORS(app)

# Load your XGBoost model
model = xgb.Booster()
model.load_model('model/xgboost-model')  # Path to your model

# Threshold for dropout prediction
DROPOUT_THRESHOLD = 0.5

# Email config
AWS_REGION = "us-east-1"
SENDER_EMAIL = "meselew2112@gmail.com"

# Initialize SES client
ses_client = boto3.client(
    'ses',
    region_name=AWS_REGION,
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)


def send_email(to_email, subject, body):
    try:
        response = ses_client.send_email(
            Source=SENDER_EMAIL,
            Destination={'ToAddresses': [to_email]},
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Text': {'Data': body}
                }
            }
        )
        print("✅ Email sent!")
        return response
    except ClientError as e:
        print("❌ Email sending failed:", e.response['Error']['Message'])
        return None


@app.route('/predict', methods=['POST'])
def predict():
    try:
        required_fields = [
            'lecture_watch_pct', 'checklist_pct',
            'attended_live_class', 'attended_group_discussion',
            'qa_participation_pct', 'student_email','student_name'
        ]
        data = request.json

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Prepare features for model
        features = [
            float(data['lecture_watch_pct']),
            float(data['checklist_pct']),
            int(data['attended_live_class']),
            int(data['attended_group_discussion']),
            float(data['qa_participation_pct'])
        ]
        dtest = xgb.DMatrix(np.array([features]))
        dropout_prob = float(model.predict(dtest)[0])
        will_dropout = dropout_prob > DROPOUT_THRESHOLD
        dropout_class = int(will_dropout)

        # Smart Recommendations
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

        if not recs:
            recs.append("🎉 Good job! You did well this week. Keep the momentum going!")

        # 📧 Send email if dropout risk is high
        if will_dropout:
            subject = "🚨 Dropout Risk Alert: Immediate Action Recommended"
            email_body = f"""Hi {data['student_name']},

Our AI system has identified a high dropout risk based on your weekly activities.

📊 Dropout Probability: {dropout_prob:.2f}
🧠 Risk Prediction: HIGH

Recommended Actions:
{chr(10).join(f"- {r}" for r in recs)}

Schedule a meeting with your instructor to discuss your progress,
Set aside dedicated time each day for coursework,
Form a study group with classmates

Stay focused and don’t hesitate to reach out for help!

Best,
Your Learning Team
 Evangadi INC
"""
            send_email(data['student_email'], subject, email_body)

        return jsonify({
            "probability": dropout_prob,
            "dropout_risk": will_dropout,
            "dropout_class": dropout_class,
            "recommended_activities": recs,
            "threshold_used": DROPOUT_THRESHOLD
        })

    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
