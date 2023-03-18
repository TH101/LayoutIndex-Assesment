import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

// Connect MongoDB.
const { connect } = mongoose;

const URI = process.env.MONGODB_URL;
connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

//mongodb compass connection

// mongoose.connect(
//   "mongodb://localhost:27017/",
//   {
//     dbName: "thilini",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) =>
//     err ? console.log(err) : console.log(
//       "Connected to Dilla database")
// ); 



const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});

//route imports
import imageUploadRoute from "./routes/imageUploadRoute.js";
import deviceRoute from "./routes/device.js";
import locationRoute from "./routes/location.js";
//routes
app.use(locationRoute);
app.use(deviceRoute);
app.use("/api", imageUploadRoute); 

 

