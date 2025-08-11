import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

dotenv.config(); // Load local .env (for development)

const app = express();
app.use(cors());
app.use(express.json());

const secret_name = "myApp/mongodb/credentials";
const client = new SecretsManagerClient({ region: "ap-south-1" });

// Function to load secrets from AWS
async function loadSecrets() {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );

    if (response.SecretString) {
      const secretObj = JSON.parse(response.SecretString);
      Object.keys(secretObj).forEach((key) => {
        process.env[key] = secretObj[key];
      });
      console.log("✅ Secrets loaded from AWS Secrets Manager");
    }
  } catch (error) {
    console.error("❌ Failed to load secrets:", error);
    process.exit(1); // Stop app if secrets can't be loaded
  }
}

// Main app startup
(async () => {
  await loadSecrets();

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
