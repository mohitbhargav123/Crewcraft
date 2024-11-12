'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ComplaintRequestForm() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    contactNumber: '',
    email: '',
    type: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      type: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic form validation
    if (Object.values(formData).some(value => value === '')) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      })
      return
    }
    // Process form data here
    console.log('Form submitted:', formData)
    toast({
      title: "Success",
      description: "Your form has been submitted successfully!",
    })
    // Reset form after submission
    setFormData({
      employeeName: '',
      employeeId: '',
      contactNumber: '',
      email: '',
      type: '',
      description: ''
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Complaint and Request Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="employeeName" className="text-gray-200">Employee Name</Label>
            <Input
              type="text"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
              className="w-full bg-white/70 text-gray-900"
            />
          </div>
          <div>
            <Label htmlFor="employeeId" className="text-gray-200">Employee ID</Label>
            <Input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="w-full bg-white/70 text-gray-900"
            />
          </div>
          <div>
            <Label htmlFor="contactNumber" className="text-gray-200">Contact Number</Label>
            <Input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full bg-white/70 text-gray-900"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/70 text-gray-900"
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-gray-200">Type</Label>
            <Select onValueChange={handleSelectChange} value={formData.type}>
              <SelectTrigger className="w-full bg-white/70 text-gray-900">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="request">Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-200">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full bg-white/70 text-gray-900"
            />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
