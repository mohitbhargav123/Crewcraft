"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Custom X Icon component
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

interface LeaveRequest {
  id: number
  type: string
  startDate: string
  endDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
}

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = React.useState < LeaveRequest[] > ([
    { id: 1, type: 'Annual Leave', startDate: '2024-01-15', endDate: '2024-01-20', reason: 'Family vacation', status: 'Pending' },
    { id: 2, type: 'Sick Leave', startDate: '2024-02-01', endDate: '2024-02-02', reason: 'Medical appointment', status: 'Approved' },
    { id: 3, type: 'Personal Leave', startDate: '2024-03-10', endDate: '2024-03-11', reason: 'Personal matters', status: 'Rejected' }
  ])
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newRequest: LeaveRequest = {
      id: leaveRequests.length + 1,
      type: formData.get('leave-type') as string,
      startDate: formData.get('start-date') as string,
      endDate: formData.get('end-date') as string,
      reason: formData.get('reason') as string,
      status: 'Pending'
    }
    setLeaveRequests([newRequest, ...leaveRequests])
    setIsModalOpen(false)
    form.reset()
  }

  const cancelRequest = (id: number) => {
    setLeaveRequests(leaveRequests.filter(request => request.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Leave Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
            <CardDescription>Your remaining leave days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Annual Leave</span>
                <span className="font-bold">15 days</span>
              </div>
              <div className="flex justify-between">
                <span>Sick Leave</span>
                <span className="font-bold">10 days</span>
              </div>
              <div className="flex justify-between">
                <span>Personal Leave</span>
                <span className="font-bold">5 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Leave</CardTitle>
            <CardDescription>Submit a new leave request</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">New Request</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Leave</DialogTitle>
                  <DialogDescription>Fill in the details for your leave request.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="leave-type" className="block text-sm font-medium text-gray-700">
                      Leave Type
                    </label>
                    <Select name="leave-type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <Input type="date" id="start-date" name="start-date" required />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <Input type="date" id="end-date" name="end-date" required />
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      Reason
                    </label>
                    <Textarea id="reason" name="reason" required />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common leave management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">View Calendar</Button>
            <Button className="w-full">Team Schedule</Button>
            <Button className="w-full">Leave History</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Track your leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="p-2">Type</th>
                  <th className="p-2">Start Date</th>
                  <th className="p-2">End Date</th>
                  <th className="p-2">Reason</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="p-2">{request.type}</td>
                    <td className="p-2">{request.startDate}</td>
                    <td className="p-2">{request.endDate}</td>
                    <td className="p-2">{request.reason}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${request.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-2">
                      {request.status === 'Pending' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => cancelRequest(request.id)}
                        >
                          <XIcon className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
