// src/components/EditPatient.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPatient = ({ patients, setPatients }) => {
  const { id } = useParams();  // Room index
  const navigate = useNavigate();

  const [patient, setPatient] = useState(patients[id] || {});
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = !patient.name && !patient.department && !patient.doctor && !patient.record && !patient.dob && !patient.gender;

    const updatedPatients = [...patients];

    if (isEmpty) {
      updatedPatients[id] = {
        room: 700 + id,
        name: '',
        gender: '',
        record: '',
        dob: '',
        status: 'Ready',
        department: '',
        doctor: ''
      };
      setErrorMessage('');
    } else {
      if (!patient.name || !patient.department || !patient.doctor) {
        setErrorMessage('Please enter all required (*) information');
        return;
      }
      updatedPatients[id] = { ...patient, status: 'In use' };
      setErrorMessage('');
    }

    setPatients(updatedPatients);
    navigate('/patient-info');
  };

  const handleClear = () => {
    setPatient({
      room: 700 + id,
      name: '',
      gender: '',
      record: '',
      dob: '',
      status: 'Ready',
      department: '',
      doctor: ''
    });
    setErrorMessage('');
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Patient Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block font-medium">Full name *</label>
            <input
              type="text"
              className="border p-2 w-full rounded shadow-sm"
              value={patient.name || ''}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium">Sex</label>
            <select
              className="border p-2 w-full rounded shadow-sm"
              value={patient.gender || ''}
              onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block font-medium">Medical record</label>
            <input
              type="text"
              className="border p-2 w-full rounded shadow-sm"
              value={patient.record || ''}
              onChange={(e) => setPatient({ ...patient, record: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium">Day of birth</label>
            <input
              type="date"
              className="border p-2 w-full rounded shadow-sm"
              value={patient.dob ? new Date(patient.dob).toISOString().slice(0, 10) : ''}
              onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block font-medium">Department *</label>
            <input
              type="text"
              className="border p-2 w-full rounded shadow-sm"
              value={patient.department || ''}
              onChange={(e) => setPatient({ ...patient, department: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium">Doctor *</label>
            <input
              type="text"
              className="border p-2 w-full rounded shadow-sm"
              value={patient.doctor || ''}
              onChange={(e) => setPatient({ ...patient, doctor: e.target.value })}
            />
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="text-center flex justify-center gap-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600">
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 text-white py-2 px-6 rounded-lg shadow hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/patient-info')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
        >
          Return to Patient Information
        </button>
      </div>
    </div>
  );
};

export default EditPatient;
