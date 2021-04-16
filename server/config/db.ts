const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

mongoose.connection.on("connected", () => {
  console.log("Connected 😀😁 to mongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log("Error connecting to mongoDB", error);
});

module.exports = connectDB;
