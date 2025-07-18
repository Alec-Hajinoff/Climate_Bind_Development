const express = require("express");
const { triggerClaimPayout } = require("./triggerClaim.js"); // Imports payout function

const app = express();
const port = 3000;

app.use(express.json()); // Ensures request body parsing

app.post("/trigger-payout", async (req, res) => {
  try {
    const insuredAddress = req.body.address; // Extract from POST body to pick up the wallet address
    const txDetails = await triggerClaimPayout(insuredAddress);
    console.log("Tx Details:", txDetails);

    res.json({
      status: txDetails?.status,
      message: txDetails?.message,
      txHash: txDetails?.txHash,
    });
  } catch (error) {
    console.error("Error processing payout:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Blockchain transaction failed",
        details: error.message,
      });
  }
});

app.listen(port, () => {
  // Listens on specified port
  console.log(`Server running on port ${port}`);
});
