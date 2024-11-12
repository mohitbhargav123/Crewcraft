'use client'

import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function EmployeeProgressDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
  ])

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const performanceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Performance Score',
        data: [65, 75, 80, 85],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quarterly Performance',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow rounded-lg mb-6 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">True Craft</h1>
        <nav className="flex space-x-4">
          <button className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">Home</button>
          <button className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">Main Menu</button>
          <button className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">Dashboard</button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Employee Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-500">Software Engineer</p>
              <p className="text-gray-500">Development Department</p>
              <p className="text-gray-500">Remote</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Current Project</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">E-commerce Platform Redesign</h3>
            <p className="text-sm text-gray-500 mt-1">Modernizing the user interface and improving the checkout process</p>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <Progress value={60} className="w-full" />
            </div>
            <p className="text-sm mt-2">Deadline: August 15, 2024</p>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Bar data={performanceData} options={chartOptions} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Demo Graph</h3>
                <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Placeholder for Demo Graph</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>JavaScript</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>React</span>
                <span>70%</span>
              </div>
              <Progress value={70} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>CSS</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={task-${task.id}}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <label
                    htmlFor={task-${task.id}}
                    className={flex-grow ${task.completed ? 'line-through text-gray-500' : ''}}
                  >
                    {task.text}
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <ul className="space-y-2">
                <li>
                  <Badge variant="secondary">Employee of the Month</Badge>
                  <span className="ml-2">March 2024</span>
                </li>
                <li>
                  <Badge variant="secondary">Project Completion</Badge>
                  <span className="ml-2">E-commerce Platform</span>
                </li>
                <li>
                  <Badge variant="secondary">Certification</Badge>
                  <span className="ml-2">AWS Certified Developer</span>
                </li>
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Become a Senior Developer by 2025</li>
              <li>Master React by mid-2024</li>
              <li>Contribute to open-source projects</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 bg-white shadow rounded-lg p-4 text-center">
        <p>&copy; 2024 TechCorp Inc. All rights reserved.</p>
        <p>Support: support@techcorp.com | (123) 456-7890</p>
        <p>
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> | 
          <a href="#" className="text-blue-600 hover:underline ml-2">Terms of Service</a>
        </p>
      </footer>
    </div >
  )
}
