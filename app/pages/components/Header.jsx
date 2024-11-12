
import React, { useState } from 'react'
import Link from 'next/link'

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 bg-secondary z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <nav className="flex flex-col items-center">
        <Link href="/app/schedule-event" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Schedule Event</Link>
        <Link href="/app/employees" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>All Employees</Link>
        <Link href="/app/become-employee" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Become an Employee</Link>
        <Link href="/app/tasks" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Tasks</Link>
        <Link href="/app/reports" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Reports</Link>
        <Link href="/app/settings" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Settings</Link>
        <Link href="/app/feedback" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Feedback</Link>
        <Link href="/app/sign-up" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Sign Up</Link>
      </nav>
    </div>
  )
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-slate-50 text-white py-4 sticky top-0 z-20 shadow-xl">
      <div className="container mx-auto flex justify-between items-center text-black">
        <h1 className="text-2xl font-bold text-black">CrewCraft</h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="/app/schedule-event" className="hover:text-primary transition-colors">Schedule Event</Link></li>
            <li><Link href="/app/employees" className="hover:text-primary transition-colors">All Employees</Link></li>
            <li><Link href="/app/become-employee" className="hover:text-primary transition-colors">Become an Employee</Link></li>
            <li><Link href="/app/tasks" className="hover:text-primary transition-colors">Tasks</Link></li>
            <li><Link href="/app/reports" className="hover:text-primary transition-colors">Reports</Link></li>
            <li><Link href="/app/settings" className="hover:text-primary transition-colors">Settings</Link></li>
            <li><Link href="/app/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
          </ul>
        </nav>
        <div className="hidden md:block">
          <Link href="/app/login">
            <button className="bg-blue-600 hover:bg-black text-white py-2 px-4 rounded transition-colors">Login/Signup</button>
          </Link>
        </div>
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}
