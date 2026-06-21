const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongodb://mongo:KODriwuQksDIBzCIOpXgPgvMsGYhIhkI@reseau.proxy.rlwy.net:15373('mongodb://mongo:KODriwuQksDIBzCIOpXgPgvMsGYhIhkI@reseau.proxy.rlwy.net:15373')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['lost', 'found'] },
  location: String,
  contact: String,
  date: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));