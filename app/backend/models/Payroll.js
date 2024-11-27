const mongoose = require('mongoose');



const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  hoursWorked: Number,
  grossSalary: Number,
  deductions: Number,
  netSalary: Number,
  date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Payroll', payrollSchema);