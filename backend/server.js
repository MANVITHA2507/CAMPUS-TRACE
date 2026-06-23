const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ["lost", "found"] },
  location: String,
  contact: String,
  date: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

app.get("/items", async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  res.json(items);
});

app.post("/items", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(process.env.PORT || 5000, () => console.log("Server running"));