import routes from "@routes/routes";
import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";

import swaggerUI from "swagger-ui-express";
import specs from "../swagger/swagger";
import { setCorsHeaders } from "@middlewares/cors";

const app: Application = express();

app.use("/public", express.static(path.join(__dirname, "../../public")));

app.use(express.json());
app.use(morgan("common"));

app.use(cors());
app.use(setCorsHeaders);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1", routes());

export default app;
