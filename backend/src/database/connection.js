const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "";
const dbUrl = encodeURI(MONGO_URL);
const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
};

// DB Events
console.info("Database connecting");

mongoose.connection.once("open", () =>
  console.info("Database connection: open")
);

mongoose.connection.on("error", () =>
  console.error("Database connection: error")
);

mongoose.connection.on("connecting", () =>
  console.info("Mongoose Connection: connecting")
);

mongoose.connection.on("connected", () =>
  console.info("Mongoose Connection: connected")
);

mongoose.connection.on("disconnected", () =>
  console.info("Mongoose Connection: disconnected")
);

mongoose
  .connect(dbUrl, dbOptions)
  .then(() => console.info("Mongoose MongoDB: connected"))
  .catch((err) => console.error("Mongoose MongoDB Error: ", err));

module.exports = mongoose;
