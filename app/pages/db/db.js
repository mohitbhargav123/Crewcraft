const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  employeesAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
