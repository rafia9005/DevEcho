import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import r from "./routes/route";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", r);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server run on : `, PORT);
});
