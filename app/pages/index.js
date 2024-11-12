import React from 'react';
import Header from './components/Header';

const HomePage = ({ mentors = [] }) => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Header />

      {/* Banner Section */}
      <div
        className="relative bg-cover shadow-2xl bg-center h-[40rem]"
        style={{ backgroundImage: 'url(/img1.jpeg)' }}
      >
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <button className="btn bg-gray-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-black hover:shadow-black">
            Get Started
          </button>
        </div>
      </div>

      {/* Meet Our Team Heading */}
      <div className="text-center mt-12 mb-7">
        <div className="flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
          <h2 className="text-4xl font-bold text-gray-800 mx-4">Meet Our Team</h2>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>
      </div>

      {/* Dynamic Carousel of Employee Cards */}
      <div className="carousel carousel-center rounded-box gap-4 p-4 w-full">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="carousel-item w-72 h-96">
            <div className="card bg-base-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
              <figure className="px-4 pt-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="rounded-xl h-fit w-fit shadow-green-100"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-black">{mentor.name}</h2>
                <p className="text-gray-600">{mentor.description}</p>
                <div className="card-actions">
                  <button className="btn bg-slate-500 text-white hover:bg-black hover:shadow-black">Contact</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Management Features */}
      <div className="flex mt-10 m-3 items-center justify-between bg-gradient-to-r from-blue-500 to-violet-600 h-72 shadow-lg rounded-lg p-6">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Streamline Your Workforce with CrewCraft
          </h2>
          <p className="text-lg text-white mt-4">
            Efficient employee management for your growing business.
          </p>
        </div>
        <div className="flex-shrink-0 w-1/3 h-full">
          <img
            src="/img2.jpeg"
            alt="Employee Management"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="flex mt-10 m-3 items-center justify-between bg-gradient-to-r from-purple-600 to-blue-300 h-72 shadow-lg rounded-lg p-6">
        <div className="flex-shrink-0 w-1/3 h-full">
          <img
            src="/img3.jpeg"
            alt="Employee Blog"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 ml-6">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Employee Insights: Expert Blogs
          </h2>
          <p className="text-lg text-white mt-4">
            Explore articles from industry experts about employee management, HR trends, and more.
          </p>
        </div>
      </div>

      <div className="flex mt-10 m-3 items-center justify-between bg-gradient-to-r from-purple-500 to-pink-600 h-72 shadow-lg rounded-lg p-6">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white leading-snug">
            One-on-One Employee Consultations
          </h2>
          <p className="text-lg text-white mt-4">
            Receive tailored advice for managing your workforce effectively.
          </p>
        </div>
        <div className="flex-shrink-0 w-1/3 h-full">
          <img
            src="/img2.jpeg"
            alt="Consultation"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="min-h-screen bg-base-100 py-10">
        {/* Heading */}
        <div className="text-center mt-12 mb-7">
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
            <h2 className="text-4xl font-bold text-gray-800 mx-4"> Why CrewCraft?</h2>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-row items-center justify-center align-bottom gap-6">
          {/* Left Card */}
          <div className='card w-28 h-28 bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300'></div>
          <div className="card w-80 h-96 bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
            <div className="card-body text-center">
              <h3 className="card-title text-xl font-bold text-black">Personalized Employee Management</h3>
              <p className="text-gray-600 mt-10">Tailored strategies for each employee's growth.<br /> <br /> Maximize employee potential with one-on-one guidance.<br /><br /> Track and achieve specific employee development goals.</p>
            </div>
          </div>

          {/* Middle Card */}
          <div className="card w-80 h-[35rem] bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
            <div className="card-body text-center">
              <h3 className="card-title text-2xl text-black justify-center font-bold">Expert HR Guidance</h3>
              <p className="text-gray-600 mt-10">Get insights from HR professionals with years of experience. <br /><br /> Adapt to changing workforce dynamics with expert advice. <br /><br /> Develop long-term employee management strategies.</p>
            </div>
          </div>

          {/* Right Card */}
          <div className="card w-80 h-96 bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
            <div className="card-body text-center">
              <h3 className="card-title text-black justify-center text-xl font-bold">Employee Growth</h3>
              <p className="text-gray-600 mt-10">Foster employee career advancement with personalized advice.<br /><br />Boost morale and engagement with career growth strategies.<br /><br />Help employees reach their fullest potential with customized plans.</p>
            </div>
          </div>

          <div className='card w-28 h-28 bg-slate-100 hover:scale-105 transform transition-transform duration-300 shadow-xl'></div>
        </div>
      </div>

      <div className="py-10 text-center">
        <p className="text-2xl text-black">The future of employee management is here. Join CrewCraft today!</p>
      </div>
    </div>
  );
};

export default HomePage;

