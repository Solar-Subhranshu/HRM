const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  userId: String,
  timestamp: Date,
});

const Test = mongoose.model("Test", testSchema);

const saveTest = async (userId, timestamp) => {
  const newEntry = new Test({ userId, timestamp });
  await newEntry.save();
  console.log("Test saved:", newEntry);
};