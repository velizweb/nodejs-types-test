import routes from "@routes/routes";
import express, { Application } from "express";
import path from "path";
import morgan from "morgan";

const app: Application = express();

app.use("/public", express.static(path.join(__dirname, "../../public")));

app.use(express.json());
app.use(morgan("common"));

app.use("/api/v1", routes());

export default app;
