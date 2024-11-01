import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TreatmentPlan = ({ patients }) => {
  const { id } = useParams();  // Lấy chỉ số của phòng hiện tại (Room ID từ URL)
  const patient = patients[id];  // Lấy thông tin bệnh nhân theo ID phòng
  const navigate = useNavigate();

  const [treatmentPlans, setTreatmentPlans] = useState([]);

  const [newPlan, setNewPlan] = useState({ date: '', time: '', task: '' });
  const [showForm, setShowForm] = useState(false);

  // Hàm xử lý thêm công việc mới
  const handleAddTask = () => {
    if (newPlan.date && newPlan.time && newPlan.task) {
      setTreatmentPlans([...treatmentPlans, newPlan]);
      setNewPlan({ date: '', time: '', task: '' });
      setShowForm(false);
    } else {
      alert('Please inform!');
    }
  };

  // Hàm xử lý xóa công việc cũ
  const handleDeleteTask = (taskIndex, date) => {
    const updatedPlans = treatmentPlans.filter((plan, index) => !(index === taskIndex && plan.date === date));
    setTreatmentPlans(updatedPlans);
  };

  // Nhóm các công việc theo ngày
  const groupedTasks = treatmentPlans.reduce((acc, plan) => {
    if (!acc[plan.date]) {
      acc[plan.date] = [];
    }
    acc[plan.date].push(plan);
    return acc;
  }, {});

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Treatment Plan for Room {patient.room}
      </h1>
      <h2 className="text-xl font-bold mb-2 text-center">
        Patient: {patient.name || ''}
      </h2>
      <h2 className="text-xl font-bold mb-6 text-center">
        Doctor: {patient.doctor || ''}
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {Object.entries(groupedTasks).map(([date, tasks], dateIndex) => (
          <div key={dateIndex} className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-lg font-bold mb-2">{new Date(date).toLocaleDateString('en-GB')}</h2>
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex justify-between mb-2">
                <span>{task.time}</span>
                <span>{task.task}</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteTask(taskIndex, date)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-4">New tasks</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                className="border p-2 w-full rounded shadow-sm"
                value={newPlan.date}
                onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-medium">Time</label>
              <input
                type="time"
                className="border p-2 w-full rounded shadow-sm"
                value={newPlan.time}
                onChange={(e) => setNewPlan({ ...newPlan, time: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-medium">Tasks</label>
              <input
                type="text"
                className="border p-2 w-full rounded shadow-sm"
                value={newPlan.task}
                onChange={(e) => setNewPlan({ ...newPlan, task: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleAddTask}
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mb-4">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600"
          >
            Add
          </button>
        )}
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TreatmentPlan;
