// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ patients }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString('en-GB')  // 'en-GB' định dạng ngày theo dd/mm/yyyy
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString('en-GB'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const MAX_BEDS = 15;

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hiển thị số giường bắt đầu từ 700
  const rooms = Array.from({ length: MAX_BEDS }, (_, index) => {
    const patient = patients[index];
    return patient ? patient : { room: 700 + index, status: 'Ready' };
  });

  // Đếm số giường có bệnh nhân (In use)
  const totalPatients = rooms.filter(room => room.status === 'In use').length;
  const availableBeds = MAX_BEDS - totalPatients;

  return (
    <div className="dashboard flex flex-col h-screen">
      <div className="header flex justify-between items-center mb-6 p-4 bg-gray-100 shadow">
        <div className="header-info">
          <h1 className="text-3xl font-bold">7A Station Dashboard</h1>
          <p>Total Patients: {totalPatients}</p>
          <p>Available Beds: {availableBeds}</p>
        </div>
        <div className="time-info flex flex-col">
          <p className="text-gray-700 text-sm">Date: {currentDate}</p>
          <p className="text-gray-700 text-sm">Current Time: {currentTime}</p>
        </div>
      </div>

      <div className="rooms grid grid-cols-5 gap-2 flex-grow overflow-y-scroll p-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="room bg-white p-2 shadow-md rounded-lg"
            style={{ height: '150px', width: '300px', cursor: 'pointer' }}
            onClick={() => navigate(`/treatment-plan/${index}`)}  // Điều hướng đến TreatmentPlan
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Room {room.room}</h2>
              <p className={`status ${room.status === 'In use' ? 'text-green-600' : 'text-gray-600'}`}>
                {room.status}
              </p>
            </div>
            {room.status === 'In use' ? (
              <>
                <p className="text-sm font-bold">{room.name}</p>
                <p className="text-xs">Department: {room.department}</p>
                <p className="text-xs">Doctor: {room.doctor}</p>
              </>
            ) : (
              <p className="text-sm text-center text-gray-500">Ready</p>
            )}
          </div>
        ))}
      </div>

      <div className="functions grid grid-cols-3 gap-2 p-2 bg-gray-100 shadow fixed bottom-0 w-full">
        <button 
          className="bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 text-xs"
          onClick={() => navigate('/notifications')}>
          Notifications
        </button>
        <button
          className="bg-green-500 text-white py-1 rounded-lg hover:bg-green-600 text-xs"
          onClick={() => navigate('/patient-info')}>
          Patient Info
        </button>
        <button 
          className="bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 text-xs"
          onClick={() => navigate('/nurse-schedule')}>
          Nurses Schedule
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
