
import { useEffect, useState } from 'react'

export default function TimeSheetForm({ isOpen, onClose, onSubmit }) {
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    clockIn: '',
    clockOut: '',
    totalHours: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const resp = await fetch('http://localhost:4000/api/timesheets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('user'),
      },
      body: JSON.stringify(formData),
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error(data)
      return
    }

    onSubmit(data)
    onClose()
  }
  useEffect(() => {
    const fetchEmployees = async () => {
      const resp = await fetch('http://localhost:4000/api/get-employees', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }

      setEmployees(data)
    }

    fetchEmployees()
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4"
        >Add New Employee Timesheet</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee</label>
            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>{employee.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clockIn" className="block text-sm font-medium text-gray-700">Clock In</label>
            <input
              type="time"
              id="clockIn"
              name="clockIn"
              value={formData.clockIn}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clockOut" className="block text-sm font-medium text-gray-700">Clock Out</label>
            <input
              type="time"
              id="clockOut"
              name="clockOut"
              value={formData.clockOut}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalHours" className="block text-sm font-medium text-gray-700">Total Hours</label>
            <input
              type="number"
              id="totalHours"
              name="totalHours"
              value={formData.totalHours}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Employee Timesheet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

