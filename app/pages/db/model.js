const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  leavesRemaining: {
    type: Number,
    default: 30  // Default leaves available for each employee
  }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

