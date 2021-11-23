// require npms
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// require mongoose schema
const Ticket = require('./models/tickets');

// connect to mongodb hdticket
mongoose.connect('mongodb://localhost:27017/hdticket');

// get middleware ready to use
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// setup ejs and path to views dir
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// checking mongoose connection
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected!')
})
// throw error if problem
db.on('error', err => {
    console.error('connection error:', err)
})

// categories to iterate over on edit page
const categories = ['Website', 'Mobile App', 'Backend', 'Other'];

// get home route and pass through tickets in db after finding
app.get('/', async (req, res) => {
    const tickets = await Ticket.find({});
    res.render('home', {tickets});
})

// get individual ticket to edit by ID
app.get('/:id/edit', async (req, res) => {
    const {id} = req.params;
    const oneTicket = await Ticket.findById(id);
    res.render('edit', {oneTicket, categories});
})

// route to update mongoDB data, get specific ticket by ID and update
app.put('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect('/#open');
})

// route to delete ticket in database
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleteTicket = await Ticket.findByIdAndDelete(id);
    res.redirect('/#open');
})

// post new ticket into database and save
app.post('/', async (req, res) => {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.redirect('/');
})

// just listening for a port to be open
app.listen(3000, () => {
    console.log('Listening On Port 3000');
});