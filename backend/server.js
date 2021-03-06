import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";

// import routes
import magicTypeRoutes from "./routes/magicType.server.route";
import skillRoutes from "./routes/skill.server.route";

//create instances
const app = express();

const API_PORT = process.env.PORT || 5000;

if (process.env.RPG_APP_MONGODB_URI) {
    mongoose.connect(
        process.env.RPG_APP_MONGODB_URI,
        { useNewUrlParser: true }
    );
}

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database."));
//check whether connection to the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// allow cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//set route path and initialize API
app.get("/", (req, res) => {
    res.json({ message: "Api running" });
});

// Serve any static files built by React
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/public", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// use routes
app.use("/api", magicTypeRoutes);
app.use("/api", skillRoutes);

// catch 404
app.use((req, res, next) => {
    res.status(404).send("<h2 align=center>Page Not Found!</h2>");
  });

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));