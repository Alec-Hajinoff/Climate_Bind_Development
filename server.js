const express = require("express");
const { triggerClaimPayout } = require("./triggerClaim.js"); // Import payout function

const app = express();
const port = 3000;

app.use(express.json()); // Ensure request body parsing

app.post("/trigger-payout", async (req, res) => {
  try {
    const txDetails = await triggerClaimPayout();
    res.json({ status: txDetails.status, message: txDetails.message, txHash: txDetails.txHash });
  } catch (error) {
    console.error("Error processing payout:", error);
    res.status(500).json({ status: "error", message: "Blockchain transaction failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
