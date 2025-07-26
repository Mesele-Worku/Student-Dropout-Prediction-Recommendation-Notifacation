const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const studentData = req.body;

  try {
    const predictionResponse = await axios.post(
      "http://localhost:5000/predict",
      studentData
    );
    const { dropout_risk, recommended_activities } = predictionResponse.data;

    res.json({
      dropout_risk,
      recommended_activities,
    });
  } catch (error) {
    res.status(500).json({ error: "Prediction failed", detail: error.message });
  }
});

module.exports = router;
