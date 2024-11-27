const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Payroll = require('../models/Payroll');
const PDFDocument = require('pdfkit');

router.post('/', async (req, res) => {
  const { employeeId, hoursWorked } = req.body;

  const employee = await Employee.findById(employeeId);
  if (!employee) return res.status(404).send('Employee not found');

  const grossSalary = employee.salary * hoursWorked;
  const deductions = grossSalary * 0.2;
  const netSalary = grossSalary - deductions;

  const payroll = new Payroll({ employeeId, hoursWorked, grossSalary, deductions, netSalary });
  await payroll.save();

  res.json({ payroll });
});

router.get('/', async (req, res) => {
  const payrolls = await Payroll.find().populate('employeeId');
  res.json({ payrolls });
})

router.get('/:id/payslip', async (req, res) => {
  const payroll = await Payroll.findById(req.params.id).populate('employeeId');
  if (!payroll) return res.status(404).send('Payroll record not found');

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="payslip.pdf"');

  doc.text(`Payslip for ${payroll.employeeId.name}`, { align: 'center' });
  doc.text(`Gross Salary: ${payroll.grossSalary}`);
  doc.text(`Deductions: ${payroll.deductions}`);
  doc.text(`Net Salary: ${payroll.netSalary}`);
  doc.end();

  doc.pipe(res);
});


module.exports = router;