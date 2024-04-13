import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import userRouter from "./routes/user.routes";
import errorMiddleware from "./middleware/error.middile";
config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/ping", function (req, res) {
  res.send(".pong");
});

//routes
app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).send("opps || 404 Page Not Found");
});
app.use(errorMiddleware);
export default app;
