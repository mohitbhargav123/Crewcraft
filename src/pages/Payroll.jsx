import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PayrollDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/get-employees', {
      headers: { 'auth-token': localStorage.getItem('user') },
    }).then((res) => setEmployees(res.data));
    axios.get('http://localhost:4000/api/payroll').then((res) => setPayrolls(res.data.payrolls));
  }, []);

  const calculatePayroll = (employeeId, hoursWorked) => {
    axios.post('http://localhost:4000/api/payroll', { employeeId, hoursWorked }).then((res) => {
      setPayrolls([...payrolls, res.data.payroll]);
    });
  };

  const downloadPayslip = (payrollId) => {
    window.open(`http://localhost:4000/api/payroll/${payrollId}/payslip`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Payroll Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calculate Payroll</h2>
        <div className="flex items-center space-x-4">
          <select
            id="employee"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="hoursWorked"
            placeholder="Hours Worked"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() =>
              calculatePayroll(
                document.getElementById('employee').value,
                document.getElementById('hoursWorked').value
              )
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Calculate Payroll
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payroll Records</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">Employee</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Gross Salary</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Net Salary</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{payroll.employeeId.name}</td>
                <td className="px-4 py-2 border border-gray-300">{payroll.grossSalary}</td>
                <td className="px-4 py-2 border border-gray-300">{payroll.netSalary}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => downloadPayslip(payroll._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
                  >
                    Download Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollDashboard;
