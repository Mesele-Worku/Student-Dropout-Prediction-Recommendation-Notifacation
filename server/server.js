const express = require("express");
const cors = require("cors");
const app = express();
const predictRoutes = require("./routes/predictRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/predict", predictRoutes);

app.listen(4000, () => console.log("🚀 Node backend running on port 4000"));
