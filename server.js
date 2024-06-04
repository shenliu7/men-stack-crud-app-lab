const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Test Route
app.get('/test', (req, res) => {
  res.send('Server is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.on('connected', function(){
	console.log(`Connected to Mongodb ${mongoose.connection.name}`)
})

// set up landing page
app.get('/', (req, res) => {
    res.render('index.ejs');
  });
  
const Car = require('./models/Car');

app.get('/cars/new', (req, res) => {
    res.render('new.ejs');
  });
  
app.post('/cars', async (req, res) => {
    const { make, model, year} = req.body;
    const newCar = new Car({ make, model, year });
    await newCar.save();
    res.redirect('/cars');
  });


app.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.render('cars.ejs', { cars });
  });


  app.get('/cars/:id/edit', async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render('edit.ejs', { car });
  });
  
  app.post('/cars/:id', async (req, res) => {
    const { make, model, year } = req.body;
    await Car.findByIdAndUpdate(req.params.id, { make, model, year });
    res.redirect('/cars');
  });
  
  app.post('/cars/:id/delete', async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
  });
  