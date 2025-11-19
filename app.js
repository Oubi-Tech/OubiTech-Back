import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mailingRouter from './src/v1/routes/mailingRouter.js';

dotenv.config();

const STATIC_FILE_DIRECTORY = process.env.STATIC_FILE_DIRECTORY | 'uploads';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve the static files


// API Routes
app.use("/api/v1/mailing", mailingRouter);

// Global error handler.
app.use((error, req, res, next) => {
  // Default to 500 (Internal Server Error) if no status code.
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  console.log('hello world')
  console.log(error.message);
  // Handle body too large errors.
  if (error.type === "entity.too.large") {
    return res.status(400).json({
      message: "Payload too large, Max allowed size is 1MB",
      statusCode: 400
    });
  }

  // Check if it's operational (one of ours)
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      status: error.status,
      ...error.customMessages
    });
  } else {
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      status: "error"
    })
  }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app; // Export app for use in tests