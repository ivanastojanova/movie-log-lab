import express from "express";
import moviesRouter from "./routes/movies.js";

const app = express();

app.use(express.json());
app.use("/api/movies", moviesRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
