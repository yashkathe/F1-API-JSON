import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import router from "./endpoints-api/routes-api";
import { getFullRaceResults, getRaceResults } from "./server";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());

app.use("/", router);

app.listen(process.env.PORT || 4005, () => {
    console.log(`server is running on ${process.env.PORT || 4005}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
