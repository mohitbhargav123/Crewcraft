'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CalendarIcon, PlusIcon } from 'lucide-react'

// Mock data for employees and shifts
const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
]

const initialShifts = [
  { id: 1, employeeId: 1, date: '2023-05-01', startTime: '09:00', endTime: '17:00' },
  { id: 2, employeeId: 2, date: '2023-05-01', startTime: '10:00', endTime: '18:00' },
  { id: 3, employeeId: 3, date: '2023-05-02', startTime: '08:00', endTime: '16:00' },
]

export default function EmployeeScheduling() {
  const [shifts, setShifts] = useState(initialShifts)
  const [selectedDate, setSelectedDate] = useState < Date | undefined > (new Date())
  const [selectedEmployee, setSelectedEmployee] = useState < string > ('all')

  const addShift = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newShift = {
      id: shifts.length + 1,
      employeeId: parseInt(formData.get('employee') as string),
      date: formData.get('date') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
    }
    setShifts([...shifts, newShift])
    form.reset()
  }

  const filteredShifts = shifts.filter((shift) => {
    const dateMatch = selectedDate ? shift.date === selectedDate.toISOString().split('T')[0] : true
    const employeeMatch = selectedEmployee === 'all' ? true : shift.employeeId === parseInt(selectedEmployee)
    return dateMatch && employeeMatch
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employee Scheduling</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Shift</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addShift} className="space-y-4">
              <div>
                <Label htmlFor="employee">Employee</Label>
                <Select name="employee">
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" name="date" required />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="time" id="startTime" name="startTime" required />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input type="time" id="endTime" name="endTime" required />
              </div>
              <Button type="submit">
                <PlusIcon className="mr-2 h-4 w-4" /> Add Shift
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Shift Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>{selectedDate ? selectedDate.toDateString() : 'All Dates'}</span>
            </div>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{employees.find(e => e.id === shift.employeeId)?.name}</TableCell>
                  <TableCell>{shift.date}</TableCell>
                  <TableCell>{shift.startTime}</TableCell>
                  <TableCell>{shift.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Employee Hours Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Total Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => {
                const employeeShifts = shifts.filter(shift => shift.employeeId === employee.id)
                const totalHours = employeeShifts.reduce((total, shift) => {
                  const start = new Date(2000-01-01T${ shift.startTime }:00)
              const end = new Date(2000-01-01T${shift.endTime}:00)
              const diff = (end.getTime() - start.getTime()) / 3600000 // Convert to hours
              return total + diff
                }, 0)
              return (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{totalHours.toFixed(2)} hours</TableCell>
              </TableRow>
              )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
