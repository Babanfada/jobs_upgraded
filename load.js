require("dotenv").config();
const connectDb = require("./db/connect");
const Job = require("./models/jobs");
const data = require("./data.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Job.deleteMany();
    await Job.create(data);
    console.log("DATA SUCCESSFULLY LOADED !!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
