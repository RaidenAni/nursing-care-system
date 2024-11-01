// src/components/NurseSchedule.js
import React, { useState } from 'react';
import { format } from 'date-fns';

const NurseSchedule = () => {
  const [schedules, setSchedules] = useState([]);

  const [newSchedule, setNewSchedule] = useState({ date: '', shift: '', nurse: '', notes: '' });

  const handleAddSchedule = () => {
    if (newSchedule.date && newSchedule.shift && newSchedule.nurse) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule({ date: '', shift: '', nurse: '', notes: '' }); // Reset form
    }
  };

  const handleDeleteSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Nurse Schedule</h1>
      
      {/* Form to add schedule */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          className="border p-2 rounded-lg"
          value={newSchedule.date}
          onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
        />
        <select
          className="border p-2 rounded-lg"
          value={newSchedule.shift}
          onChange={(e) => setNewSchedule({ ...newSchedule, shift: e.target.value })}
        >
          <option value=""></option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
        <input
          type="text"
          className="border p-2 rounded-lg"
          placeholder="Nurse's name"
          value={newSchedule.nurse}
          onChange={(e) => setNewSchedule({ ...newSchedule, nurse: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 rounded-lg"
          placeholder="Note"
          value={newSchedule.notes}
          onChange={(e) => setNewSchedule({ ...newSchedule, notes: e.target.value })}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={handleAddSchedule}
        >
          Add
        </button>
      </div>

      {/* Display schedule list */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Shift</th>
            <th className="border p-2">Nurse</th>
            <th className="border p-2">Note</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td className="border p-2 text-center">
                {format(new Date(schedule.date), 'dd/MM/yyyy')}
              </td>
              <td className="border p-2 text-center">{schedule.shift}</td>
              <td className="border p-2 text-center">{schedule.nurse}</td>
              <td className="border p-2">{schedule.notes}</td>
              <td className="border p-2 text-center">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteSchedule(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to return to Dashboard */}
      <div className="text-center mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NurseSchedule;
