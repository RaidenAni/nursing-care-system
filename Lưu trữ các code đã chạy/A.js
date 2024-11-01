import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PatientInfo from './components/PatientInfo';
import EditPatient from './components/EditPatient';
import TreatmentPlan from './components/TreatmentPlan';
import Notifications from './components/Notifications';
import NurseSchedule from './components/NurseSchedule';


function App() {
  const [patients, setPatients] = useState(
    Array(15).fill(null).map((_, index) => ({
      room: 700 + index,
      name: '',
      gender: '',
      record: '',
      dob: '',
      status: 'Ready',
      department: '',
      doctor: ''
    }))
  );

  const [notifications, setNotifications] = useState([
    { room: 701, time: '2024/10/09 12:30', message: 'Chăm sóc vết thương', status: 'Chưa giải quyết' },
    { room: 701, time: '2024/10/09 12:33', message: 'Yêu cầu xe lăn', status: 'Đã giải quyết' },
    { room: 706, time: '2024/12/08 14:00', message: 'Cấp cứu khẩn cấp', status: 'Đang xử lý' },
  ]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard patients={patients} />} />
          <Route path="/patient-info" element={<PatientInfo patients={patients} />} />
          <Route path="/edit-patient/:id" element={<EditPatient patients={patients} setPatients={setPatients} />} />
          <Route path="/treatment-plan/:id" element={<TreatmentPlan patients={patients} />} />
          <Route
            path="/notifications"
            element={<Notifications patients={patients} notifications={notifications} setNotifications={setNotifications} />}
          />
          <Route path="/nurse-schedule" element={<NurseSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
