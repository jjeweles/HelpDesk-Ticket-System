// require mongoose
const mongoose = require('mongoose');

/* save mongoose Schema to a variable
include fields to save and require timestamps
for createdAt and updatedAt fields
 */
const ticketSchema = new mongoose.Schema({
    name: String,
    helparea: String,
    issuetext: String,
    prioritylow: String,
    prioritymed: String,
    priorityhigh: String,
     }, {
    timestamps: true
});

// create variable to call Schema
const Ticket = mongoose.model('Ticket', ticketSchema);

// export Ticket for use in other files
module.exports = Ticket;