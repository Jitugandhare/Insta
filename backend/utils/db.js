const mongoose = require("mongoose");

const MONGO_URL = 'mongodb+srv://gandhareji10:H967lStG59Jl26NP@cluster0.bwokx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connection = mongoose.connect(MONGO_URL);

connection
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log('Error connecting to MongoDB:', err))
