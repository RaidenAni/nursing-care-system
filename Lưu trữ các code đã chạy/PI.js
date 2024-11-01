// src/components/PatientInfo.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientInfo = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Patient Information</h1>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-2 text-center">No.</th>
            <th className="border p-2 text-center">Room</th>
            <th className="border p-2 text-center">Full name</th>
            <th className="border p-2 text-center">Sex</th>
            <th className="border p-2 text-center">Medical record</th>
            <th className="border p-2 text-center">Day of birth</th>
            <th className="border p-2 text-center">Status</th>
            <th className="border p-2 text-center">Department</th>
            <th className="border p-2 text-center">Doctor</th>
            <th className="border p-2 text-center">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient, index) => (
            <tr key={index} className="hover:bg-gray-100 transition-colors">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2 text-center">{700 + index}</td>
              <td className="border p-2">{patient.name || ''}</td>
              <td className="border p-2 text-center">{patient.gender || ''}</td>
              <td className="border p-2 text-center">{patient.record || ''}</td>
              <td className="border p-2 text-center">{patient.dob ? new Date(patient.dob).toLocaleDateString('en-GB') : 'N/A'}</td>
              <td className="border p-2 text-center">{patient.status || 'Ready'}</td>
              <td className="border p-2 text-center">{patient.department || ''}</td>
              <td className="border p-2 text-center">{patient.doctor || ''}</td>
              <td className="border p-2 text-center">
                <Link to={`/edit-patient/${index}`} className="text-blue-500 hover:underline">
                  ✏️
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PatientInfo;
