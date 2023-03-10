import dotenv from "dotenv";

dotenv.config();

async function globalSetup() {
  process.env = process.env;
}

export default globalSetup;